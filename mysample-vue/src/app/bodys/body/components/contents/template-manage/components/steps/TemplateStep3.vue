<template>
  <div class="px-3">
    <template-step-banner></template-step-banner>
    <form class="text-left">
      <div>
        <div class="flex mb-5">
          <h4 class="mb-0 mr-5">Query 확인</h4>
          <div class="pl-5 mr-5" style="line-height: 22.4px">
            [
            <a class="pointer" @click="toggleQueryOpen()">펼치기
              <icon :class="{'d-none': viewQueryOpen}" name="caret-down" scale="1"></icon>
              <icon :class="{'d-none': !viewQueryOpen}" name="caret-up" scale="1"></icon>
            </a>
            ]
          </div>
        </div>
        <div class="px-5 mb-4" :class="{divQueryeditor: !viewQueryOpen}"><textarea id="queryeditor" title="queryeditor"></textarea></div>
      </div>
      <hr>
      <div>
        <h4 class="mb-0 mr-5">Parameter</h4>
        <p class="px-5 mb-4 p-description-color">※ 좌측 메뉴에서 Parameter를 Drag & Drop하여 노출 순서를 변경할 수 있습니다.</p>
        <div class="px-5 mb-4 parameter" v-if="template.templateParameters.length > 0">
          <div>
            <div class="left-menu">
              <ul class="mb-0 position-relative" id="spinnerParameter">
                <draggable v-model="parameters" :options="dragOptions" @start="drag=true" @end="drag=false">
                  <li v-for="(_parameter, key) in parameters" :key="key">
                    <router-link v-bind:to="{name: 'template-step3', params: {templateId: templateId, parameter: _parameter.paranmInquery}}" activeClass="active" exact>
                      <div>
                        <icon class="circle-icon" v-if="templateOri.templateParameters[key].paramAttr" name="check-circle" scale="1"></icon>
                        <icon class="circle-icon" v-if="!templateOri.templateParameters[key].paramAttr" name="times-circle" scale="1"></icon>
                        <span>{{_parameter.paranmInquery}}</span>
                      </div>
                    </router-link>
                  </li>
                </draggable>
              </ul>
            </div>
            <div class="right-menu ml-4 p-4" v-if="parameter !== 'none'">
              <h5 class="mb-0">{{ parameter }} setting</h5>
              <hr>
              <parameter-database v-if="parameterSelect('@database')" :templateParameter="template.templateParameters[parameterFindIndex()]"></parameter-database>
              <parameter-table v-if="parameterSelect('@table')" :templateParameter="template.templateParameters[parameterFindIndex()]"></parameter-table>
              <parameter-column v-if="parameterSelect('@column')" :templateParameter="template.templateParameters[parameterFindIndex()]"></parameter-column>
              <parameter-code v-if="parameterSelect('@code')" :templateParameter="template.templateParameters[parameterFindIndex()]"></parameter-code>
              <parameter-int v-if="parameterSelect('@int')" :templateParameter="template.templateParameters[parameterFindIndex()]"></parameter-int>
              <parameter-string v-if="parameterSelect('@string')" :templateParameter="template.templateParameters[parameterFindIndex()]"></parameter-string>
              <parameter-start-int-end-int v-if="parameterSelect('@startInt~@endInt')" :templateParameter="template.templateParameters[parameterFindIndex()]"></parameter-start-int-end-int>
              <parameter-y-n v-if="parameterSelect('@yn')" :templateParameter="template.templateParameters[parameterFindIndex()]"></parameter-y-n>
              <parameter-inequality v-if="parameterSelect('@><')" :templateParameter="template.templateParameters[parameterFindIndex()]"></parameter-inequality>
              <parameter-game-code v-if="parameterSelect('@gameCode')" :templateParameter="template.templateParameters[parameterFindIndex()]"></parameter-game-code>
              <parameter-user-type v-if="parameterSelect('@userType')" :templateParameter="template.templateParameters[parameterFindIndex()]"></parameter-user-type>
              <parameter-order v-if="parameterSelect('@order')" :templateParameter="template.templateParameters[parameterFindIndex()]"></parameter-order>
              <parameter-custom v-if="parameterSelect('@custom')" :templateParameter="template.templateParameters[parameterFindIndex()]"></parameter-custom>
              <parameter-date v-if="parameterSelect('@date')" :templateParameter="template.templateParameters[parameterFindIndex()]"></parameter-date>
              <parameter-start-date-end-date v-if="parameterSelect('@startDate~@endDate')" :templateParameter="template.templateParameters[parameterFindIndex()]"></parameter-start-date-end-date>
              <parameter-start-time-end-time v-if="parameterSelect('@startTime~@endTime')" :templateParameter="template.templateParameters[parameterFindIndex()]"></parameter-start-time-end-time>
              <parameter-country v-if="parameterSelect('@country')" :templateParameter="template.templateParameters[parameterFindIndex()]"></parameter-country>
              <parameter-os v-if="parameterSelect('@os')" :templateParameter="template.templateParameters[parameterFindIndex()]"></parameter-os>
              <parameter-login-type v-if="parameterSelect('@loginType')" :templateParameter="template.templateParameters[parameterFindIndex()]"></parameter-login-type>
              <parameter-upload-table v-if="parameterSelect('@uploadTable')" :templateParameter="template.templateParameters[parameterFindIndex()]"></parameter-upload-table>
              <parameter-comment v-if="parameterSelect('@/*~@*/')" :templateParameter="template.templateParameters[parameterFindIndex()] || {}"></parameter-comment>
              <parameter-option-comment v-if="parameterSelect('@opt(A)/*~@opt(B)*/')" :templateParameter="template.templateParameters[parameterFindIndex()] || {}"></parameter-option-comment>
              <div class="flex-grow-1"></div>
              <div class="flex px-5">
                <div class="empty"></div>
                <div>
                  <input type="button" class="button button-outline mb-2" value="Cancel" @click="reset()">
                  <span class="position-relative" id="spinnerSave">
                    <input type="button" class="button button-red mb-2" value="Save" @click="save('spinnerSave')">
                  </span>
                </div>
              </div>
            </div>
            <div class="right-menu ml-4 p-4" v-if="parameter === 'none'"></div>
          </div>
        </div>
      </div>
      <hr v-if="template.templateParameters.length > 0">
      <div class="flex px-5" v-if="template.templateParameters.length > 0">
        <p class="mb-0">모든 Parameter Setting이 완료되면, 다음 Step으로 진행해 주세요.</p>
        <div class="empty"></div>
        <div>
          <input type="button" class="button mb-0" value="Next" @click="goPreview()" :class="{invalid: !checkNextStep}">
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { cloneDeep, findIndex } from 'lodash'
import * as types from '@/shared/stores/types'
import { util } from '@/shared/utils/util'
import draggable from 'vuedraggable'
import TemplateStepBanner from './components/TemplateStepBanner.vue'
import ParameterDatabase from './components/parameter/ParameterDatabase.vue'
import ParameterTable from './components/parameter/ParameterTable.vue'
import ParameterColumn from './components/parameter/ParameterColumn.vue'
import ParameterCode from './components/parameter/ParameterCode.vue'
import ParameterInt from './components/parameter/ParameterInt.vue'
import ParameterString from './components/parameter/ParameterString.vue'
import ParameterStartIntEndInt from './components/parameter/ParameterStartIntEndInt.vue'
import ParameterYN from './components/parameter/ParameterYN.vue'
import ParameterInequality from './components/parameter/ParameterInequality.vue'
import ParameterGameCode from './components/parameter/ParameterGameCode.vue'
import ParameterUserType from './components/parameter/ParameterUserType.vue'
import ParameterOrder from './components/parameter/ParameterOrder.vue'
import ParameterCustom from './components/parameter/ParameterCustom.vue'
import ParameterDate from './components/parameter/ParameterDate.vue'
import ParameterStartDateEndDate from './components/parameter/ParameterStartDateEndDate.vue'
import ParameterStartTimeEndTime from './components/parameter/ParameterStartTimeEndTime.vue'
import ParameterCountry from './components/parameter/ParameterCountry.vue'
import ParameterOs from './components/parameter/ParameterOs.vue'
import ParameterLoginType from './components/parameter/ParameterLoginType.vue'
import ParameterUploadTable from './components/parameter/ParameterUploadTable.vue'
import ParameterComment from './components/parameter/ParameterComment.vue'
import ParameterOptionComment from './components/parameter/ParameterOptionComment.vue'
import Icon from 'vue-awesome/components/Icon.vue'
import 'vue-awesome/icons/caret-down'
import 'vue-awesome/icons/caret-up'
import 'vue-awesome/icons/check-circle'
import 'vue-awesome/icons/times-circle'
import CodeMirror from 'codemirror'
require('codemirror/mode/sql/sql')
require('codemirror/lib/codemirror.css')
require('codemirror/theme/dracula.css')
require('promise.prototype.finally').shim()

export default {
  data () {
    return {
      queryOpen: false,
      template: {
        templateParameters: []
      },
      templateOri: {
        templateParameters: []
      },
      orders: [],
      editable: true,
      drag: false
    }
  },
  watch: {
    apiTemplate: function (template) {
      this.setTemplate(template)
      if (this.parameter === 'none' && template.templateParameters && template.templateParameters.length > 0) {
        this.$router.push({name: 'template-step3', params: {templateId: this.templateId, parameter: template.templateParameters[0].paranmInquery}})
      }
    }
  },
  computed: {
    ...mapState({
      apiTemplate: state => state.template._template
    }),
    viewQueryOpen () {
      return this.queryOpen
    },
    templateId () {
      return Number(this.$route.params.templateId)
    },
    parameter () {
      return this.$route.params.parameter
    },
    dragOptions () {
      return {
        group: 'ThirdDepthTemplates',
        disabled: !this.editable
      }
    },
    parameters: {
      get () {
        return this.template.templateParameters
      },
      set (orders) {
        this.orders = orders
        this.spinnerId = 'spinnerParameter'
        this.$store.dispatch(types.TEMPLATE_PARAMETER_ORDER, this)
        this.template.templateParameters = orders
      }
    },
    checkNextStep () {
      return this.template.lastStep >= 3/*  && this.parametersEmptyChenck() */
    }
  },
  methods: {
    setTemplate (template) {
      this.templateOri = {
        templateId: template.templateId,
        queryString: template.queryString || '',
        templateParameters: template.templateParameters || [],
        lastStep: template.lastStep
      }
      this.template = cloneDeep(this.templateOri)
      this.editor.setValue(this.template.queryString)
    },
    toggleQueryOpen () {
      this.queryOpen = !this.queryOpen
    },
    goPreview () {
      if (!this.checkNextStep) {
        util.toastr().warning('Parameter setting을 완료해 주세요.')
      } else {
        this.$router.push({name: 'template-step3-preview', params: {templateId: this.templateId, lang: 'EN'}})
      }
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
      this.editor.setOption('readOnly', true)
    },
    /* parametersEmptyChenck () {
      let i = 0
      for (; i < this.templateOri.templateParameters.length; i += 1) {
        if (!this.templateOri.templateParameters[i].paramAttr) {
          break
        }
      }
      return i > 0 && i === this.templateOri.templateParameters.length
    }, */
    parameterSelect (type) {
      const parameter = this.parameter.toLowerCase()
      let rtn
      switch (type) {
        case '@startInt~@endInt':
        case '@startDate~@endDate':
        case '@startTime~@endTime':
          const types = type.split('~')
          rtn = parameter.indexOf(types[0].toLowerCase()) === 0 && parameter.indexOf(types[1].toLowerCase()) > 0
          break
        default:
          rtn = parameter.indexOf(type.toLowerCase()) === 0
      }
      return rtn
    },
    parameterFindIndex () {
      return findIndex(this.template.templateParameters, ['paranmInquery', this.parameter])
    },
    parameterType () {
      const types = [
        '@database', '@table', '@column', '@code', '@int', '@string', '@startInt~@endInt', '@yn', '@><',
        '@gameCode', '@userType', '@order', '@custom', '@date', '@startDate~@endDate', '@startTime~@endTime',
        '@country', '@os', '@loginType', '@updateTable', '@/*~@*/', '@opt(A)/*~@opt(B)*/'
      ]
      for (let i = 0; i < types.length; i += 1) {
        if (this.parameterSelect(types[i])) {
          return types[i]
        }
      }
    },
    reset () {
      if (!confirm('지금까지 입력한 내용이 모두 삭제됩니다.')) {
        return
      }
      this.template = cloneDeep(this.templateOri)
    },
    save (spinnerId) {
      this.spinnerId = spinnerId
      this.$store.dispatch(types.TEMPLATE_PARAMETER, this)
    }
  },
  components: {
    draggable,
    TemplateStepBanner,
    ParameterDatabase,
    ParameterTable,
    ParameterColumn,
    ParameterCode,
    ParameterInt,
    ParameterString,
    ParameterStartIntEndInt,
    ParameterYN,
    ParameterInequality,
    ParameterGameCode,
    ParameterUserType,
    ParameterOrder,
    ParameterCustom,
    ParameterDate,
    ParameterStartDateEndDate,
    ParameterStartTimeEndTime,
    ParameterCountry,
    ParameterOs,
    ParameterLoginType,
    ParameterUploadTable,
    ParameterComment,
    ParameterOptionComment,
    Icon
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

.divQueryeditor {
  position: absolute;
  top: -1000px;
  left: 0;
  width: 100%;
  height: 11rem;
  overflow: hidden;
}

.parameter {
  & > div {
    display: flex;
    & .left-menu {
      @extend .background;
      & ul {
        list-style: none;
        @extend .text-center;
        @extend .p-2;
        & li {
          @extend .m-2;
          @extend .p-2;
          & div {
            background-color: $color-initial;
            color: $button-red;
            width: 23rem;
            border-radius: 10px;
            position: relative;
            // cursor: pointer;
            @extend .m-0;
            @extend .p-2;
            & a {
              color: $button-red;
            }
            & .circle-icon {
              position: absolute;
              top: 10px;
              left: 10px;
              color: black;
            }
          }
          & .active {
            & span {
              text-decoration: underline;
            }
          }
        }
      }
    }
    & .right-menu {
      display: flex;
      flex-direction: column;
      border: 1px solid $border-color-primary;
      @extend .flex-grow-1;
    }
  }
}
</style>
