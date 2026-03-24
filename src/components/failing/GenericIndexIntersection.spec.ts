import { mount } from '@vue/test-utils';
import GenericIndexIntersection from './GenericIndexIntersection.vue';

describe('GenericIndexIntersection', () => {
  it('generic + index + intersection type', () => {
    const wrapper = mount(GenericIndexIntersection, {
      props: { title: 'Test', count: 5 },
    });
    expect(wrapper.text()).toContain('Test');
  });
});
