// Conditional type for SINGLE prop - should work per Vue 3.3+ docs
type MessageOrValue<T> = T extends string ? { message: T } : { value: T };

// Using conditional type for individual prop types
export type Data = {
  title: string;
  content: MessageOrValue<string>;  // Conditional for single prop
};
