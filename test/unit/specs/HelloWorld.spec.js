import Vue from 'vue'
import HelloWorld from '@/components/HelloWorld'

describe('Header1.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(HelloWorld)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('.hello h1').textContent)
  })
})
