import { mount } from '@vue/test-utils';
import type { Data } from '../../types/passing/generic';
import Generic from './Generic.vue';

const defaultProps: Data = {
  title: 'Test Title',
};

describe('Generic', () => {
  it('should work with generic but no index access', () => {
    const wrapper = mount(Generic, {
      props: defaultProps,
    });
    expect(wrapper.text()).toContain('Test Title');
  });
});
