<template>
  <div>
    <h6 class="mb-0">Select Type *</h6>
    <p class="px-5 mb-4 p-description-color">
      <span v-if="paramaterType === 'column' || paramaterType === 'code'">※ 유저가 선택할 수 있는 Column의 개수를 1개만으로 할 지, 2개 이상도 가능하게 할지 결정합니다.</span>
      <span v-if="paramaterType === 'gamecode'">※ 유저가 선택할 수 있는 게임의 개수를 1개만으로 할 지, 2개 이상도 가능하게 할지 결정합니다.</span>
      <span v-if="paramaterType === 'usertype' || paramaterType === 'custom'">※ 유저가 해당 항목에서 정의된 Query를 사용하게 됩니다. 항상 Query에 해당 내용이 정의되어 있어야 합니다.</span>
      <span v-if="paramaterType === 'date' || paramaterType === 'start_date~end_date' || paramaterType === 'start_time~end_time'">※ 유저가 날짜를 입력하게 할 UI를 결정합니다.</span>
    </p>
    <div class="px-5">
      <table class="normalTable">
        <tbody>
          <tr v-if="paramaterType === 'column' || paramaterType === 'code'">
            <td class="input_text">
              <input class="mb-0 pointer" type="radio" name="selectType" id="SelectTypeOne" v-model="templateParameter.paramAttr.selectType" :value="0">
              <label class="normalLabel" for="SelectTypeOne">Column 1개만 선택</label>
            </td>
            <td class="input_text">
              <input class="mb-0 pointer" type="radio" name="selectType" id="SelectTypeMulti" v-model="templateParameter.paramAttr.selectType" :value="1">
              <label class="normalLabel" for="SelectTypeMulti">여러 개 Column 선택 가능</label>
            </td>
          </tr>
          <tr v-if="paramaterType === 'gamecode'">
            <td class="input_text">
              <input class="mb-0 pointer" type="radio" name="selectType" id="SelectTypeOne">
              <label class="normalLabel" for="SelectTypeOne">게임 1개만 선택</label>
            </td>
            <td class="input_text">
              <input class="mb-0 pointer" type="radio" name="selectType" id="SelectTypeMulti">
              <label class="normalLabel" for="SelectTypeMulti">여러 개 게임 선택 가능</label>
            </td>
          </tr>
          <tr v-if="paramaterType === 'usertype' || paramaterType === 'custom'">
            <td class="input_text">
              <input class="mb-0 pointer" type="radio" name="selectType" id="SelectTypeOne">
              <label class="normalLabel" for="SelectTypeOne">옵션 1개만 선택</label>
            </td>
            <td class="input_text">
              <input class="mb-0 pointer" type="radio" name="selectType" id="SelectTypeMulti">
              <label class="normalLabel" for="SelectTypeMulti">여러 개 옵션 선택 가능</label>
            </td>
          </tr>
          <tr v-if="paramaterType === 'date' || paramaterType === 'start_date~end_date' || paramaterType === 'start_time~end_time'">
            <td class="input_text">
              <input class="mb-0 pointer" type="radio" name="selectType" id="SelectTypeOne">
              <label class="normalLabel" for="SelectTypeOne">달력 UI 사용</label>
            </td>
            <td class="input_text">
              <input class="mb-0 pointer" type="radio" name="selectType" id="SelectTypeMulti">
              <label class="normalLabel" for="SelectTypeMulti">입력Box 사용</label>
            </td>
          </tr>
          <tr v-if="paramaterType === 'column'">
            <td class="input_text align-top">
              <img src="~@/assets/images/sample-image/column-one.png">
            </td>
            <td class="input_text align-top">
              <img src="~@/assets/images/sample-image/column-multi.png">
            </td>
          </tr>
          <tr v-if="paramaterType === 'code'">
            <td class="input_text align-top">
              <img src="~@/assets/images/sample-image/code-one.png">
            </td>
            <td class="input_text align-top">
              <img src="~@/assets/images/sample-image/code-multi.png">
            </td>
          </tr>
          <tr v-if="paramaterType === 'gamecode'">
            <td class="input_text align-top">
              <img src="~@/assets/images/sample-image/gamecode-one.png">
            </td>
            <td class="input_text align-top">
              <img src="~@/assets/images/sample-image/gamecode-multi.png">
            </td>
          </tr>
          <tr v-if="paramaterType === 'usertype'">
            <td class="input_text align-top">
              <img src="~@/assets/images/sample-image/usertype-one.png">
            </td>
            <td class="input_text align-top">
              <img src="~@/assets/images/sample-image/usertype-multi.png">
            </td>
          </tr>
          <tr v-if="paramaterType === 'custom'">
            <td class="input_text align-top">
              <img src="~@/assets/images/sample-image/custom-one.png">
            </td>
            <td class="input_text align-top">
              <img src="~@/assets/images/sample-image/custom-multi.png">
            </td>
          </tr>
          <tr v-if="paramaterType === 'date'">
            <td class="input_text align-top">
              <img src="~@/assets/images/sample-image/date-ui.png">
            </td>
            <td class="input_text align-top">
              <img src="~@/assets/images/sample-image/date-input.png">
            </td>
          </tr>
          <tr v-if="paramaterType === 'start_date~end_date'">
            <td class="input_text align-top">
              <img src="~@/assets/images/sample-image/start_date~end_date-ui.png">
            </td>
            <td class="input_text align-top">
              <img src="~@/assets/images/sample-image/start_date~end_date-input.png">
            </td>
          </tr>
          <tr v-if="paramaterType === 'start_time~end_time'">
            <td class="input_text align-top">
              <img src="~@/assets/images/sample-image/start_time~end_time-ui.png">
            </td>
            <td class="input_text align-top">
              <img src="~@/assets/images/sample-image/start_time~end_time-input.png">
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    paramaterType: {
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
