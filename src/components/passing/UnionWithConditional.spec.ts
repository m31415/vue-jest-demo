import { mount } from '@vue/test-utils';
import UnionWithConditional from './UnionWithConditional.vue';

describe('UnionWithConditional', () => {
  it('union type with conditional types', () => {
    const wrapper = mount(UnionWithConditional, {
      props: {
        title: 'Test',
        value: 'string value'
      }
    });
    expect(wrapper.text()).toContain('Test');
    expect(wrapper.text()).toContain('string value');
  });
});
