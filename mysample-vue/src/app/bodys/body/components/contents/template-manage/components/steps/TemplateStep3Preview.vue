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
                <tr>
                  <th class="title">
                    <div class="flex">
                      <div>
                        서비스
                        <icon class="question-icon" name="question-circle-o" scale="1"></icon>
                      </div>
                      <div class="empty"></div>
                    </div>
                  </th>
                  <td class="input_text">
                    <select class="mb-0" title="서비스">
                      <option>LINE Pokopoko</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <th class="title">
                    <div class="flex">
                      <div>
                        마지막 로그인 날짜
                      </div>
                      <div class="empty"></div>
                    </div>
                  </th>
                  <td class="input_text"><input type="text" class="mb-0" title="마지막 로그인 날짜" placeholder="" value="2017-08-05"></td>
                </tr>
                <tr>
                  <th class="title">
                    <div class="flex">
                      <div>
                        추출 기준
                        <icon class="question-icon" name="question-circle-o" scale="1"></icon>
                      </div>
                      <div class="empty"></div>
                    </div>
                  </th>
                  <td class="input_text">
                    <select class="mb-0" title="추출 기준">
                      <option>최근 로그인 순으로</option>
                    </select>
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
                <input type="button" class="button button-red mb-2" value="Query Check">
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr>
      <div>
        <div class="flex mb-5">
          <h4 class="mb-0 mr-5">Query 확인</h4>
        </div>
        <div class="px-5 mb-4"><textarea id="queryeditor" title="queryeditor"></textarea></div>
      </div>
      <hr>
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
import { cloneDeep } from 'lodash'
import * as types from '@/shared/stores/types'
import TemplateStepBanner from './components/TemplateStepBanner.vue'
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
  data () {
    return {
      template: {}
    }
  },
  watch: {
    apiTemplate: function (template) {
      this.setTemplate(template)
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
    setTemplate (template) {
      this.templateOri = {
        ...template
      }
      this.template = cloneDeep(this.templateOri)
    },
    goBack () {
      this.$router.push({name: 'template-step3', params: {templateId: this.templateId, parameter: 'none'}})
    },
    goNextStep () {
      this.$router.push({name: 'template-step4', params: {templateId: this.templateId, lang: 'EN'}})
    },
    createEditor () {
      let queryTextArea = document.getElementById('queryeditor')
      this.editor = CodeMirror.fromTextArea(queryTextArea, {
        lineNumbers: true,
        mode: 'text/x-hive',
        autofocus: false,
        lineWrapping: true
      })
      // Set initial query text on editor
      /* this.editor.setValue(this.query)
      this.editor.setCursor(this.query.length)
      this.editor.on('changes', this.queryChanged) */
      // Map 'tab' key to move focus on 'run' button
      /* let vm = this
      this.editor.setOption('extraKeys', {
        Tab: cm => vm.$refs.runBtn.focus()
      }) */
      this.editor.setValue('--test query\nSELECT * FROM oap_real_hbaccess WHERE dt=\'20170428\' limit 10\n\n')
      this.editor.setOption('theme', 'dracula')
    }
  },
  components: {
    TemplateStepBanner,
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
</style>
