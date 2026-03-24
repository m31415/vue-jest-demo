import { mount } from '@vue/test-utils';
import type { Data } from '../../types/passing/index-access';
import IndexAccess from './IndexAccess.vue';

const defaultProps: Data["props"] = {
  title: 'Test Title',
};

describe('IndexAccess', () => {
  it('should work without generic', () => {
    const wrapper = mount(IndexAccess, {
      props: defaultProps,
    });
    expect(wrapper.text()).toContain('Test Title');
  });
});
