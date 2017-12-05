<template>
  <div>
    <component-user-display placeholderEN="Value"></component-user-display>
    <hr>
    <div class="mb-5">
      <h6 class="mb-0">입력 가능한 string 길이 *</h6>
      <p class="px-5 mb-4 p-description-color">※ string 길이를 공백으로 두고 save하면 1,000 byte로 제한됩니다.</p>
      <div class="px-5">
        <table class="normalTable">
          <tbody>
            <tr>
              <td class="input_text">
                <input type="text" class="mb-0 width20" id="intMin" placeholder="0">
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
              <td class="input_text width80"><input type="text" class="mb-0" title="EN title" placeholder="You can insert more objects than 2 using ,(comma)."></td>
              <td>(0/100 byte)</td>
            </tr>
            <tr>
              <th class="title">KR</th>
              <td class="input_text width80"><input type="text" class="mb-0" title="KR title" placeholder=""></td>
              <td>(0/100 byte)</td>
            </tr>
            <tr>
              <th class="title">JP</th>
              <td class="input_text width80"><input type="text" class="mb-0" title="JP title" placeholder=""></td>
              <td>(0/100 byte)</td>
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
import ComponentUserDisplay from './components/ComponentUserDisplay.vue'
import ComponentUseUi from './components/ComponentUseUi.vue'

export default {
  components: {
    ComponentUserDisplay,
    ComponentUseUi
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/settings.scss";
</style>
