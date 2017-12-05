<template>
  <div>
    <component-user-display placeholderEN="Service Name" :templateParameter="templateParameter"></component-user-display>
    <hr>
    <div>
      <h6 class="mb-0">Internal_line DB 포함여부 *</h6>
      <p class="px-5 mb-4 p-description-color">※ internal_line DB를 Select box에 포함시킬지 여부를 선택합니다.</p>
      <div class="px-5">
        <table class="normalTable">
          <tbody>
            <tr>
              <th class="title">
                <input class="mb-0 pointer" type="radio" name="InternalLineDB" id="InternalLineDBIn" value="Y" v-model="templateParameter.paramAttr.internalLine" @change="changeInternalLine($event)">
                <label class="normalLabel" for="InternalLineDBIn">포함</label>
              </th>
              <td class="input_text width80">
                <input class="mb-0 pointer" type="radio" name="InternalLineDB" id="InternalLineDBOut" value="N" v-model="templateParameter.paramAttr.internalLine" @change="changeInternalLine($event)">
                <label class="normalLabel" for="InternalLineDBOut">Internal_line DB 제외</label>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <hr>
    <component-use-ui paramaterType="database"></component-use-ui>
  </div>
</template>

<script>
import ComponentUserDisplay from './components/ComponentUserDisplay.vue'
import ComponentUseUi from './components/ComponentUseUi.vue'

export default {
  props: {
    templateParameter: {
      type: Object
    }
  },
  watch: {
    templateParameter: function (templateParameter) {
      this.init()
    }
  },
  methods: {
    init () {
      if (!this.templateParameter.paramAttr) {
        this.templateParameter.paramAttr = {
          internalLine: 'Y',
          dbValue: 'internal_common'
        }
      }
    },
    changeInternalLine (e) {
      if (e.target.value === 'Y') {
        this.templateParameter.paramAttr = {
          internalLine: 'Y',
          dbValue: 'internal_common'
        }
      } else {
        this.templateParameter.paramAttr = {
          internalLine: 'N',
          dbValue: ''
        }
      }
    }
  },
  components: {
    ComponentUserDisplay,
    ComponentUseUi
  },
  created () {
    this.init()
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/settings.scss";
</style>
