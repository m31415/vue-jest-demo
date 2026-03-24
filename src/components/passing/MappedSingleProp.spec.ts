import { mount } from '@vue/test-utils';
import MappedSingleProp from './MappedSingleProp.vue';

describe('MappedSingleProp', () => {
  it('mapped type for individual prop', () => {
    const wrapper = mount(MappedSingleProp, {
      props: {
        title: 'Test',
        userData: { name: 'John', age: 30 }
      }
    });
    expect(wrapper.text()).toContain('Test');
    expect(wrapper.text()).toContain('John');
  });
});
