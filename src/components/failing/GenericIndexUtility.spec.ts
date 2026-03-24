import { mount } from '@vue/test-utils';
import GenericIndexUtility from './GenericIndexUtility.vue';

describe('GenericIndexUtility', () => {
  it('generic + index + utility type', () => {
    const wrapper = mount(GenericIndexUtility, {
      props: { title: 'Test', description: 'Desc' },
    });
    expect(wrapper.text()).toContain('Test');
  });
});
