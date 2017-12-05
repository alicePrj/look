<template>
  <div class="container">
    <a href="/"><h1 class="logo">Growthy Probe</h1><h2 class="logo admin">Admin</h2></a>
    <ul class="gnb-menu float-right">
      <li>
        <a href="https://growthy-probe.game.linecorp.com" target="_blank">Probe</a>
      </li>
      <li>
        <a class="menu-link" href="#" @click.prevent="toggle(0)">Guide <div class="arrow-down"></div></a>
        <div class="popup" v-if="open[0]">
          <ul>
            <li><a href="/static/growthy_probe_user_guide_kr.pdf" target="_blank">KR</a></li>
            <li><a href="/static/growthy_probe_user_guide_jp.pdf" target="_blank">JP</a></li>
          </ul>
        </div>
      </li>
      <li>
        <a class="menu-link" href="" @click.prevent="toggle(1)">Family Site <div class="arrow-down"></div></a>
        <div class="popup" v-if="open[1]">
          <ul>
            <li class="popup-item"><a class="popup-link" :href="'https://growthy.' + hostname()" target="_blank">Growthy</a></li>
            <li class="popup-item"><a class="popup-link" :href="'https://growthy-glog.' + hostname()" target="_blank">GLM</a></li>
          </ul>
        </div>
      </li>
      <li>|</li>
      <li><a href="#" @click.prevent="logout">Logout</a></li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { queryEventBus } from '@/shared/events/QueryEventBus'
import Cookies from 'js-cookie'
import includes from 'lodash'

export default {
  data () {
    return {
      open: [false, false],
      isAdminPath: false
    }
  },
  methods: {
    foldAll () {
      this.open = this.open = this.open.map(() => false)
    },
    toggle (openIdx) {
      let cur = this.open[openIdx]

      this.foldAll()
      this.open[openIdx] = !cur
    },
    logout () {
      this.$destroy()
    }
  },
  computed: {
    ...mapState({
      isAdminUser: state => state.query.isAdminUser
    }),
    isAdminUser () {
      return this.$store.state.isAdminUser
    },
    hostname () {
      /*
        [GUM cookie domain rule]
        growthy-probe.game.linecorp.com -> game.linecorp.com
        growthy-probe.game.alpha.linecorp.com -> alpha.linecorp.com
        growthy-probe.game.line.me -> game.line.me
        growthy-probe.game.line-alpha.me -> game.line-alpha.me
      */
      return window.location.hostname.split('.').slice(-3).join('.')
    }
  },
  created () {
    /*
      Handler to disable popup menu when click elsewhere
    */
    queryEventBus.$on('globalClick', (event) => {
      if (includes(this.open, true)) {
        let target = event.target
        if (target.classList.contains('menu-link') ||
            target.classList.contains('popup') ||
            target.classList.contains('popup-item') ||
            target.classList.contains('popup-link')) {
          // do nothing
        } else {
          this.foldAll()
        }
      }
    })

    let path = this.$route.path
    if (path.startsWith('/admin')) this.isAdminPath = true
  },
  destroyed () {
    localStorage.clear()

    let option = {
      path: '/',
      domain: this.hostname()
    }
    Cookies.remove('lgac', option)
    Cookies.remove('X-Linegame-UserToken', option)

    window.location.href = '/logout'
  }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/styles/settings.scss';
$header-height: 5rem;
$line-height: 2.2;  // Set for vertical middle

.container {
  width: 100%;
  height: $header-height;

  text-align: left;

  background: #f4f5f6;
  margin: 0 0 2rem;
  border-bottom: 1px solid lightgrey;
}

.logo {
  display: inline;
  font-weight: 500;
  height: 100%;
  margin: 0;

  color: $color-primary;
  line-height: $line-height;
}

.logo.admin {
  margin-left: 1rem;
}

ul {
  list-style: none;
  margin: 0;
}

.gnb-menu > li {
  height: $header-height;
  line-height: 3.2;
  float: left;
  margin: 0 2rem;
  position: relative;
  font-size: 1.5rem;
}

.popup::before {
  $offset: 0.8rem;
  content: ' ';
  position: absolute;
  width: 0;
  height: 0;
  border-left: $offset solid transparent;
  border-right: $offset solid transparent;
  border-bottom: $offset solid white;
  top: -$offset;
  left: 40%;
}

.popup {
  z-index: 100;
  position: absolute;
  top: $header-height;
  left: 50%;
  min-width: 10rem;
  border: 1px solid lightgrey;
  border-top: 0;
  text-align: center;
  background-color: white;
  filter: drop-shadow(0 0 .6rem rgba(0,0,0,.1));
  transform: translateX(-50%);
}

.popup li {
  margin: 0;
  padding-left: 3rem;
  padding-right: 3rem;
  border-bottom: 1px solid lightgrey;
  white-space: nowrap;
}

.popup li:last-child {
  border-bottom: 0;
}

h2 {
  font-size: 1.6rem !important;
  letter-spacing: 0 !important;
  line-height: 1.4 !important;
}
</style>
