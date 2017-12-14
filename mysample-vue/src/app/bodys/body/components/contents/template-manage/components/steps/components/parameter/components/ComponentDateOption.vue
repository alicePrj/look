<template>
  <div class="mb-5">
    <h6 class="mb-0">선택 가능한 날짜 Option *</h6>
    <p class="px-5 mb-4 p-description-color">※ 데이터가 있어서, 유저가 선택해도 되는 날짜를 입력해 주세요.</p>
    <div class="px-5">
      <table class="normalTable">
        <tbody>
          <tr>
            <th class="title"><label class="normalLabel" for="dateFrom">From</label></th>
            <td class="input_text"><input type="text" class="mb-0" id="dateFrom" placeholder="yyyyMMdd"
              v-model="templateParameter.paramAttr.from" @keydown="numberOnlyEvent($event)"></td>
          </tr>
          <tr>
            <th class="title"><label class="normalLabel" for="selectDateToYesterday">To</label></th>
            <td class="input_text">
              <div class="flex py-3">
                <div>
                  <input class="mb-0 pointer" type="radio" name="selectDateTo" id="selectDateToYesterday" v-model="templateParameter.paramAttr.to" :value="0">
                  <label class="normalLabel" for="selectDateToYesterday">어제</label>
                </div>
                <div style="margin-left: 10rem;">
                  <input class="mb-0 pointer" type="radio" name="selectDateTo" id="selectDateToToday" v-model="templateParameter.paramAttr.to" :value="1">
                  <label class="normalLabel" for="selectDateToToday">오늘</label>
                </div>
              </div>
            </td>
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
