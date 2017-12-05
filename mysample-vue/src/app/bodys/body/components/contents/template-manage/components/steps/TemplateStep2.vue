<template>
  <div class="px-3" id="templateStep2">
    <template-step-banner></template-step-banner>
    <form class="text-left">
      <div>
        <div class="flex">
          <h4 class="mb-0 mr-5">Query 작성 *</h4>
          <div class="pl-5 mr-5" style="line-height: 22.4px">
            [
            <a href="" target="_blank" class="pointer">주의사항</a> I
            <template-parameter-description></template-parameter-description>
            ]
          </div>
        </div>
        <p class="px-5 mb-4 p-description-color">※ 주의사항을 통해 Query에서 사용 가능한 Parameter 종류를 확인할 수 있습니다.</p>
        <div class="px-5 mb-4"><textarea id="queryeditor" title="queryeditor"></textarea></div>
      </div>
      <div class="d-none">
        <p class="px-5 mb-0 p-description-color">※ 스킨을 선택하여 주세요.</p>
        <div class="px-5">
          <select @change="selectTheme()" id="selectTheme" title="selectTheme">
            <option selected>default</option>
            <option>3024-day</option>
            <option>3024-night</option>
            <option>abcdef</option>
            <option>ambiance</option>
            <option>base16-dark</option>
            <option>base16-light</option>
            <option>bespin</option>
            <option>blackboard</option>
            <option>cobalt</option>
            <option>colorforth</option>
            <option selected="selected">dracula</option>
            <option>duotone-dark</option>
            <option>duotone-light</option>
            <option>eclipse</option>
            <option>elegant</option>
            <option>erlang-dark</option>
            <option>hopscotch</option>
            <option>icecoder</option>
            <option>isotope</option>
            <option>lesser-dark</option>
            <option>liquibyte</option>
            <option>material</option>
            <option>mbo</option>
            <option>mdn-like</option>
            <option>midnight</option>
            <option>monokai</option>
            <option>neat</option>
            <option>neo</option>
            <option>night</option>
            <option>panda-syntax</option>
            <option>paraiso-dark</option>
            <option>paraiso-light</option>
            <option>pastel-on-dark</option>
            <option>railscasts</option>
            <option>rubyblue</option>
            <option>seti</option>
            <option>solarized dark</option>
            <option>solarized light</option>
            <option>the-matrix</option>
            <option>tomorrow-night-bright</option>
            <option>tomorrow-night-eighties</option>
            <option>ttcn</option>
            <option>twilight</option>
            <option>vibrant-ink</option>
            <option>xq-dark</option>
            <option>xq-light</option>
            <option>yeti</option>
            <option>zenburn</option>
          </select>
        </div>
        <div class="px-5 flex">
          <div class="mr-3" v-for="(theme, key) in ['bespin', 'dracula', 'material', 'monokai', 'panda-syntax', 'paraiso-dark', 'railscasts', 'tomorrow-night-bright', 'tomorrow-night-eighties', 'vibrant-ink']" :key="key">
            <input type="radio" :checked=" theme === 'dracula'" name="radioSelectTheme" :id="'radioSelectTheme_' + theme" @click="editor.setOption('theme', theme); checkeditor.setOption('theme', theme)" title="theme">
            <label :for="'radioSelectTheme_' + theme" style="display: inline">{{theme}}</label>
          </div>
        </div>
      </div>
      <hr>
      <div>
        <h4 class="mb-0 mr-5">Count Check Query *</h4>
        <p class="px-5 mb-4 p-description-color">※ 결과값의 개수를 제공할 지 여부입니다.(MID 추출 관련 Query에 추천합니다.)</p>
        <div class="px-5 mb-4">
          <span>Count Check 사용 여부</span>
          <span class="ml-3"><toggle-button :value="false" color="#428BCA" style="font-size:1.1rem; text-transform:uppercase" :width="64" :height="30" :sync="true" :labels="true" v-model="template.countQueryUseyn"></toggle-button></span>
        </div>
        <div class="px-5 mb-4" :class="{divCheckQueryeditor: !template.countQueryUseyn}"><textarea id="checkQueryeditor" title="checkQueryeditor"></textarea></div>
      </div>
      <div class="flex px-5">
        <div class="empty"></div>
        <div>
          <input type="button" class="button button-outline mb-2" value="Cancel" @click="reset()">
          <span class="position-relative" id="spinnerSave">
            <input type="button" class="button mb-2" value="Save" @click="goPreview('spinnerSave')">
          </span>
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
import TemplateParameterDescription from './components/TemplateParameterDescription.vue'
import CodeMirror from 'codemirror'
require('codemirror/mode/sql/sql')
require('codemirror/lib/codemirror.css')
require('codemirror/theme/3024-day.css')
require('codemirror/theme/3024-night.css')
require('codemirror/theme/abcdef.css')
require('codemirror/theme/ambiance.css')
require('codemirror/theme/base16-dark.css')
require('codemirror/theme/bespin.css')
require('codemirror/theme/base16-light.css')
require('codemirror/theme/blackboard.css')
require('codemirror/theme/cobalt.css')
require('codemirror/theme/colorforth.css')
require('codemirror/theme/dracula.css')
require('codemirror/theme/duotone-dark.css')
require('codemirror/theme/duotone-light.css')
require('codemirror/theme/eclipse.css')
require('codemirror/theme/elegant.css')
require('codemirror/theme/erlang-dark.css')
require('codemirror/theme/hopscotch.css')
require('codemirror/theme/icecoder.css')
require('codemirror/theme/isotope.css')
require('codemirror/theme/lesser-dark.css')
require('codemirror/theme/liquibyte.css')
require('codemirror/theme/material.css')
require('codemirror/theme/mbo.css')
require('codemirror/theme/mdn-like.css')
require('codemirror/theme/midnight.css')
require('codemirror/theme/monokai.css')
require('codemirror/theme/neat.css')
require('codemirror/theme/neo.css')
require('codemirror/theme/night.css')
require('codemirror/theme/panda-syntax.css')
require('codemirror/theme/paraiso-dark.css')
require('codemirror/theme/paraiso-light.css')
require('codemirror/theme/pastel-on-dark.css')
require('codemirror/theme/railscasts.css')
require('codemirror/theme/rubyblue.css')
require('codemirror/theme/seti.css')
require('codemirror/theme/solarized.css')
require('codemirror/theme/the-matrix.css')
require('codemirror/theme/tomorrow-night-bright.css')
require('codemirror/theme/tomorrow-night-eighties.css')
require('codemirror/theme/ttcn.css')
require('codemirror/theme/twilight.css')
require('codemirror/theme/vibrant-ink.css')
require('codemirror/theme/xq-dark.css')
require('codemirror/theme/xq-light.css')
require('codemirror/theme/yeti.css')
require('codemirror/theme/zenburn.css')
require('promise.prototype.finally').shim()

export default {
  data () {
    return {
      template: {
        queryString: '',
        countQueryString: '',
        countQueryUseyn: false
      }
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
        templateId: template.templateId,
        queryString: template.queryString || '',
        countQueryString: template.countQueryString || '',
        countQueryUseyn: template.countQueryUseyn === 'Y' || template.countQueryUseyn === true
      }
      this.template = cloneDeep(this.templateOri)
      this.editor.setValue(this.template.queryString)
      this.checkeditor.setValue(this.template.countQueryString)
    },
    selectTheme () {
      let input = document.getElementById('selectTheme')
      let theme = input.options[input.selectedIndex].textContent
      this.editor.setOption('theme', theme)
      this.checkeditor.setOption('theme', theme)
    },
    goPreview (spinnerId) {
      this.spinnerId = spinnerId
      this.$store.dispatch(types.TEMPLATE_SAVE_2, this)
    },
    createEditor () {
      let queryTextArea = document.getElementById('queryeditor')
      this.editor = CodeMirror.fromTextArea(queryTextArea, {
        lineNumbers: true,
        mode: 'text/x-hive',
        autofocus: true,
        lineWrapping: true
      })
      // Set initial query text on editor
      /* this.editor.setValue(this.template.queryString)
      this.editor.setCursor(this.template.queryString.length)
      this.editor.on('changes', this.queryChanged) */
      // Map 'tab' key to move focus on 'run' button
      /* let vm = this
      this.editor.setOption('extraKeys', {
        Tab: cm => vm.$refs.runBtn.focus()
      }) */
      // this.editor.setValue('--test query\nSELECT * FROM oap_real_hbaccess WHERE dt=\'20170428\' limit 10\n\n')
      this.editor.setOption('theme', 'dracula')
      this.editor.on('changes', (cm) => {
        this.template.queryString = cm.getValue()
      })

      let checkQueryTextArea = document.getElementById('checkQueryeditor')
      this.checkeditor = CodeMirror.fromTextArea(checkQueryTextArea, {
        lineNumbers: true,
        mode: 'text/x-hive',
        autofocus: false,
        lineWrapping: true
      })
      // let vm = this
      this.checkeditor.setSize(null, '11rem')
      // this.checkeditor.setValue('--test query\nSELECT * FROM oap_real_hbaccess WHERE dt=\'20170428\' limit 10\n\n')
      this.checkeditor.setOption('theme', 'dracula')
      this.checkeditor.on('changes', (cm) => {
        this.template.countQueryString = cm.getValue()
      })
      /* this.checkeditor.setOption('extraKeys', {
        Tab: cm => vm.$refs.runBtn.focus()
      }) */
    },
    reset () {
      if (!confirm('지금까지 입력한 내용이 모두 삭제됩니다.')) {
        return
      }
      this.setTemplate(this.templateOri)
    }
  },
  components: {
    TemplateStepBanner,
    TemplateParameterDescription
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

.divCheckQueryeditor {
  position: absolute;
  top: -1000px;
  left: 0;
  width: 100%;
  height: 11rem;
  overflow: hidden;
}

h4:before {
  content: "• ";
}

form {
  select {
    display: inline !important;
  }
}
</style>
