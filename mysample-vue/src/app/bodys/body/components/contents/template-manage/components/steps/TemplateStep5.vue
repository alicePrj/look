<template>
  <div class="px-3">
    <template-step-banner></template-step-banner>
    <form class="text-left">
      <div>
        <div class="alert mb-5 p-2 flex" v-if="Number(template.deployStatus) === 2">
          <p class="mb-0 ml-3">
            이전 배포된 버전에서 변경이 있습니다. <a class="pointer" @click="openTemplatePrevious()">[ 이전 입력 내용 확인 ]</a>
          </p>
          <div class="empty"></div>
          <div>
            <span class="position-relative-z-index-1" id="spinnerDiscardchange">
              <input type="button" class="button button-red mb-0" value="Discard changes" @click="discardchange('spinnerDiscardchange')">
            </span>
          </div>
        </div>
        <div v-if="category.categoryNmEn">
          <h4>입력 내용 확인</h4>
          <div class="px-5">
            <table>
              <tbody>
                <tr>
                  <th>Template 이름</th>
                  <td>{{template.templateDetails[0].templateNm}}</td>
                </tr>
                <tr>
                  <th>Category</th>
                  <td>{{category.firstCategoryId === 0 ? 'Analysis' : 'Operation'}} > {{category.categoryNmEn}}</td>
                </tr>
                <tr>
                  <th>Permission</th>
                  <td>{{template.authLevel}}</td>
                </tr>
                <tr>
                  <th>Query</th>
                  <td>
                    <pre class="normalPre">{{template.queryString}}</pre>
                  </td>
                </tr>
                <tr>
                  <th>Parameter</th>
                  <td>{{template.templateParameterNameStr}}</td>
                </tr>
                <tr>
                  <th>Description</th>
                  <td>
                    <pre class="normalPre">{{template.templateDetails[0].templateContent}}</pre>
                  </td>
                </tr>
                <tr>
                  <th>Display</th>
                  <td>{{template.displayYn === 'Y' ? 'Y' : 'N'}}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <hr>
      <div class="flex px-5">
        <div class="empty"></div>
        <div>
          <input type="button" class="button button-outline mb-2" value="Preview" @click="openTemplatePreview()">
          <span class="position-relative-z-index-1" id="spinnerDeploy">
            <input type="button" class="button mb-2" value="Deploy" @click="deploy('spinnerDeploy')">
          </span>
        </div>
      </div>
      <template-preview v-if="previewView"></template-preview>
      <template-previous v-if="PreviousView" :templateOrg="templateOrg" :category="category"></template-previous>
    </form>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { cloneDeep, map, join } from 'lodash'
import * as types from '@/shared/stores/types'
import TemplateStepBanner from './components/TemplateStepBanner.vue'
import TemplatePreview from './components/TemplatePreview.vue'
import TemplatePrevious from './components/TemplatePrevious.vue'

export default {
  data () {
    return {
      previewView: false,
      PreviousView: false,
      template: {},
      templateOrg: {},
      category: {}
    }
  },
  watch: {
    apiTemplate: function (template) {
      this.setTemplate(template)
      this.template.authLevel = this.template.authLevel.replace(/,/g, ', ')
      this.template.templateParameterNames = []
      map(this.template.templateParameters, (templateParameter) => {
        this.template.templateParameterNames[this.template.templateParameterNames.length] = templateParameter.paramType
      })
      this.template.templateParameterNameStr = join(this.template.templateParameterNames, ', ')
      this.$store.dispatch(types.CATEGORY_GET, template.categoryId)
      if (Number(template.deployStatus) === 2) {
        this.$store.dispatch(types.TEMPLATE_ORG, template.templateId)
      }
    },
    apiTemplateOrg: function (templateOrg) {
      this.templateOrg = templateOrg
      this.templateOrg.templateParameterNames = []
      map(this.templateOrg.templateParameters, (templateParameter) => {
        this.templateOrg.templateParameterNames[this.templateOrg.templateParameterNames.length] = templateParameter.paramType
      })
      this.templateOrg.templateParameterNameStr = join(templateOrg.templateParameterNames, ', ')
    },
    apiCategory: function (category) {
      this.category = category
    }
  },
  computed: {
    ...mapState({
      apiTemplate: state => state.template._template,
      apiTemplateOrg: state => state.template._templateOrg,
      apiCategory: state => state.category._category
    }),
    templateId () {
      return Number(this.$route.params.templateId)
    }
  },
  methods: {
    setTemplate (template) {
      this.templateOri = {
        ...template
      }
      this.template = cloneDeep(this.templateOri)
    },
    openTemplatePreview () {
      this.previewView = true
    },
    closeTemplatePreview () {
      this.previewView = false
    },
    noClose (e) {
      e.stopPropagation()
    },
    openTemplatePrevious () {
      this.PreviousView = true
    },
    closeTemplatePrevious () {
      this.PreviousView = false
    },
    deploy (spinnerId) {
      this.spinnerId = spinnerId
      this.$store.dispatch(types.TEMPLATE_DEPLOY, this)
    },
    discardchange (spinnerId) {
      this.spinnerId = spinnerId
      this.$store.dispatch(types.TEMPLATE_DISCARDCHANGE, this)
    }
  },
  components: {
    TemplateStepBanner,
    TemplatePreview,
    TemplatePrevious
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

.alert {
  border: 1px solid $button-red;
  @extend .background;
}

form {
  table {
    width: 100%;
    font-size: 1.4rem;
    border-collapse: collapse;
  }
  tr {
    width: 1%;
    white-space: nowrap;
  }
  th, td {
    font-weight: normal;
    border: 2px solid $color-secondary;
    @extend .pt-2;
    @extend .pb-2;
  }
  th {
    @extend .background;
    @extend .pl-4
  }
  td {
    width: 80%;
  }
}
</style>
