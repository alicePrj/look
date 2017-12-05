<template>
  <div class="mb-5">
    <h6 class="mb-0">선택 옵션 표시 이름*</h6>
    <p class="px-5 mb-4 p-description-color">※ Select Box에 실제로 표시될 이름을 결정합니다.</p>
    <div class="px-5">
      <table>
        <tbody>
          <tr>
            <th>Option 항목</th>
            <th>User Display EN* (50byte)</th>
            <th>User Display KR (50byte)</th>
            <th>User Display JP (50byte)</th>
          </tr>
          <tr v-if="paramaterType === 'yn'">
            <th class="title"><label class="normalLabel" for="equalEN">=</label></th>
            <td class="input_text"><input type="text" class="mb-0" id="equalEN" placeholder="Yes"></td>
            <td class="input_text"><input type="text" class="mb-0" title="equalKR" placeholder=""></td>
            <td class="input_text"><input type="text" class="mb-0" title="equalJP" placeholder=""></td>
          </tr>
          <tr v-if="paramaterType === 'yn'">
            <th class="title"><label class="normalLabel" for="notEqualEN"><></label></th>
            <td class="input_text"><input type="text" class="mb-0" id="notEqualEN" placeholder="No"></td>
            <td class="input_text"><input type="text" class="mb-0" title="notEqualKR" placeholder=""></td>
            <td class="input_text"><input type="text" class="mb-0" title="notEqualJP" placeholder=""></td>
          </tr>
          <tr v-if="paramaterType === 'order'">
            <th class="title"><label class="normalLabel" for="ascEN">Asc</label></th>
            <td class="input_text"><input type="text" class="mb-0" id="ascEN" placeholder="Asc"></td>
            <td class="input_text"><input type="text" class="mb-0" title="ascKR" placeholder=""></td>
            <td class="input_text"><input type="text" class="mb-0" title="ascJP" placeholder=""></td>
          </tr>
          <tr v-if="paramaterType === 'order'">
            <th class="title"><label class="normalLabel" for="descEN"><></label></th>
            <td class="input_text"><input type="text" class="mb-0" id="descEN" placeholder="Desc"></td>
            <td class="input_text"><input type="text" class="mb-0" title="descKR" placeholder=""></td>
            <td class="input_text"><input type="text" class="mb-0" title="descJP" placeholder=""></td>
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
    }
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
