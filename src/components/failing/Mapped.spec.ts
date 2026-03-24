import { mount } from '@vue/test-utils';
import Mapped from './Mapped.vue';

describe('Mapped', () => {
  it('mapped type without generic', () => {
    const wrapper = mount(Mapped, {
      props: { title: 'Test', count: 5 },
    });
    expect(wrapper.text()).toContain('Test');
  });
});
