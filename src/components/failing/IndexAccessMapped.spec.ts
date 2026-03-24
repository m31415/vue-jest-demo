import { mount } from '@vue/test-utils';
import IndexAccessMapped from './IndexAccessMapped.vue';

describe('IndexAccessMapped', () => {
  it('renders props correctly', () => {
    const wrapper = mount(IndexAccessMapped, {
      props: {
        title: 'Test Title',
        count: 42
      }
    });
    expect(wrapper.text()).toContain('Test Title');
    expect(wrapper.text()).toContain('42');
  });
});
