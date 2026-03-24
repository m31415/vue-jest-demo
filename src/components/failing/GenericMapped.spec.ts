import { mount } from '@vue/test-utils';
import GenericMapped from './GenericMapped.vue';

describe('GenericMapped', () => {
  it('generic + mapped type without index access', () => {
    const wrapper = mount(GenericMapped, {
      props: {
        title: 'Test Title',
        count: 42
      }
    });
    expect(wrapper.text()).toContain('Test Title');
    expect(wrapper.text()).toContain('42');
  });
});
