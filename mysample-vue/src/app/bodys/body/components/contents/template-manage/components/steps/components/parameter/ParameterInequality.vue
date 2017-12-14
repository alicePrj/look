<template>
  <div>
    <component-user-display placeholderEN="><" :templateParameter="templateParameter"></component-user-display>
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
              <th class="title"><input type="checkbox" class="mb-0 pointer" title="bigEN" v-model="templateParameter.paramAttr['>'].useYn_"></th>
              <th class="title"><label class="normalLabel" for="bigEN">></label></th>
              <td class="input_text"><input type="text" class="mb-0" id="bigEN" placeholder=">" v-model="templateParameter.paramAttr['>'].EN"></td>
              <td class="input_text"><input type="text" class="mb-0" title="bigKR" placeholder="" v-model="templateParameter.paramAttr['>'].KR"></td>
              <td class="input_text"><input type="text" class="mb-0" title="bigJP" placeholder="" v-model="templateParameter.paramAttr['>'].JP"></td>
            </tr>
            <tr>
              <th class="title"><input type="checkbox" class="mb-0 pointer" title="smallEN" v-model="templateParameter.paramAttr['<'].useYn_"></th>
              <th class="title"><label class="normalLabel" for="smallEN"><</label></th>
              <td class="input_text"><input type="text" class="mb-0" id="smallEN" placeholder="<" v-model="templateParameter.paramAttr['<'].EN"></td>
              <td class="input_text"><input type="text" class="mb-0" title="smallKR" placeholder="" v-model="templateParameter.paramAttr['<'].KR"></td>
              <td class="input_text"><input type="text" class="mb-0" title="smallJP" placeholder="" v-model="templateParameter.paramAttr['<'].JP"></td>
            </tr>
            <tr>
              <th class="title"><input type="checkbox" class="mb-0 pointer" title="equalEN" v-model="templateParameter.paramAttr['='].useYn_"></th>
              <th class="title"><label class="normalLabel" for="equalEN">=</label></th>
              <td class="input_text"><input type="text" class="mb-0" id="equalEN" placeholder="=" v-model="templateParameter.paramAttr['='].EN"></td>
              <td class="input_text"><input type="text" class="mb-0" title="equalKR" placeholder="" v-model="templateParameter.paramAttr['='].KR"></td>
              <td class="input_text"><input type="text" class="mb-0" title="equalJP" placeholder="" v-model="templateParameter.paramAttr['='].JP"></td>
            </tr>
            <tr>
              <th class="title"><input type="checkbox" class="mb-0 pointer" title="bigEqualEN" v-model="templateParameter.paramAttr['>='].useYn_"></th>
              <th class="title"><label class="normalLabel" for="bigEqualEN">>=</label></th>
              <td class="input_text"><input type="text" class="mb-0" id="bigEqualEN" placeholder=">=" v-model="templateParameter.paramAttr['>='].EN"></td>
              <td class="input_text"><input type="text" class="mb-0" title="bigEqualKR" placeholder="" v-model="templateParameter.paramAttr['>='].KR"></td>
              <td class="input_text"><input type="text" class="mb-0" title="bigEqualJP" placeholder="" v-model="templateParameter.paramAttr['>='].JP"></td>
            </tr>
            <tr>
              <th class="title"><input type="checkbox" class="mb-0 pointer" title="smallEqualEN" v-model="templateParameter.paramAttr['<='].useYn_"></th>
              <th class="title"><label class="normalLabel" for="smallEqualEN"><=</label></th>
              <td class="input_text"><input type="text" class="mb-0" id="smallEqualEN" placeholder="<=" v-model="templateParameter.paramAttr['<='].EN"></td>
              <td class="input_text"><input type="text" class="mb-0" title="smallEqualKR" placeholder="" v-model="templateParameter.paramAttr['<='].KR"></td>
              <td class="input_text"><input type="text" class="mb-0" title="smallEqualJP" placeholder="" v-model="templateParameter.paramAttr['<='].JP"></td>
            </tr>
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
          '>': { useYn_: false, EN: '>', KR: '', JP: '' },
          '<': { useYn_: false, EN: '<', KR: '', JP: '' },
          '=': { useYn_: false, EN: '=', KR: '', JP: '' },
          '>=': { useYn_: false, EN: '>=', KR: '', JP: '' },
          '<=': { useYn_: false, EN: '<=', KR: '', JP: '' }
        }
      }
    }
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
