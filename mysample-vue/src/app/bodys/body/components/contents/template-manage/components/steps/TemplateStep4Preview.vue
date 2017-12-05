<template>
  <div class="px-3">
    <template-step-banner></template-step-banner>
    <form class="text-left">
      <div ref="tabs" class="tab clearfix">
        <router-link
          v-for="(templateDetail, key) in template.templateDetails" :key="key" class="button button-clear column column-20 db-tab" activeClass="tab-selected" exact
          v-bind:to="{name: 'template-step4-preview', params: {templateId: templateId, lang: infoTemplateDetails[key].key}}">
          <icon class="circle-icon mr-2" v-if="template.templateDetails[key].templateNm && template.templateDetails[key].templateContent" name="check-circle" scale="1"></icon>
          <icon class="circle-icon mr-2" v-if="!template.templateDetails[key].templateNm || !template.templateDetails[key].templateContent" name="times-circle" scale="1"></icon>
          <span>{{infoTemplateDetails[key].key}}</span>
        </router-link>
      </div>
      <div>
        <h4 class="mt-3 mb-0">미리보기</h4>
        <p class="px-5 mb-4 p-description-color">※ 미리보기는 가로 해상도 1280 기준으로 제공됩니다.</p>
      </div>
      <div class="border-color text-left p-4" v-for="(templateDetail, key) in template.templateDetails" :key="key" v-if="infoTemplateDetails[key].key === lang">
        <div>
          <h5 class="mt-3 p-description-color">Target MID</h5>
          <p class="px-4">{{templateDetail.templateNm}}</p>
          <pre class="px-4 p-description-color normalPre">{{templateDetail.templateContent}}</pre>
          <div class="flex mt-3 px-4">
            <div class="empty"></div>
            <div>
              <input type="button" class="button button-outline mb-2" value="View Sample">
            </div>
          </div>
        </div>
      </div>
      <div class="flex mt-4 px-5">
        <p class="mb-0">미리보기 화면을 확인한 후 . 다음 단계로 진행해 주세요.</p>
        <div class="empty"></div>
        <div>
          <input type="button" class="button button-outline mb-2" value="Back" @click="goBack()">
          <input type="button" class="button mb-2" value="Next" @click="goNextStep()">
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { cloneDeep } from 'lodash'
import * as types from '@/shared/stores/types'
import TemplateStepBanner from './components/TemplateStepBanner.vue'
import Icon from 'vue-awesome/components/Icon.vue'
import 'vue-awesome/icons/check-circle'
import 'vue-awesome/icons/times-circle'

export default {
  data () {
    return {
      template: {
        templateDetails: [{}, {}, {}]
      },
      infoTemplateDetails: [{key: 'EN'}, {key: 'KR'}, {key: 'JP'}]
    }
  },
  watch: {
    apiTemplate: function (template) {
      this.template = template
    }
  },
  computed: {
    ...mapState({
      apiTemplate: state => state.template._template
    }),
    templateId () {
      return Number(this.$route.params.templateId)
    },
    lang () {
      return this.$route.params.lang
    }
  },
  methods: {
    setTemplate (template) {
      this.templateOri = {
        ...template
      }
      this.template = cloneDeep(this.templateOri)
    },
    sampleImageClick () {
      document.getElementById('sampleImageLabel').click()
    },
    goBack () {
      this.$router.push({name: 'template-step4', params: {templateId: this.templateId, lang: 'EN'}})
    },
    goNextStep () {
      this.$router.push({name: 'template-step5', params: {templateId: this.templateId, lang: 'EN'}})
    }
  },
  components: {
    TemplateStepBanner,
    Icon
  },
  created () {
    this.$store.dispatch(types.TEMPLATE_GET, this.templateId)
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/settings.scss";

h4:before {
  content: "• ";
}

.circle-icon {
  position: relative;
  top: 3px;
  color: black;
}
</style>
