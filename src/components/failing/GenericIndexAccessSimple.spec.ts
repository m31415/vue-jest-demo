import { mount } from '@vue/test-utils';
import GenericIndexAccessSimple from './GenericIndexAccessSimple.vue';

describe('GenericIndexAccessSimple', () => {
  it('generic + index access with plain type', () => {
    const wrapper = mount(GenericIndexAccessSimple, {
      props: {
        title: 'Test Title',
        count: 42
      }
    });
    expect(wrapper.text()).toContain('Test Title');
    expect(wrapper.text()).toContain('42');
  });
});
