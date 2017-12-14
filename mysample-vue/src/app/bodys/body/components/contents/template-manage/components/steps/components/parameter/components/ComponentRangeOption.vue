<template>
  <div class="mb-5">
    <h6 class="mb-0">선택 가능한 날짜 Range*</h6>
    <p class="px-5 mb-4 p-description-color">※ 유저가 선택 가능한 날짜의 기간 범위를 입력해 주세요 공백으로 두고 save할 경우 7로 설정됩니다.</p>
    <div class="px-5">
      <table class="normalTable">
        <tbody>
          <tr>
            <td class="input_text width80"><input type="text" class="mb-0" title="dateRange" placeholder="7"
              v-model="templateParameter.paramAttr.range" @keydown="numberOnlyEvent($event)"></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { util } from '@/shared/utils/util'

export default {
  props: {
    templateParameter: {
      type: Object
    }
  },
  methods: {
    numberOnlyEvent: util.numberOnlyEvent
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/settings.scss";
</style>
