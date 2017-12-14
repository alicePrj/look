<template>
  <div class="px-3">
    <template-step-banner></template-step-banner>
    <form class="text-left">
      <div>
        <div class="flex mb-5">
          <h4 class="mb-0 mr-5">조건영역 미리보기</h4>
        </div>
        <div class="px-5 mb-4">
          <div ref="tabs" class="tab clearfix">
            <router-link v-bind:to="{name: 'template-step3-preview', params: {templateId: templateId, lang: 'EN'}}" class="button button-clear column column-10 db-tab" activeClass="tab-selected" exact>EN</router-link>
            <router-link v-bind:to="{name: 'template-step3-preview', params: {templateId: templateId, lang: 'KR'}}" class="button button-clear column column-10 db-tab" activeClass="tab-selected" exact>KR</router-link>
            <router-link v-bind:to="{name: 'template-step3-preview', params: {templateId: templateId, lang: 'JP'}}" class="button button-clear column column-10 db-tab" activeClass="tab-selected" exact>JP</router-link>
          </div>
          <div class="background text-left py-4 px-5">
            <p class="p-description-color">
              <icon class="exclamation-icon" name="exclamation-circle" scale="1"></icon>
              Probe를 시작하기 위한 기본 조건을 선택해 주세요.
            </p>
            <table>
              <tbody>
                <tr v-for="(templateParameter, key) in template.templateParameters" :key="key">
                  <th class="title">
                    <div class="flex">
                      <div>
                        {{getDisplayName(templateParameter)}}
                        <icon class="question-icon" name="question-circle-o" scale="1"></icon>
                      </div>
                      <div class="empty"></div>
                    </div>
                  </th>
                  <td class="input_text">
                    <parameter-preview-database v-if="'@database' === templateParameter.paramType.toLowerCase()" :templateParameter="templateParameter"></parameter-preview-database>
                    <parameter-preview-table v-if="'@table' === templateParameter.paramType.toLowerCase()" :templateParameter="templateParameter" :dependencyDatabase="getDependencyDatabase(templateParameter, 'table')"></parameter-preview-table>
                    <parameter-preview-column v-if="'@column' === templateParameter.paramType.toLowerCase()" :templateParameter="templateParameter" :dependencyDatabase="getDependencyDatabase(templateParameter, 'column')" :dependencyTable="getDependencyTable(templateParameter)"></parameter-preview-column>
                    <parameter-preview-code v-if="'@code' === templateParameter.paramType.toLowerCase()" :templateParameter="templateParameter" :dependencyDatabase="getDependencyDatabase(templateParameter, 'code')"></parameter-preview-code>
                    <parameter-preview-int v-if="'@int' === templateParameter.paramType.toLowerCase()" :templateParameter="templateParameter"></parameter-preview-int>
                    <parameter-preview-string v-if="'@string' === templateParameter.paramType.toLowerCase()" :templateParameter="templateParameter" :lang="lang"></parameter-preview-string>
                    <parameter-preview-start-int-end-int v-if="'@startInt~@endInt'.toLowerCase() === templateParameter.paramType.toLowerCase()" :templateParameter="templateParameter"></parameter-preview-start-int-end-int>
                    <parameter-preview-y-n v-if="'@yn' === templateParameter.paramType.toLowerCase()" :templateParameter="templateParameter" :lang="lang"></parameter-preview-y-n>
                  </td>
                </tr>
              </tbody>
            </table>
            <hr class="hr">
            <table>
              <tbody>
                <tr>
                  <th class="title">
                    <div class="flex">
                      <div>
                        국가 선택
                      </div>
                      <div class="empty"></div>
                    </div>
                  </th>
                  <td class="input_text">
                    <select class="mb-0" title="국가 선택">
                      <option>All</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <th class="title">
                    <div class="flex">
                      <div>
                        OS 선택
                      </div>
                      <div class="empty"></div>
                    </div>
                  </th>
                  <td class="input_text">
                    <select class="mb-0" title="OS 선택">
                      <option>All</option>
                    </select>
                  </td>
                </tr>
              </tbody>
            </table>
            <hr class="hr">
            <div>
              <div class="position-relative-z-index-1 pl-5">
                <icon class="minus-circle" name="minus-circle" scale="1"></icon>
                Hide Options
              </div>
            </div>
            <div class="flex">
              <div class="empty"></div>
              <div>
                <span class="position-relative" id="spinnerCheck">
                  <input type="button" class="button button-red mb-2" value="Query Check" @click="queryCheck('spinnerCheck')">
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr>
      <div :class="{divCheckQueryeditor: !templateQueryCheck}">
        <div class="flex mb-5">
          <h4 class="mb-0 mr-5">Query 확인</h4>
        </div>
        <div class="px-5 mb-4"><textarea id="queryeditor" title="queryeditor"></textarea></div>
      </div>
      <hr :class="{'d-none': !templateQueryCheck}">
      <div class="flex px-5">
        <p class="mb-0">조건영역 화면과 Query 확인 후 . 다음 단계로 진행해 주세요.</p>
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
import { map, cloneDeep, findIndex } from 'lodash'
import * as types from '@/shared/stores/types'
import TemplateStepBanner from './components/TemplateStepBanner.vue'
import ParameterPreviewDatabase from './components/parameterPreview/ParameterPreviewDatabase.vue'
import ParameterPreviewTable from './components/parameterPreview/ParameterPreviewTable.vue'
import ParameterPreviewColumn from './components/parameterPreview/ParameterPreviewColumn.vue'
import ParameterPreviewCode from './components/parameterPreview/ParameterPreviewCode.vue'
import ParameterPreviewInt from './components/parameterPreview/ParameterPreviewInt.vue'
import ParameterPreviewString from './components/parameterPreview/ParameterPreviewString.vue'
import ParameterPreviewStartIntEndInt from './components/parameterPreview/ParameterPreviewStartIntEndInt.vue'
import ParameterPreviewYN from './components/parameterPreview/ParameterPreviewYN.vue'
import Icon from 'vue-awesome/components/Icon.vue'
import 'vue-awesome/icons/exclamation-circle'
import 'vue-awesome/icons/question-circle-o'
import 'vue-awesome/icons/minus-circle'
import CodeMirror from 'codemirror'
require('codemirror/mode/sql/sql')
require('codemirror/lib/codemirror.css')
require('codemirror/theme/dracula.css')
require('promise.prototype.finally').shim()

export default {
  components: {
    TemplateStepBanner,
    ParameterPreviewDatabase,
    ParameterPreviewTable,
    ParameterPreviewColumn,
    ParameterPreviewCode,
    ParameterPreviewInt,
    ParameterPreviewString,
    ParameterPreviewStartIntEndInt,
    ParameterPreviewYN,
    Icon
  },
  data () {
    return {
      template: {
        templateParameters: []
      },
      templateQueryCheck: ''
    }
  },
  watch: {
    apiTemplate: function (template) {
      this.setTemplate(template)
    },
    apiTemplateQueryCheck: function (templateQueryCheck) {
      this.templateQueryCheck = templateQueryCheck
      this.editor.setValue(templateQueryCheck)
    }
  },
  computed: {
    ...mapState({
      apiTemplate: state => state.template._template,
      apiTemplateQueryCheck: state => state.template._templateQueryCheck
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
      map(this.templateOri.templateParameters, (templateParameter, key) => {
        templateParameter.paramAttribute = {}
      })
      this.template = cloneDeep(this.templateOri)
    },
    goBack () {
      this.$router.push({name: 'template-step3', params: {templateId: this.templateId, parameter: 'none'}})
    },
    goNextStep () {
      this.$router.push({name: 'template-step4', params: {templateId: this.templateId, lang: 'EN'}})
    },
    queryCheck (spinnerId) {
      this.spinnerId = spinnerId
      this.$store.dispatch(types.TEMPLATE_PARAMETER_QUERY_CHECK, this)
    },
    createEditor () {
      let queryTextArea = document.getElementById('queryeditor')
      this.editor = CodeMirror.fromTextArea(queryTextArea, {
        lineNumbers: true,
        mode: 'text/x-hive',
        autofocus: false,
        lineWrapping: true
      })
      this.editor.setOption('theme', 'dracula')
      // this.editor.setOption('readOnly', true)
    },
    getDisplayName (templateParameter) {
      if (this.lang === 'KR' && templateParameter.paramNmKr) {
        return templateParameter.paramNmKr
      } else if (this.lang === 'JP' && templateParameter.paramNmJp) {
        return templateParameter.paramNmJp
      } else {
        return templateParameter.paramNmEn
      }
    },
    getDependencyDatabase (templateParameter, from) {
      const noDependency = { paramAttribute: { databaseValue: 'noDependency' } }
      const notFoundDependency = { paramAttribute: { databaseValue: '' } }
      const comp1 = from === 'column' ? 2 : 1
      if (templateParameter.paramAttr.dependencyType === comp1) {
        return noDependency
      }
      const databaseParameter = this.template.templateParameters[findIndex(this.template.templateParameters, ['paranmInquery', templateParameter.paramAttr.databaseValue])] || notFoundDependency
      return databaseParameter
    },
    getDependencyTable (templateParameter) {
      const noDependency = { paramAttribute: { tableValue: 'noDependency' } }
      const notFoundDependency = { paramAttribute: { tableValue: '' } }
      if (templateParameter.paramAttr.dependencyType !== 1) {
        return noDependency
      }
      const databaseParameter = this.template.templateParameters[findIndex(this.template.templateParameters, ['paranmInquery', templateParameter.paramAttr.tableValue])] || notFoundDependency
      return databaseParameter
    }
  },
  created () {
    this.$store.dispatch(types.TEMPLATE_GET, this.templateId)
  },
  mounted () {
    this.createEditor()
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/settings.scss";

h4:before {
  content: "• ";
}

p {
  position: relative;
  & .exclamation-icon {
    top: 2px;
    left: -2.2rem;
    position: absolute;
  }
}

form {
  table {
    width: 100%;
    font-size: 1.4rem;
    padding-right: 20rem;
  }
  tr {
    width: 1%;
    white-space: nowrap;
  }
  th, td {
    font-weight: normal;
    border-bottom-width: 0;
    @extend .pt-2;
    @extend .pb-2;
    & > div {
      & > div {
        position: relative;
        & .question-icon {
          position: absolute;
          top: 2px;
          right: -2.2rem;
        }
      }
    }
    & input {
      background-color: $color-initial;
    }
    & select {
      background-color: $color-initial;
    }
  }
  th {
    width: 13rem;
  }
}

.hr {
  border-top: 1px solid $border-color-primary;
}

.minus-circle {
  position: absolute;
  top: 4px;
  left: 0;
}

.divCheckQueryeditor {
  position: absolute;
  top: -1000px;
  left: 0;
  width: 100%;
  height: 11rem;
  overflow: hidden;
}
</style>
