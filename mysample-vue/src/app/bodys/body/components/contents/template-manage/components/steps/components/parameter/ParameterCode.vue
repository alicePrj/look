<template>
  <div>
    <component-user-display placeholderEN="Code" :templateParameter="templateParameter"></component-user-display>
    <hr>
    <component-select-type paramaterType="code" :templateParameter="templateParameter"></component-select-type>
    <hr>
    <component-dependency-database :templateParameter="templateParameter"></component-dependency-database>
    <hr>
    <div class="mb-5">
      <h6 class="mb-0">Code 정보 *</h6>
      <p class="px-5 mb-4 p-description-color">※ 어느 table 및 Column에 있는 Code를 불러와 사용할 지 지정합니다.</p>
      <div class="px-5">
        <table class="px-5 normalTable">
          <tbody>
            <tr>
              <th class="title"><label class="normalLabel" for="codeTable">Table</label></th>
              <td class="input_text width80">
                <input type="text" class="mb-0" id="codeTable" placeholder="Table명을 입력해 주세요."
                  v-model="templateParameter.paramAttr.tableValue">
              </td>
            </tr>
            <tr>
              <th class="title"><label class="normalLabel" for="codeColumn">Column</label></th>
              <td class="input_text width80">
                <input type="text" class="mb-0" id="codeColumn" placeholder="Column명을 입력해 주세요."
                  v-model="templateParameter.paramAttr.columnValue">
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import ComponentUserDisplay from './components/ComponentUserDisplay.vue'
import ComponentSelectType from './components/ComponentSelectType.vue'
import ComponentDependencyDatabase from './components/ComponentDependencyDatabase.vue'

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
          selectType: 0,
          dependencyType: 0,
          databaseValue: '',
          tableValue: '',
          columnValue: ''
        }
      } else if (this.templateParameter.paramAttr.dependencyType === 0) {
        this.templateParameter.paramAttr.databaseValue0 = this.templateParameter.paramAttr.databaseValue
      } else if (this.templateParameter.paramAttr.dependencyType === 1) {
        this.templateParameter.paramAttr.databaseValue1 = this.templateParameter.paramAttr.databaseValue
      }
    }
  },
  components: {
    ComponentUserDisplay,
    ComponentSelectType,
    ComponentDependencyDatabase
  },
  created () {
    this.init()
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/settings.scss";
</style>
