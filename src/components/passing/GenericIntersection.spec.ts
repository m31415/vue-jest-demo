import { mount } from '@vue/test-utils';
import GenericIntersection from './GenericIntersection.vue';

describe('GenericIntersection', () => {
  it('generic + intersection type without index access', () => {
    const wrapper = mount(GenericIntersection, {
      props: {
        title: 'Test Title',
        count: 42
      }
    });
    expect(wrapper.text()).toContain('Test Title');
    expect(wrapper.text()).toContain('42');
  });
});
