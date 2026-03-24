import { mount } from '@vue/test-utils';
import ConditionalSingleProp from './ConditionalSingleProp.vue';

describe('ConditionalSingleProp', () => {
  it('conditional type for individual prop (Vue 3.3+)', () => {
    const wrapper = mount(ConditionalSingleProp, {
      props: {
        title: 'Test',
        content: { message: 'Hello' }
      }
    });
    expect(wrapper.text()).toContain('Test');
    expect(wrapper.text()).toContain('Hello');
  });
});
