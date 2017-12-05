// The Vue build version to load with the `import` command
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import VeeValidate from 'vee-validate'
import App from './App'
import { store } from '@/shared/stores/store'
import { http } from '@/shared/utils/httpaxios'
import { resource } from '@/shared/utils/resource'
import { routes } from './routes'
import { util } from '@/shared/utils/util'
import VPopover, * as Popover from 'vue-js-popover'
import ToggleButton from 'vue-js-toggle-button'

Vue.prototype.$http = http
Vue.prototype.$resource = resource

Vue.use(VueRouter)
Vue.use(Popover)
Vue.use(VPopover, { tooltip: true })
Vue.use(ToggleButton)
Vue.use(VeeValidate)

const router = new VueRouter({
  routes,
  mode: 'history'
})

router.beforeEach((to, from, next) => {
  if (util.sessionChecker()) next()
  else {
    if (confirm('Your session has been expired.\nDo you want to go to login page?')) {
      window.location.href = '/logout'
    } else {
      next(false)
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
