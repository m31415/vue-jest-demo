import { mount } from '@vue/test-utils';
import GenericConditionalSingleProp from './GenericConditionalSingleProp.vue';

describe('GenericConditionalSingleProp', () => {
  it('generic + conditional for individual prop', () => {
    const wrapper = mount(GenericConditionalSingleProp, {
      props: {
        title: 'Test',
        value: 'Value'
      }
    });
    expect(wrapper.text()).toContain('Test');
    expect(wrapper.text()).toContain('Value');
  });
});
