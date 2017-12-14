<template>
  <div class="mb-5">
    <h6 class="mb-0">입력 가능한 숫자 범위 *</h6>
    <p class="px-5 mb-4 p-description-color">※ 숫자 범위를 비우고 save하면 숫자 값의 제한 없이 입력되게 됩니다.</p>
    <div class="px-5">
      <table class="normalTable">
        <tbody>
          <tr>
            <th class="title"><label class="normalLabel" for="intMin">Min</label></th>
            <td class="input_text">
              <input type="text" class="mb-0" id="intMin" placeholder="0"
                v-model="templateParameter.paramAttr.minValue_" @keydown="numberOnlyEvent($event)" @keyup="checkNumberCommas(templateParameter.paramAttr, 'minValue_')">
            </td>
            <td class="width20 text-center">~</td>
            <th class="title"><label class="normalLabel" for="intMax">Max</label></th>
            <td class="input_text">
              <input type="text" class="mb-0" id="intMax" placeholder=""
                v-model="templateParameter.paramAttr.maxValue_" @keydown="numberOnlyEvent($event)" @keyup="checkNumberCommas(templateParameter.paramAttr, 'maxValue_')">
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { util } from '@/shared/utils/util'
import { common } from '@/shared/utils/common'

export default {
  props: {
    templateParameter: {
      type: Object
    }
  },
  methods: {
    numberOnlyEvent: util.numberOnlyEvent,
    checkNumberCommas: common.checkNumberCommas
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/settings.scss";
</style>
