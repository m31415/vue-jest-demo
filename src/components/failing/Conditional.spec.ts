import { mount } from '@vue/test-utils';
import Conditional from './Conditional.vue';

describe('Conditional', () => {
  it('conditional type without generic', () => {
    const wrapper = mount(Conditional, {
      props: { message: 'Test' },
    });
    expect(wrapper.text()).toContain('Test');
  });
});
