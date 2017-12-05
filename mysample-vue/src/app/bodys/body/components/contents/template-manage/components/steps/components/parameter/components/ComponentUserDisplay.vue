<template>
  <div>
    <h6 class="mb-0">User Display 조건명 *</h6>
    <p class="px-5 mb-4 p-description-color">※ EN은 필수이며, KR /JP를 입력하지 않을 경우에는, EN에 입력된 이름으로 노출됩니다.</p>
    <div class="px-5">
      <table class="normalTable">
        <tbody>
          <tr>
            <th class="title">EN *</th>
            <td class="input_text width80"><input type="text" class="mb-0" title="EN title" :placeholder="placeholderEN" v-model="templateParameter.paramNmEn" maxlength="50"></td>
            <td>({{ templateParameter.paramNmEn | stringLengthComma }}/50 byte)</td>
          </tr>
          <tr>
            <th class="title">KR</th>
            <td class="input_text width80"><input type="text" class="mb-0" title="KR title" placeholder="" v-model="templateParameter.paramNmKr" maxlength="50"></td>
            <td>({{ templateParameter.paramNmKr | stringLengthComma }}/50 byte)</td>
          </tr>
          <tr>
            <th class="title">JP</th>
            <td class="input_text width80"><input type="text" class="mb-0" title="JP title" placeholder="" v-model="templateParameter.paramNmJp" maxlength="50"></td>
            <td>({{ templateParameter.paramNmJp | stringLengthComma }}/50 byte)</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    placeholderEN: {
      type: String
    },
    templateParameter: {
      type: Object
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/settings.scss";
</style>
