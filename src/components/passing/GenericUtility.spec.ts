import { mount } from '@vue/test-utils';
import GenericUtility from './GenericUtility.vue';

describe('GenericUtility', () => {
  type A = number;
  const a: A = "33";
  it('generic + utility type without index access', () => {
    const wrapper = mount(GenericUtility, {
      props: {
        title: 'Test Title',
        description: 'Test Description'
      }
    });
    expect(wrapper.text()).toContain('Test Title');
    expect(wrapper.text()).toContain('Test Description');
  });
});
