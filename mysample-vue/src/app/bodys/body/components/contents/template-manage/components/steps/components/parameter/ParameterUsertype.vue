<template>
  <div>
    <component-user-display placeholderEN="User Type" :templateParameter="templateParameter"></component-user-display>
    <hr>
    <div>
      <h6 class="mb-0">사용 Query</h6>
      <p class="px-5 mb-4 p-description-color">※ 유저가 해당 항목에서 정의된 Query를 사용하게 됩니다. 항상 Query에 해당 내용이 정의되어 있어야 합니다.</p>
      <div class="px-5"><textarea id="useQueryeditor" title="useQueryeditor"></textarea></div>
    </div>
    <hr>
    <div>
      <h6 class="mb-0">사용할 Type*</h6>
      <p class="px-5 mb-4 p-description-color">※ 실제 Query에 정의된 항목 중 List에 노출할 대상을 결정합니다.</p>
      <div class="px-5">
        <table class="normalTable">
          <tbody>
            <tr>
              <td class="input_text">
                <input type="checkbox" class="mb-0 pointer" name="usertypeNRU" id="usertypeNRU" v-model="templateParameter.paramAttr.NRU_">
                <label class="normalLabel" for="usertypeNRU">NRU</label>
              </td>
              <td class="input_text">
                <input type="checkbox" class="mb-0 pointer" name="usertypeCBU" id="usertypeCBU" v-model="templateParameter.paramAttr.CBU_">
                <label class="normalLabel" for="usertypeCBU">CBU</label>
              </td>
              <td class="input_text">
                <input type="checkbox" class="mb-0 pointer" name="usertypeSTU" id="usertypeSTU" v-model="templateParameter.paramAttr.STU_">
                <label class="normalLabel" for="usertypeSTU">STU</label>
              </td>
            </tr>
            <tr>
              <td class="input_text">
                <input type="checkbox" class="mb-0 pointer" name="usertypeLeaveUser" id="usertypeLeaveUser" v-model="templateParameter.paramAttr.LeaveUser_">
                <label class="normalLabel" for="usertypeLeaveUser">Leave User</label>
              </td>
              <td class="input_text">
                <input type="checkbox" class="mb-0 pointer" name="usertypeContinuousUser" id="usertypeContinuousUser" v-model="templateParameter.paramAttr.ContinuousUser_">
                <label class="normalLabel" for="usertypeContinuousUser">Continuous User</label>
              </td>
              <td class="input_text">
                <input type="checkbox" class="mb-0 pointer" name="usertypeRestUser" id="usertypeRestUser" v-model="templateParameter.paramAttr.RestUser_">
                <label class="normalLabel" for="usertypeRestUser">Rest User</label>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <hr>
    <component-select-type paramaterType="userType" :templateParameter="templateParameter"></component-select-type>
  </div>
</template>

<script>
import ComponentUserDisplay from './components/ComponentUserDisplay.vue'
import ComponentSelectType from './components/ComponentSelectType.vue'
import CodeMirror from 'codemirror'
require('codemirror/mode/sql/sql')
require('codemirror/lib/codemirror.css')
require('codemirror/theme/dracula.css')
require('promise.prototype.finally').shim()

export default {
  props: {
    templateParameter: {
      type: Object
    }
  },
  watch: {
    templateParameter: function () {
      this.init()
    }
  },
  methods: {
    init () {
      if (!this.templateParameter.paramAttr) {
        this.templateParameter.paramAttr = {
          selectType: 0,
          NRU_: false,
          CBU_: false,
          STU_: false,
          LeaveUser_: false,
          ContinuousUser_: false,
          RestUser_: false
        }
      }
    },
    createEditor () {
      let useQueryTextArea = document.getElementById('useQueryeditor')
      this.useditor = CodeMirror.fromTextArea(useQueryTextArea, {
        lineNumbers: true,
        mode: 'text/x-hive',
        autofocus: false,
        lineWrapping: true
      })
      // let vm = this
      this.useditor.setSize(null, '11rem')
      this.useditor.setValue('CASE WHEN join_dt=@date1 THEN \'NRU\'\n     WHEN join_dt>@date 1 THEN \'CBU\'\n     WHEN lst_use_dt>@date1 THEN \'STU\'\n     ELSE LEAVE USER\' END AS usertype')
      this.useditor.setOption('theme', 'dracula')
      this.useditor.setOption('readOnly', true)
    }
  },
  components: {
    ComponentUserDisplay,
    ComponentSelectType
  },
  created () {
    this.init()
  },
  mounted () {
    this.createEditor()
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/settings.scss";
</style>
