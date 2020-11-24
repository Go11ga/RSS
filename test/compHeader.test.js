import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import TheHeader from '../components/TheHeader.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('TheHeader.vue', () => {
  let cmp;
  let mutations;
  let actions;
  let store;

  beforeEach(() => {
    mutations = {
      ['news/setSearchValue']: jest.fn()
    }
    actions = {
      ['news/getNews']: jest.fn()
    }
    store = new Vuex.Store({
      mutations,
      actions
    })
    cmp = shallowMount(TheHeader, {
      store, 
      localVue
    })
  })
  
  it('Компонент не пустой', () => {
    expect(cmp.exists()).toBe(true)
  })

  it('проверка action news/getNews', () => {
    const refresh = cmp.find('.header__refresh')
    refresh.trigger('click');
    expect(actions['news/getNews']).toHaveBeenCalled()
  })

  it('проверка mutation news/setSearchValue', () => {
    const btn = cmp.find('.header__btn')
    btn.trigger('click');
    expect(mutations['news/setSearchValue']).toHaveBeenCalled()
  })

  test('проверка v-model', async () => {
    const textInput = cmp.find('input[type="text"]')
    await textInput.setValue('some value')

    expect(cmp.find('input[type="text"]').element.value).toBe('some value')
  })
})