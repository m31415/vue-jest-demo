import { mount } from '@vue/test-utils';
import Utility from './Utility.vue';

describe('Utility', () => {
  it('utility type without generic', () => {
    const wrapper = mount(Utility, {
      props: { title: 'Test', description: 'Desc' },
    });
    expect(wrapper.text()).toContain('Test');
  });
});
