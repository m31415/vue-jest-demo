import { mount } from '@vue/test-utils';
import IndexAccessIntersection from './IndexAccessIntersection.vue';

describe('IndexAccessIntersection', () => {
  it('renders props correctly', () => {
    const wrapper = mount(IndexAccessIntersection, {
      props: {
        title: 'Test Title',
        count: 42
      }
    });
    expect(wrapper.text()).toContain('Test Title');
    expect(wrapper.text()).toContain('42');
  });
});
