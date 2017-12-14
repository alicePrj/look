<template>
  <div>
    <component-user-display placeholderEN="User Type" :templateParameter="templateParameter"></component-user-display>
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
            <tr v-for="(_alias, key) in templateParameter.paramAttr.alias" :key="key">
              <th class="title">
                <input type="text" class="mb-0" :title="'Alias' + (key + 1)" :placeholder="'Alias' + (key + 1)"
                   v-model="templateParameter.paramAttr.alias[key].aliasNm">
              </th>
              <td class="input_text">
                <input type="text" class="mb-0" :title="'Alias' + (key + 1) + 'EN'" :placeholder="'Alias' + (key + 1)"
                   v-model="templateParameter.paramAttr.alias[key].EN">
              </td>
              <td class="input_text"><input type="text" class="mb-0" :title="'Alias' + (key + 1) + 'KR'" placeholder=""
                 v-model="templateParameter.paramAttr.alias[key].KR">
              </td>
              <td class="input_text"><input type="text" class="mb-0" :title="'Alias' + (key + 1) + 'JP'" placeholder=""
                 v-model="templateParameter.paramAttr.alias[key].JP">
              </td>
              <td class="input_text"><input type="checkbox" class="mb-0 pointer" title="Alias1Use" v-model="alias[key]"></td>
            </tr>
          </tbody>
        </table>
        <div class="flex px-3">
          <div class="empty"></div>
          <div class="mr-5 flex pointer" @click="add()">
            <div class="pt-2"><icon class="circle-icon" name="pencil" scale="1"></icon></div>
            <div class="ml-2">ADD</div>
          </div>
          <div class="flex pointer" @click="del()">
            <div class="pt-2"><icon class="circle-icon" name="trash" scale="1"></icon></div>
            <div class="ml-2">DELETE</div>
          </div>
        </div>
      </div>
    </div>
    <hr>
    <component-select-type paramaterType="custom" :templateParameter="templateParameter"></component-select-type>
  </div>
</template>

<script>
import ComponentUserDisplay from './components/ComponentUserDisplay.vue'
import ComponentSelectType from './components/ComponentSelectType.vue'
import Icon from 'vue-awesome/components/Icon.vue'
import 'vue-awesome/icons/pencil'
import 'vue-awesome/icons/trash'

export default {
  props: {
    templateParameter: {
      type: Object
    }
  },
  data () {
    return {
      alias: []
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
          selectType: 0,
          alias: [{
            aliasNm: '',
            EN: '',
            KR: '',
            JP: ''
          }, {
            aliasNm: '',
            EN: '',
            KR: '',
            JP: ''
          }]
        }
      }
    },
    add () {
      this.templateParameter.paramAttr.alias.push({
        aliasNm: '',
        EN: '',
        KR: '',
        JP: ''
      })
    },
    del () {
      let i = 0
      const alias = []
      for (; i < this.templateParameter.paramAttr.alias.length; i += 1) {
        if (!this.alias[i]) {
          alias.push(this.templateParameter.paramAttr.alias[i])
        }
        this.alias[i] = false
      }
      this.templateParameter.paramAttr.alias = alias
    }
  },
  components: {
    ComponentUserDisplay,
    ComponentSelectType,
    Icon
  },
  created () {
    this.init()
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
