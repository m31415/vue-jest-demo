import { mount } from '@vue/test-utils';
import NestedConditionalProp from './NestedConditionalProp.vue';

describe('NestedConditionalProp', () => {
  it('nested conditional types for single prop', () => {
    const wrapper = mount(NestedConditionalProp, {
      props: {
        title: 'Test',
        item: 'Item'
      }
    });
    expect(wrapper.text()).toContain('Test');
    expect(wrapper.text()).toContain('Item');
  });
});
