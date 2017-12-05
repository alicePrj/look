<template>
  <div>
    <component-user-display placeholderEN="><"></component-user-display>
    <hr>
    <div class="mb-5">
      <h6 class="mb-0">사용할 부등호 기호*</h6>
      <p class="px-5 mb-4 p-description-color">
        ※ 부등호 기호들 중 사용자가 실제로 선택할 수 있는 항목과, 해당 항목들이 노출될 텍스트를 선택합니다.<br>
        &nbsp;&nbsp;&nbsp;&nbsp;노출되는 텍스트는 EN이 필수이며, KR/JP를 입력하지 않을 경우에는 EN에 입력된 텍스트로 표시됩니다.
      </p>
      <div class="px-5">
        <table>
          <tbody>
            <tr>
              <th>사용여부</th>
              <th>Option 항목</th>
              <th>User Display EN* (50byte)</th>
              <th>User Display KR (50byte)</th>
              <th>User Display JP (50byte)</th>
            </tr>
            <tr>
              <th class="title"><input type="checkbox" class="mb-0" title="bigEN"></th>
              <th class="title"><label class="normalLabel" for="bigEN">></label></th>
              <td class="input_text"><input type="text" class="mb-0" id="bigEN" placeholder=">"></td>
              <td class="input_text"><input type="text" class="mb-0" title="bigKR" placeholder=""></td>
              <td class="input_text"><input type="text" class="mb-0" title="bigJP" placeholder=""></td>
            </tr>
            <tr>
              <th class="title"><input type="checkbox" class="mb-0" title="smallEN" checked="checked"></th>
              <th class="title"><label class="normalLabel" for="smallEN"><</label></th>
              <td class="input_text"><input type="text" class="mb-0" id="smallEN" placeholder="<"></td>
              <td class="input_text"><input type="text" class="mb-0" title="smallKR" placeholder=""></td>
              <td class="input_text"><input type="text" class="mb-0" title="smallJP" placeholder=""></td>
            </tr>
            <tr>
              <th class="title"><input type="checkbox" class="mb-0" title="equalEN" checked="checked"></th>
              <th class="title"><label class="normalLabel" for="equalEN">=</label></th>
              <td class="input_text"><input type="text" class="mb-0" id="equalEN" placeholder="="></td>
              <td class="input_text"><input type="text" class="mb-0" title="equalKR" placeholder=""></td>
              <td class="input_text"><input type="text" class="mb-0" title="equalJP" placeholder=""></td>
            </tr>
            <tr>
              <th class="title"><input type="checkbox" class="mb-0" title="bigEqualEN"></th>
              <th class="title"><label class="normalLabel" for="bigEqualEN">>=</label></th>
              <td class="input_text"><input type="text" class="mb-0" id="bigEqualEN" placeholder=">="></td>
              <td class="input_text"><input type="text" class="mb-0" title="bigEqualKR" placeholder=""></td>
              <td class="input_text"><input type="text" class="mb-0" title="bigEqualJP" placeholder=""></td>
            </tr>
            <tr>
              <th class="title"><input type="checkbox" class="mb-0" title="smallEqualEN"></th>
              <th class="title"><label class="normalLabel" for="smallEqualEN"><=</label></th>
              <td class="input_text"><input type="text" class="mb-0" id="smallEqualEN" placeholder="<="></td>
              <td class="input_text"><input type="text" class="mb-0" title="smallEqualKR" placeholder=""></td>
              <td class="input_text"><input type="text" class="mb-0" title="smallEqualJP" placeholder=""></td>
            </tr>
            <!-- <tr>
              <th class="title"><input type="checkbox" class="mb-0" title="notEqualEN"></th>
              <th class="title"><label class="normalLabel" for="notEqualEN"><></label></th>
              <td class="input_text"><input type="text" class="mb-0" id="notEqualEN" placeholder="No"></td>
              <td class="input_text"><input type="text" class="mb-0" title="notEqualKR" placeholder=""></td>
              <td class="input_text"><input type="text" class="mb-0" title="notEqualJP" placeholder=""></td>
            </tr> -->
          </tbody>
        </table>
      </div>
    </div>
    <hr>
    <component-use-ui paramaterType="inequality"></component-use-ui>
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

table {
  width: 100%;
  font-size: 1.4rem;
  border-collapse: collapse;
  tr {
    width: 1%;
    white-space: nowrap;
    &:first-child  th {
      background-color: #c3d69b;
    }
  }

  th, td {
    font-weight: normal;
    border: 2px solid $color-secondary;
    @extend .p-2;
    @extend .text-center;
  }

  th {
    @extend .background;
  }
}
</style>
