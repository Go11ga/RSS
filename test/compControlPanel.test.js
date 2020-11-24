import { shallowMount, createLocalVue, RouterLinkStub } from '@vue/test-utils';
import Vuex from 'vuex'
import TheControlPanel from '../components/TheControlPanel.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('control panel', () => {
  let cmp;
  let mutations;
  let store;

  beforeEach(() => {
    mutations = {
      ['news/setNewsPerPage']: jest.fn()
    }
    store = new Vuex.Store({
      mutations
    })
    cmp = shallowMount(TheControlPanel, {
      data: function(){
        return {
          newsMenu: [
            { title: 'Все', isActive: true, path: '/' },
            { title: 'Lenta.ru', isActive: false, path: '/lenta/1' },
            { title: 'Meduza.io', isActive: false, path: '/meduza/1' }
          ],
          controlBtns: [
            { href:"#grid_1", isActive: false },
            { href:"#grid_2", isActive: true },
          ],
        }
      },
      store, 
      localVue,
      stubs: {
        NuxtLink: RouterLinkStub,
        common: true
      } 
    })
  })

  it('Компонент не пустой', () => {
    expect(cmp.exists()).toBe(true)
  })

  it('проверка data', () => {
    expect(cmp.vm.newsMenu[0].isActive).toEqual(true)
  })

  it('проверка onToggleView', () => {
    cmp.vm.onToggleView = jest.fn();
    const el = cmp.find('span').trigger('click');

    expect(cmp.vm.onToggleView).toBeCalledWith(0);
    //console.log(cmp.vm.newsMenu[0].isActive);
  })

  it('проверка mutation news/setNewsPerPage', () => {
    const btn = cmp.find('.view-btn')
    btn.trigger('click');
    expect(mutations['news/setNewsPerPage']).toBeCalledWith({}, 0)
  })
})