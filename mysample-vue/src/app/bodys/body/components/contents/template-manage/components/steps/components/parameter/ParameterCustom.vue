<template>
  <div>
    <component-user-display placeholderEN="User Type"></component-user-display>
    <hr>
    <div class="mb-5">
      <h6 class="mb-0">선택 옵션 Alias & 표시 이름*</h6>
      <p class="px-5 mb-4 p-description-color">※ Query에서 정의된 Alias와 Select Box에 실제로 표시될 이름을 결정합니다.</p>
      <div class="px-5">
        <table class="mb-3 current">
          <tbody>
            <tr>
              <th>Option 항목*</th>
              <th>User Display EN* (50byte)</th>
              <th>User Display KR (50byte)</th>
              <th>User Display JP (50byte)</th>
              <th>Del</th>
            </tr>
            <tr>
              <th class="title"><input type="text" class="mb-0" id="Alias1" placeholder="Alias1"></th>
              <td class="input_text"><input type="text" class="mb-0" id="Alias1EN" placeholder="Alias1"></td>
              <td class="input_text"><input type="text" class="mb-0" title="Alias1KR" placeholder=""></td>
              <td class="input_text"><input type="text" class="mb-0" title="Alias1JP" placeholder=""></td>
              <td class="input_text"><input type="checkbox" class="mb-0 pointer" name="Alias1Use" title="Alias1Use"></td>
            </tr>
            <tr>
              <th class="title"><input type="text" class="mb-0" id="Alias2" placeholder="Alias2"></th>
              <td class="input_text"><input type="text" class="mb-0" id="Alias2EN" placeholder="Alias2"></td>
              <td class="input_text"><input type="text" class="mb-0" title="Alias2KR" placeholder=""></td>
              <td class="input_text"><input type="text" class="mb-0" title="Alias2JP" placeholder=""></td>
              <td class="input_text"><input type="checkbox" class="mb-0 pointer" name="Alias2Use" title="Alias2Use"></td>
            </tr>
          </tbody>
        </table>
        <div class="flex px-3">
          <div class="empty"></div>
          <div class="mr-5 flex pointer">
            <div class="pt-2"><icon class="circle-icon" name="pencil" scale="1"></icon></div>
            <div class="ml-2">ADD</div>
          </div>
          <div class="flex pointer">
            <div class="pt-2"><icon class="circle-icon" name="trash" scale="1"></icon></div>
            <div class="ml-2">DELETE</div>
          </div>
        </div>
      </div>
    </div>
    <hr>
    <component-select-type paramaterType="custom"></component-select-type>
  </div>
</template>

<script>
import ComponentUserDisplay from './components/ComponentUserDisplay.vue'
import ComponentSelectType from './components/ComponentSelectType.vue'
import Icon from 'vue-awesome/components/Icon.vue'
import 'vue-awesome/icons/pencil'
import 'vue-awesome/icons/trash'

export default {
  components: {
    ComponentUserDisplay,
    ComponentSelectType,
    Icon
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/settings.scss";

table.current {
  width: 100%;
  font-size: 1.4rem;
  border-collapse: collapse;
  tr {
    width: 1%;
    white-space: nowrap;
    &:first-child th {
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
