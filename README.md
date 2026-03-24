# Vue SFC Compiler Type Resolution Boundaries

A systematic investigation of TypeScript type resolution limitations in Vue's Single File Component (SFC) compiler when using `defineProps<T>()`.

## 🎯 Purpose

This repository systematically tests which TypeScript type constructs work vs fail with Vue's `@vue/compiler-sfc` when used with `defineProps<T>()`. The goal is to map the exact boundaries of what's supported and identify workarounds for real-world monorepo scenarios.

### The Problem

In complex monorepo setups with shared type packages, certain TypeScript patterns that work perfectly in regular TypeScript code fail during Vue SFC compilation with errors like:

```
[@vue/compiler-sfc] Unresolvable type reference or unsupported built-in utility type
[@vue/compiler-sfc] Failed to resolve index type into finite keys
[@vue/compiler-sfc] Unresolvable type: TSConditionalType
```

This project reproduces these errors in a minimal setup and systematically tests type patterns to find what works and what doesn't.

## 🔬 Test Methodology

**Bottom-up systematic testing** starting from isolated features and building up to combinations:

1. **Level 1: Isolated Features** - Single type features without generics or index access
2. **Level 2: Two-Way Combinations** - Generic + feature, or index access + feature
3. **Level 3: Three-Way Combinations** - Generic + index access + feature
4. **Level 4: Special Cases** - Edge cases and minimal reproductions

## 🚀 Vue 3.3+ Improvements

**Key Discovery:** Conditional and mapped types **work for individual props**, just not for the entire props object!

```typescript
// ✅ WORKS - conditional for single prop
export type Data = {
  title: string;
  content: MessageOrValue<string>;  // ← Complex type as property
};

// ❌ FAILS - conditional for entire props
export type Data = MessageOrValue<string>;  // ← Complex type as root
```

## 🔴 Remaining Limitations

### 1. Mapped Types as Entire Props Object

```typescript
// ❌ FAILS - as entire props object
type MappedProps = {
  [K in keyof OriginalProps]: OriginalProps[K];
};
export type Data = MappedProps;  // ← Mapped type is the root
defineProps<Data>();  // Error: Failed to resolve index type into finite keys

// ✅ WORKS - as individual prop (Vue 3.3+)
export type Data = {
  title: string;
  userData: MappedProps;  // ← Mapped type as property value
};
defineProps<Data>();  // WORKS!
```

### 2. Conditional Types as Entire Props Object

```typescript
// ❌ FAILS - as entire props object
type MessageOrValue<T> = T extends string ? { message: T } : { value: T };
export type Data = MessageOrValue<string>;  // ← Conditional is the root
defineProps<Data>();  // Error: Unresolvable type: TSConditionalType

// ✅ WORKS - as individual prop (Vue 3.3+)
export type Data = {
  title: string;
  content: MessageOrValue<string>;  // ← Conditional as property value
};
defineProps<Data>();  // WORKS!
```

### 3. Generic + Index Access Combination

```typescript
// ❌ FAILS - three-way combination
type Block<P> = { props: P };
export type Data = Block<DataProps>;
defineProps<Data["props"]>();  // Error: Unresolvable type reference

// ✅ WORKS - generic without index access
defineProps<Data>();

// ✅ WORKS - index access without generic
type Container = { props: DataProps };
defineProps<Container["props"]>();
```

**This breaks even utility types and intersection types that normally work:**

```typescript
// ✅ Works - generic + utility (no index)
type Data = PassThrough<Pick<T, K>>;
defineProps<Data>();

// ✅ Works - index + utility (no generic)
type Container = { props: Pick<T, K> };
defineProps<Container["props"]>();

// ❌ FAILS - generic + index + utility
type Block<T, K> = { props: Pick<T, K> };
defineProps<Block<T, K>["props"]>();
```

## ✅ What Works

| Feature | As Root | As Prop | + Generic | + Index | + Generic + Index |
|---------|---------|---------|-----------|---------|-------------------|
| **Utility types** (Pick, Omit) | ✅ | ✅ | ✅ | ✅ | ❌ |
| **Intersection types** (T & U) | ✅ | ✅ | ✅ | ✅ | ❌ |
| **Union types** (T \| U) | ✅ | ✅ | ✅ | ✅ | ❌ |
| **Mapped types** | ❌ | ✅ | ❌ | ❌ | ❌ |
| **Conditional types** | ❌ | ✅ | ❌ | ❌ | ❌ |
| **Nested conditionals** | ❌ | ✅ | - | - | - |

**Key:**
- **As Root** = Type is the entire props object: `defineProps<ComplexType>()`
- **As Prop** = Type is a property value: `defineProps<{ prop: ComplexType }>()`

## 🔧 Test Setup

### Custom Transformer

The repo uses a custom Jest transformer to enable TypeScript resolution in the Vue SFC compiler:

**`vue-jest-transformer.js`:**
```javascript
const compilerSfc = require('@vue/compiler-sfc');
const typescript = require('typescript');
const vue3Jest = require('@vue/vue3-jest');

// Register TypeScript with the Vue compiler
compilerSfc.registerTS(() => typescript);

module.exports = vue3Jest;
```

**`jest.config.js`:**
```javascript
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.vue$': '<rootDir>/vue-jest-transformer.js',  // Custom transformer
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleFileExtensions: ['js', 'ts', 'json', 'vue'],
};
```

**Why this is needed:**
- Without `compilerSfc.registerTS()`, the Vue compiler can't resolve imported TypeScript types
- The error `No fs option provided to compileScript` appears without this setup
- This allows the compiler to read and analyze TypeScript files during transformation

### Running Tests

```bash
# Install dependencies
npm install

# Run all tests (type-check + jest)
npm test

# Run just Jest tests
npm run test:jest

# Run just type checking
npm run type-check

# Watch mode
npm run test:watch
```

**Expected Results:**
- **8 tests pass** ✅ - Types that work with Vue SFC compiler
- **9 tests fail** ❌ - Types that are fundamentally unsupported

The failing tests are **intentional** - they demonstrate the compiler's limitations.

## 📊 Complete Boundary Matrix

See [BOUNDARY_MATRIX.md](./BOUNDARY_MATRIX.md) for a visual representation of all combinations tested.

See [TYPE_RESOLUTION_BOUNDARIES.md](./TYPE_RESOLUTION_BOUNDARIES.md) for detailed analysis with test case descriptions.

### Quick Reference

**If you see this error:**
- `Failed to resolve index type into finite keys` → Using a **mapped type** 🔴
- `Unresolvable type: TSConditionalType` → Using a **conditional type** 🔴
- `Unresolvable type reference or unsupported built-in utility type` → Combining **generic + index access**

## 🔄 Workarounds

### For Real-World Monorepo Types

**Problem:**
```typescript
// In shared package
type DocumentContentBlock<TypeT, PropsT, ChildT> = {
  type: TypeT;
  props: PropsT;
  children: ChildT[];
};
export type AdInfoElement = DocumentContentBlock<"AD_INFO_ELEMENT", AdInfoElementProps>;

// In component - ❌ FAILS
defineProps<AdInfoElement["props"]>();
```

**Solution 1: Flatten the type**
```typescript
// In shared package - export the props directly
export type AdInfoElementProps = { references: AdInfoElementReference[] };

// In component - ✅ WORKS
defineProps<AdInfoElementProps>();
```

**Solution 2: Add a non-generic intermediate step**
```typescript
// In shared package
export type AdInfoElementProps = AdInfoElement["props"];

// In component - ✅ WORKS
defineProps<AdInfoElementProps>();
```

**Solution 3: Use the generic directly (no index access)**
```typescript
// If you need the whole block
defineProps<AdInfoElement>();

// Access props in template
<template>
  <div>{{ props.props.references }}</div>
</template>
```

### For Mapped Types

**Problem:**
```typescript
// ❌ FAILS
type ReadonlyProps<T> = {
  readonly [K in keyof T]: T[K];
};
```

**Solution: Resolve the mapped type before export**
```typescript
// ✅ WORKS - export the concrete result
type FullProps = { title: string; count: number };
export type Data = {
  readonly title: string;
  readonly count: number;
};
// Or use TypeScript utilities that Vue supports
export type Data = Readonly<FullProps>;  // Built-in utility
```

### For Conditional Types

**Problem:**
```typescript
// ❌ FAILS
type MessageOrValue<T> = T extends string ? { message: T } : { value: T };
```

**Solution: Resolve the condition before export**
```typescript
// ✅ WORKS - export the resolved type
export type Data = { message: string };  // Resolve T extends string → true branch
```

## 🎓 Key Learnings

1. **Vue 3.3+ made significant improvements** - Conditional and mapped types now work for individual props!

2. **Root vs property matters** - Complex types fail as the entire props object but work as property values:
   - ❌ `defineProps<ConditionalType>()` - fails
   - ✅ `defineProps<{ prop: ConditionalType }>()` - works

3. **AST-based conversion has limits** - The compiler can understand structure but can't evaluate types:
   - Works: Types as property values (compiler doesn't analyze them)
   - Fails: Types as root structure (requires type evaluation)

4. **Generic + index access is still problematic** - Even types that work fine alone will fail with this combo

5. **Two-way combinations mostly work** - Generic + utility, or index access + utility work fine

6. **The custom transformer is essential** - Without `compilerSfc.registerTS()`, you can't resolve imported types

7. **Use Vue 3.3+ features wisely** - You can now use complex types for props, just wrap them properly:
   ```typescript
   // ✅ Good
   export type Props = {
     user: ExtractUser<Response>;  // Complex type for prop
   };

   // ❌ Bad
   export type Props = ExtractUser<Response>;  // Complex type as root
   ```

## 📖 Additional Documentation

- **[TYPE_RESOLUTION_BOUNDARIES.md](./TYPE_RESOLUTION_BOUNDARIES.md)** - Complete analysis with all test cases
- **[BOUNDARY_MATRIX.md](./BOUNDARY_MATRIX.md)** - Visual matrix of what works vs fails

## 🐛 Debugging Tips

### Enable Verbose Logging

```javascript
// In vue-jest-transformer.js
const compilerSfc = require('@vue/compiler-sfc');
const typescript = require('typescript');
const vue3Jest = require('@vue/vue3-jest');

compilerSfc.registerTS(() => {
  console.log('TypeScript registered with Vue compiler');
  return typescript;
});

module.exports = vue3Jest;
```

### Check Type Resolution

```bash
# Run type-check to see TypeScript errors
npm run type-check

# Run specific test to isolate issue
npm test GenericIndexUtility
```

### Common Issues

**"No fs option provided to compileScript"**
- Missing `compilerSfc.registerTS()` in transformer
- Solution: Use the custom transformer setup shown above

**"Cannot resolve module"**
- Check import paths are correct
- Verify `moduleFileExtensions` includes `.ts` in jest.config.js

**Tests pass but shouldn't (or vice versa)**
- Clear Jest cache: `npx jest --clearCache`
- Verify file is in correct folder (passing/ vs failing/)

## 🔗 Related Resources

- [Vue SFC Compiler Source](https://github.com/vuejs/core/tree/main/packages/compiler-sfc)
- [Vue 3 Script Setup RFC](https://github.com/vuejs/rfcs/blob/master/active-rfcs/0040-script-setup.md)
- [@vue/vue3-jest Documentation](https://github.com/vuejs/vue-jest)

## 📊 Test Statistics

| Category | Count | Percentage |
|----------|-------|------------|
| **Passing** | 14 | 61% |
| **Failing** | 9 | 39% |
| **Total** | 23 | 100% |

### Breakdown by Root Cause (Failing Tests)

| Root Cause | Count | Notes |
|------------|-------|-------|
| Mapped types as root | 2 | Entire props object is mapped |
| Conditional types as root | 2 | Entire props object is conditional |
| Generic + Index Access | 3 | Toxic combination |
| Index + conditional/mapped | 2 | Complex type as root via index |

### Breakdown by Category (Passing Tests)

| Category | Count | Notes |
|----------|-------|-------|
| Basic types (utility, intersection, etc.) | 8 | Original passing tests |
| Conditional for single prop | 4 | Vue 3.3+ improvement |
| Mapped for single prop | 1 | Vue 3.3+ improvement |
| Generic + conditional for prop | 1 | Vue 3.3+ improvement |

---

**Contributors:** This research helps the Vue community understand and work around type resolution limitations in real-world applications. 🎉
