import { describe, it, expect } from 'vite-plus/test'
import { mount } from '@vue/test-utils'
import { createPinia } from 'pinia'
import App from '../App.vue'

describe('App', () => {
  it('mounts and renders properly', () => {
    const pinia = createPinia()
    const wrapper = mount(App, {
      global: {
        plugins: [pinia],
      },
    })
    expect(wrapper.text()).toContain('VueTemplate')
    expect(wrapper.text()).toContain('Count: 0')
  })

  it('increments counter on click', async () => {
    const pinia = createPinia()
    const wrapper = mount(App, {
      global: {
        plugins: [pinia],
      },
    })
    const countBtn = wrapper.find('button')
    await countBtn.trigger('click')
    expect(wrapper.text()).toContain('VueTemplate')
  })
})