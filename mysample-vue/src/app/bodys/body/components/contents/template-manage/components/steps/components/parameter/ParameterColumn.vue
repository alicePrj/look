<template>
  <div>
    <component-user-display placeholderEN="Column" :templateParameter="templateParameter"></component-user-display>
    <hr>
    <component-select-type paramaterType="column" :templateParameter="templateParameter"></component-select-type>
    <hr>
    <div class="mb-5">
      <h6 class="mb-0">Dependency(선행 조건) 여부 *</h6>
      <p class="px-5 mb-4 p-description-color">※ Dependency가 걸려 있으면, 사용자가 선행 조건을 선택하기 전까지 해당 조건을 선택할 수 없습니다.</p>
      <div class="px-5">
        <div>
          <input class="mb-0" type="radio" name="dependencyDatabaseTable" id="dependencyDatabaseOnlyTable"
            v-model="templateParameter.paramAttr.dependencyType" :value="0">
          <label class="normalLabel" for="dependencyDatabaseOnlyTable">Database만 선행 조건(Table은 고정)</label>
        </div>
        <table class="px-5 normalTable">
          <tbody>
            <tr>
              <th class="title"><label class="normalLabel" for="dependencyDatabaseOnlyTable-Datable">Database Parameter</label></th>
              <td class="input_text width60">
                <input type="text" class="mb-0" id="dependencyDatabaseOnlyTable-Datable" placeholder="@database"
                  v-model="templateParameter.paramAttr.databaseValue0">
              </td>
            </tr>
            <tr>
              <th class="title"><label class="normalLabel" for="dependencyDatabaseOnlyTable-Table">Specific Table</label></th>
              <td class="input_text width60">
                <input type="text" class="mb-0" id="dependencyDatabaseOnlyTable-Table" placeholder="Table명을 입력해 주세요."
                  v-model="templateParameter.paramAttr.tableValue0">
              </td>
            </tr>
          </tbody>
        </table>
        <div>
          <input class="mb-0" type="radio" name="dependencyDatabaseTable" id="dependencyDatabaseTableBoth"
            v-model="templateParameter.paramAttr.dependencyType" :value="1">
          <label class="normalLabel" for="dependencyDatabaseTableBoth">Database와 Table 모두 선행 조건</label>
        </div>
        <table class="px-5 normalTable">
          <tbody>
            <tr>
              <th class="title"><label class="normalLabel" for="dependencyDatabaseTableBoth-Datable">Database Parameter</label></th>
              <td class="input_text width60">
                <input type="text" class="mb-0" id="dependencyDatabaseTableBoth-Datable" placeholder="@database"
                  v-model="templateParameter.paramAttr.databaseValue1">
              </td>
            </tr>
            <tr>
              <th class="title"><label class="normalLabel" for="dependencyDatabaseTableBoth-Table">Table Parameter</label></th>
              <td class="input_text width60">
                <input type="text" class="mb-0" id="dependencyDatabaseTableBoth-Table" placeholder="@table"
                  v-model="templateParameter.paramAttr.tableValue1">
              </td>
            </tr>
          </tbody>
        </table>
        <div>
          <input class="mb-0" type="radio" name="dependencyDatabaseTable" id="dependencyDatabaseTableNeither"
            v-model="templateParameter.paramAttr.dependencyType" :value="2">
          <label class="normalLabel" for="dependencyDatabaseTableNeither">특정 Database와 Table를 고정 사용</label>
        </div>
        <table class="px-5 normalTable">
          <tbody>
            <tr>
              <th class="title"><label class="normalLabel" for="dependencyDatabaseTableNeither-Datable">Specific Database</label></th>
              <td class="input_text width60">
                <input type="text" class="mb-0" id="dependencyDatabaseTableNeither-Datable" placeholder="Database명을 입력해 주세요."
                  v-model="templateParameter.paramAttr.databaseValue2">
              </td>
            </tr>
            <tr>
              <th class="title"><label class="normalLabel" for="dependencyDatabaseTableNeither-Table">Specific Table</label></th>
              <td class="input_text width60">
                <input type="text" class="mb-0" id="dependencyDatabaseTableNeither-Table" placeholder="Table명을 입력해 주세요."
                  v-model="templateParameter.paramAttr.tableValue2">
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <hr>
    <div class="mb-5">
      <h6 class="mb-0">Table Alias 지정</h6>
      <p class="px-5 mb-4 p-description-color">※ Query 상에서 해당 @Column이 속한 Table을 alias 처리했다면. Alias를 지정해 주셔야 합니다.</p>
      <div class="px-5">
        <table class="px-5 normalTable">
          <tbody>
            <tr>
              <th class="title"><label class="normalLabel" for="tableAlias">Table Alias</label></th>
              <td class="input_text width60">
                <input type="text" class="mb-0" id="tableAlias" placeholder="Alias명을 입력해 주세요."
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

export default {
  props: {
    templateParameter: {
      type: Object
    }
  },
  watch: {
    templateParameter: function (templateParameter) {
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
        this.templateParameter.paramAttr.tableValue0 = this.templateParameter.paramAttr.tableValue
      } else if (this.templateParameter.paramAttr.dependencyType === 1) {
        this.templateParameter.paramAttr.databaseValue1 = this.templateParameter.paramAttr.databaseValue
        this.templateParameter.paramAttr.tableValue1 = this.templateParameter.paramAttr.tableValue
      } else if (this.templateParameter.paramAttr.dependencyType === 2) {
        this.templateParameter.paramAttr.databaseValue2 = this.templateParameter.paramAttr.databaseValue
        this.templateParameter.paramAttr.tableValue2 = this.templateParameter.paramAttr.tableValue
      }
    }
  },
  components: {
    ComponentUserDisplay,
    ComponentSelectType
  },
  created () {
    this.init()
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/settings.scss";
</style>
