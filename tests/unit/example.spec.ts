import { mount, shallowMount, Wrapper } from '@vue/test-utils';
import SpheraActionBtn from '@/components/SpheraActionBtn.vue';

describe('SpheraActionBtn.vue', () => {
  let wrapper: Wrapper<any>;
  beforeEach(() => {
    wrapper = mount(SpheraActionBtn);
  });
  afterEach(() => {
    wrapper.destroy();
  });

  it('check button slot', () => {
    const buttonText = 'Button';
    const slots = {
      default: buttonText,
    };
    const wrapper = shallowMount(SpheraActionBtn, {
      slots,
    });
    expect(wrapper.text()).toBe(buttonText);
  });
  it('emits click after clicking on component', async () => {
    const wrapper = mount(SpheraActionBtn);
    await wrapper.trigger('click');
    debugger;
    expect(wrapper.emitted('click')).toBeTruthy();
    expect(wrapper.emitted('click')?.length).toBe(1);
  });
});
