import { mount } from '@vue/test-utils';
import Intersection from './Intersection.vue';

describe('Intersection', () => {
  it('intersection type without generic', () => {
    const wrapper = mount(Intersection, {
      props: { title: 'Test', count: 5 },
    });
    expect(wrapper.text()).toContain('Test');
  });
});
