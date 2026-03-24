import { mount } from '@vue/test-utils';
import IndexAccessConditional from './IndexAccessConditional.vue';

describe('IndexAccessConditional', () => {
  it('renders props correctly', () => {
    const wrapper = mount(IndexAccessConditional, {
      props: {
        message: 'Test Message'
      }
    });
    expect(wrapper.text()).toContain('Test Message');
  });
});
