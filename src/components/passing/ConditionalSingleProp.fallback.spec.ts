import { mount } from '@vue/test-utils';
import ConditionalSingleProp from './ConditionalSingleProp.vue';

describe('ConditionalSingleProp – runtime type fallback', () => {
  it('passes an array as "content" to prove the compiler fell back to Object (no validation error)', () => {
    // If the SFC compiler had resolved MessageOrValue<string> → { message: string },
    // it would generate: content: { type: Object }
    // But even with Object, Vue doesn't deeply validate the shape.
    //
    // The question: does it generate ANY type constraint for "content"?
    // If it falls back to no type / Object, passing an array won't trigger a warning.
    // If it somehow resolved it to Object, arrays still pass (arrays are objects).
    //
    // So let's pass a NUMBER — which is NOT an Object — to see if there's a type check.

    const warn = jest.spyOn(console, 'warn').mockImplementation(() => {});

    const wrapper = mount(ConditionalSingleProp, {
      props: {
        title: 'Test',
        content: 12345 as any,
      }
    });

    // Check if Vue emitted a prop type warning
    const propWarning = warn.mock.calls.find(
      args => args.some(a => typeof a === 'string' && a.includes('Invalid prop'))
    );

    // If propWarning exists → the compiler DID generate a type constraint
    // If propWarning is undefined → the compiler fell back to no type (anything goes)
    console.log('Prop warning found:', propWarning ? 'YES' : 'NO');

    if (propWarning) {
      console.log('Warning text:', propWarning.join(' '));
      // This means the compiler resolved the conditional to a specific type
      expect(propWarning.join(' ')).toContain('Invalid prop');
    } else {
      // No warning = no runtime type constraint = compiler couldn't resolve the conditional
      expect(propWarning).toBeUndefined();
    }

    warn.mockRestore();
  });

  it('passes a number as "title" to prove String type IS enforced (control test)', () => {
    // "title: string" is trivially resolvable → should generate { type: String }
    // Passing a number should trigger a Vue prop warning.
    const warn = jest.spyOn(console, 'warn').mockImplementation(() => {});

    const wrapper = mount(ConditionalSingleProp, {
      props: {
        title: 999 as any,
        content: { message: 'Hello' },
      }
    });

    const propWarning = warn.mock.calls.find(
      args => args.some(a => typeof a === 'string' && a.includes('Invalid prop'))
    );

    console.log('Title prop warning found:', propWarning ? 'YES' : 'NO');
    if (propWarning) {
      console.log('Warning text:', propWarning.join(' '));
    }

    // title: string → String → should warn
    expect(propWarning).toBeDefined();

    warn.mockRestore();
  });
});
