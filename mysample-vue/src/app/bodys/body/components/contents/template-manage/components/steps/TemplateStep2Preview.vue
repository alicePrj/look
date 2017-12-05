<template>
  <div class="px-3" id="templateStep2">
    <template-step-banner></template-step-banner>
    <form class="text-left">
      <div>
        <div class="flex">
          <h4 class="mr-5">Query 확인</h4>
        </div>
        <div class="px-5 mb-4"><textarea id="queryeditor" title="queryeditor"></textarea></div>
      </div>
      <hr>
      <div>
        <h4 class="mr-5">Parameter</h4>
        <div class="px-5 mb-4 parameter">
          <div>
            <ul class="mb-0">
              <li v-for="(templateParameter, key) in template.templateParameters" :key="key">
                <div>{{templateParameter.paramType}}</div>
              </li>
              <!-- <li><div>@database</div></li>
              <li><div>@table</div></li>
              <li><div>@start_date</div></li>
              <li><div>@end_date</div></li>
              <li><div>@end_date</div></li>
              <li><div>@database</div></li>
              <li><div>@table</div></li>
              <li><div>@start_date</div></li>
              <li><div>@end_date</div></li>
              <li><div>@end_date</div></li> -->
            </ul>
          </div>
        </div>
      </div>
      <hr>
      <div :class="{divCheckQueryeditor: !template.countQueryUseyn}">
        <h4 class="mr-5">Count Query</h4>
        <div class="px-5 mb-4"><textarea id="checkQueryeditor" title="checkQueryeditor"></textarea></div>
      </div>
      <div class="flex px-5">
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
import { util } from '@/shared/utils/util'
import * as types from '@/shared/stores/types'
import TemplateStepBanner from './components/TemplateStepBanner.vue'
import CodeMirror from 'codemirror'
require('codemirror/mode/sql/sql')
require('codemirror/lib/codemirror.css')
require('codemirror/theme/dracula.css')
require('promise.prototype.finally').shim()

export default {
  data () {
    return {
      template: {
        templateParameters: []
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
        countQueryUseyn: template.countQueryUseyn === 'Y' || template.countQueryUseyn === true,
        templateParameters: template.templateParameters || []
      }
      this.template = cloneDeep(this.templateOri)
      this.editor.setValue(this.template.queryString)
      this.checkeditor.setValue(this.template.countQueryString)
    },
    goBack () {
      this.$router.push({name: 'template-step2'})
    },
    goNextStep () {
      if (this.template.templateParameters.length === 0) {
        util.toastr().warning('탐지된 Parameter가 없습니다.')
        return
      }
      this.$router.push({name: 'template-step3', params: {templateId: this.templateId, parameter: 'none'}})
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

      let checkQueryTextArea = document.getElementById('checkQueryeditor')
      this.checkeditor = CodeMirror.fromTextArea(checkQueryTextArea, {
        lineNumbers: true,
        mode: 'text/x-hive',
        autofocus: false,
        lineWrapping: true
      })
      this.checkeditor.setSize(null, '11rem')
      this.checkeditor.setOption('theme', 'dracula')
      this.checkeditor.setOption('readOnly', true)
    }
  },
  components: {
    TemplateStepBanner
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

.parameter {
  & > div {
    & ul {
      @extend .background;
      width: calc(100vw - 31rem);
      min-height: 5rem;
      list-style: none;
      display: flex;
      flex-wrap: wrap;
      @extend .text-center;
      @extend .p-2;
      & li {
        @extend .m-2;
        @extend .p-0;
        & div {
          background-color: $color-initial;
          color: $button-red;
          min-width: 16rem;
          border-radius: 10px;
          @extend .m-0;
          @extend .p-2;
        }
      }
    }
  }
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
