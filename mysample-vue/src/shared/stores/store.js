import Vue from 'vue'
import Vuex from 'vuex'
import { queryModule } from './modules/queryModule'
import { categoryModule } from './modules/categoryModule'
import { templateModule } from './modules/templateModule'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    query: queryModule,
    category: categoryModule,
    template: templateModule
  }
})
