import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import TheToast from '../components/TheToast.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('TheToast.vue', () => {
  let cmp;
  let getters;
  let store;

  beforeEach(() => {
    getters = {
      ['msg/showMsg']: () => true,
      ['msg/text']: () => 'test'
    }
    store = new Vuex.Store({
      getters
    })
    cmp = shallowMount(TheToast, {
      store, 
      localVue
    })
  })

  it('Компонент не пустой', () => {
    expect(cmp.exists()).toBe(true)
  })

  it('содержит класс toast', () => {
    expect(cmp.classes()).toContain('toast')
  })
})