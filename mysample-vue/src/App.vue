<template>
  <div class="container" id="app" @click="globalClick">
    <app-header></app-header>
    <router-view></router-view>
  </div>
</template>

<script>
import Vue from 'vue'
import Header from './app/Header.vue'
import { queryEventBus } from '@/shared/events/QueryEventBus'
import { util } from '@/shared/utils/util'
import { store } from '@/shared/stores/store'
import jwtdecode from 'jwt-decode'
import Cookies from 'js-cookie'

export default {
  name: 'app',
  methods: {
    globalClick (event) {
      queryEventBus.globalClick(event)
    }
  },
  components: {
    appHeader: Header
  },
  beforeCreate () {
    sessionStorage.clear()

    let token = Cookies.get('Probe-UserToken')
    if (token) {
      localStorage.setItem('probe_usertoken', token)
      let decoded = jwtdecode(token)
      store.commit('setAdminUser', decoded.isAdmin)
    }
  }
}

Vue.filter('stringLengthComma', util.stringLengthComma)
Vue.filter('numberWithCommas', util.numberWithCommas)
</script>

<style lang="scss">
@import '~milligram-scss/dist/_Color';
@import "~@/assets/styles/settings.scss";

body {
  max-width: 1000.0rem;
  // min-width: 105.0rem;
  min-width: 1280px;
  overflow-x: scroll;
  margin: 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $main-color-normal;

  padding: 0;
  margin: 0;
}

.container {
  max-width: 100%;
}

input[type='submit'].button.button-clear:focus {
  color: $color-primary;
}

a:focus {
  color: $color-primary;
}

.no-flex {
  display: -ms-flexbox;
}
</style>
