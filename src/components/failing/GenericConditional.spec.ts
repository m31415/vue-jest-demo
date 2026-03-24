import { mount } from '@vue/test-utils';
import GenericConditional from './GenericConditional.vue';

describe('GenericConditional', () => {
  it('generic + conditional type without index access', () => {
    const wrapper = mount(GenericConditional, {
      props: {
        message: 'Test Message'
      }
    });
    expect(wrapper.text()).toContain('Test Message');
  });
});
