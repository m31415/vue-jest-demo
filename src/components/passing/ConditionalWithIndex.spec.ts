import { mount } from '@vue/test-utils';
import ConditionalWithIndex from './ConditionalWithIndex.vue';

describe('ConditionalWithIndex', () => {
  it('conditional + index access for single prop', () => {
    const wrapper = mount(ConditionalWithIndex, {
      props: {
        title: 'Test',
        content: 'Hello'
      }
    });
    expect(wrapper.text()).toContain('Test');
    expect(wrapper.text()).toContain('Hello');
  });
});
