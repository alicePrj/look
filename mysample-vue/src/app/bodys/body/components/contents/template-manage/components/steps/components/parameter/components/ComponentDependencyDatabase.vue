<template>
  <div>
    <h6 class="mb-0">Dependency(선행 조건) 여부 *</h6>
    <p class="px-5 mb-4 p-description-color">※ Dependency가 걸려 있으면, 사용자가 선행 조건을 선택하기 전까지 해당 조건을 선택할 수 없습니다.</p>
    <div class="px-5">
      <div>
        <input class="mb-0 pointer" type="radio" name="dependencyDatabase" id="dependencyDatabaseParameter"
          v-model="templateParameter.paramAttr.dependencyType" :value="0">
        <label class="normalLabel" for="dependencyDatabaseParameter">Database 선행 조건</label>
      </div>
      <div class="px-5">
        <table class="normalTable">
          <tbody>
            <tr>
              <th class="title"><label class="normalLabel" for="dependencyDatabaseParameterInput">Parameter</label></th>
              <td class="input_text width80">
                <input type="text" class="mb-0" id="dependencyDatabaseParameterInput" placeholder="@database"
                  v-model="templateParameter.paramAttr.databaseValue0">
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        <input class="mb-0 pointer" type="radio" name="dependencyDatabase" id="dependencyDatabaseSpecific"
          v-model="templateParameter.paramAttr.dependencyType" :value="1">
        <label class="normalLabel" for="dependencyDatabaseSpecific">특정 Database를 고정 사용</label>
      </div>
      <div class="px-5">
        <table class="normalTable">
          <tbody>
            <tr>
              <th class="title"><label class="normalLabel" for="dependencyDatabaseSpecificInput">Specific DB</label></th>
              <td class="input_text width80">
                <input type="text" class="mb-0" id="dependencyDatabaseSpecificInput" placeholder="Database명을 입력해 주세요."
                  v-model="templateParameter.paramAttr.databaseValue1">
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    templateParameter: {
      type: Object
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/settings.scss";
</style>
