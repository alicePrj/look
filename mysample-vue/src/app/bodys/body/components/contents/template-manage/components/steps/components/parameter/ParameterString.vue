<template>
  <div>
    <component-user-display placeholderEN="Value" :templateParameter="templateParameter"></component-user-display>
    <hr>
    <div class="mb-5">
      <h6 class="mb-0">입력 가능한 string 길이 *</h6>
      <p class="px-5 mb-4 p-description-color">※ string 길이를 공백으로 두고 save하면 1,000 byte로 제한됩니다.</p>
      <div class="px-5">
        <table class="normalTable">
          <tbody>
            <tr>
              <td class="input_text">
                <input type="text" class="mb-0 width20" id="intMin" placeholder="0"
                  v-model="templateParameter.paramAttr.maxLength_" @keydown="numberOnlyEvent($event)" @keyup="checkNumberCommas(templateParameter.paramAttr, 'maxLength_')">
                <label class="normalLabel ml-5" for="intMin">byte</label>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <hr>
    <div>
      <h6 class="mb-0">주의사항 문구 설정 *</h6>
      <p class="px-5 mb-4 p-description-color">※ EN은 필수이며, KR /JP를 입력하지 않을 경우에는, EN에 입력된 이름으로 노출됩니다.</p>
      <div class="px-5">
        <table class="normalTable">
          <tbody>
            <tr>
              <th class="title">EN *</th>
              <td class="input_text width80">
                <input type="text" class="mb-0" title="EN title" placeholder="You can insert more objects than 2 using ,(comma)."
                  v-model="templateParameter.paramAttr.noticeEn">
              </td>
              <td>({{ templateParameter.paramAttr.noticeEn | stringLengthComma }}/100 byte)</td>
            </tr>
            <tr>
              <th class="title">KR</th>
              <td class="input_text width80">
                <input type="text" class="mb-0" title="KR title" placeholder=""
                  v-model="templateParameter.paramAttr.noticeKr">
              </td>
              <td>({{ templateParameter.paramAttr.noticeKr | stringLengthComma }}/100 byte)</td>
            </tr>
            <tr>
              <th class="title">JP</th>
              <td class="input_text width80">
                <input type="text" class="mb-0" title="JP title" placeholder=""
                  v-model="templateParameter.paramAttr.noticeJp">
              </td>
              <td>({{ templateParameter.paramAttr.noticeJp | stringLengthComma }}/100 byte)</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <hr>
    <component-use-ui paramaterType="string"></component-use-ui>
  </div>
</template>

<script>
import { util } from '@/shared/utils/util'
import { common } from '@/shared/utils/common'
import ComponentUserDisplay from './components/ComponentUserDisplay.vue'
import ComponentUseUi from './components/ComponentUseUi.vue'

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
          maxLength: '',
          maxLength_: '',
          noticeEn: '',
          noticeKr: '',
          noticeJp: ''
        }
      }
    },
    numberOnlyEvent: util.numberOnlyEvent,
    checkNumberCommas: common.checkNumberCommas
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
