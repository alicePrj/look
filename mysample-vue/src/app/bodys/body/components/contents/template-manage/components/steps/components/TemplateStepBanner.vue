<template>
  <div class="mb-5">
    <div class="step-banner">
      <ul class="flex m-0 p-0">
        <li class="flex-grow-2 m-0 pt-1 pl-5" :class="{active: checkActive('template-step1')}">
          <a @click="goStep(1, {name: 'template-step1', params: {templateId: templateId}})" class="router-link text-left pointer">
            <h3>Step 1.</h3>
            <p>Make Query</p>
          </a>
        </li>
        <li class="flex-grow-3 m-0 pt-1" :class="{active: checkActive('template-step2', 'template-step2-preview')}">
          <a @click="goStep(2, {name: 'template-step2', params: {templateId: templateId}})" class="router-link text-left pointer">
            <h3>Step 2.</h3>
            <p>Deploy</p>
          </a>
        </li>
        <li class="flex-grow-3 m-0 pt-1" :class="{active: checkActive('template-step3', 'template-step3-preview')}">
          <a @click="goStep(3, {name: 'template-step3', params: {templateId: templateId, parameter: 'none'}})" class="router-link text-left pointer">
            <h3>Step 3.</h3>
            <p>Set Parameter</p>
          </a>
        </li>
        <li class="flex-grow-3 m-0 pt-1" :class="{active: checkActive('template-step4', 'template-step4-preview')}">
          <a @click="goStep(4, {name: 'template-step4', params: {templateId: templateId, lang: 'EN'}})" class="router-link text-left pointer">
            <h3>Step 4.</h3>
            <p>Manage Page Description</p>
          </a>
        </li>
        <li class="flex-grow-3 m-0 pt-1" :class="{active: checkActive('template-step5')}">
          <a @click="goStep(5, {name: 'template-step5', params: {templateId: templateId, lang: 'EN'}})" class="router-link text-left pointer">
            <h3>Step 5.</h3>
            <p>Deploy</p>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { util } from '@/shared/utils/util'

export default {
  data () {
    return {
      template: {}
    }
  },
  watch: {
    apiTemplate: function (template) {
      // console.log('banner watch')
      this.template = template
    }
  },
  computed: {
    ...mapState({
      apiTemplate: state => state.template._template
    }),
    templateId () {
      return Number(this.$route.params.templateId)
    }
  },
  methods: {
    checkActive (name, name2) {
      return this.$route.name === name || this.$route.name === name2
    },
    goStep (step, route) {
      if (this.templateId === 0) {
        if (step > 1) {
          util.toastr().warning('이전 step 정보가 등록되어 있지 않습니다.')
          return
        }
      } else if (Number(this.template.lastStep) + 1 < step) {
        util.toastr().warning('이전 step 정보가 등록되어 있지 않습니다.')
        return
      }
      this.$router.push(route)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/settings.scss";

.step-banner {
  overflow: hidden;
  & ul {
    list-style: none;
    & li {
      padding-left: 5rem;
      position: relative;
      background-color: $border-color-primary;
      @extend .text-left;
      &.active {
        background-color: $color-primary;
        & .router-link:before {
          background-color: $color-primary;
        }
        & .router-link {
          color: white;
        }
      }
      & .router-link {
        &:before {
          content: '';
          position: absolute;
          right: -26px;
          top: 9px;
          width: 50px;
          height: 50px;
          background-color: $border-color-primary;
          border-top: 3px solid white;
          border-right: 3px solid white;
          transform: rotate(45deg);
          z-index: 1;
        }
        & h3 {
          text-decoration: underline;
          @extend .mb-0;
          @extend .pb-3;
          @extend .pt-2;
        }
        & p {
          font-size: 1.2rem;
          @extend .mb-0;
          @extend .pb-3;
        }
      }
    }
  }
}

.background-color {
  background-color: $color-primary;
}

.router-link {
  @extend .text-left;
}
</style>
