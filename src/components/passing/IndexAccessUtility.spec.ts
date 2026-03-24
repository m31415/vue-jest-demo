import { mount } from '@vue/test-utils';
import IndexAccessUtility from './IndexAccessUtility.vue';

describe('IndexAccessUtility', () => {
  it('renders props correctly', () => {
    const wrapper = mount(IndexAccessUtility, {
      props: {
        title: 'Test Title',
        description: 'Test Description'
      }
    });
    expect(wrapper.text()).toContain('Test Title');
    expect(wrapper.text()).toContain('Test Description');
  });
});
