<template>
  <select class="mb-0" title="Column" v-model="templateParameter.paramAttribute.columnValue_" :multiple="templateParameter.paramAttr.selectType === 1"
    :class="{pointer: dependencyDatabaseValue && dependencyTableValue, invalid50: !dependencyDatabaseValue || !dependencyTableValue}" :disabled="!dependencyDatabaseValue || !dependencyTableValue">
    <option :value="[]">컬럼을 선택해 주세요.</option>
    <option value="country_info">국가정보</option>
    <option value="encmid">암호화된 아이디</option>
    <option value="log_created">로그 생성일</option>
    <option value="OS_info">OS 정보</option>
    <option value="state_name">Stage명</option>
    <option value="state_success_failed">Stage 성공/실패</option>
  </select>
</template>

<script>
export default {
  props: {
    templateParameter: {
      type: Object
    },
    dependencyDatabase: {
      type: Object
    },
    dependencyTable: {
      type: Object
    }
  },
  watch: {
    dependencyDatabaseValue: function (databaseValue) {},
    dependencyTableValue: function (tableValue) {}
  },
  computed: {
    dependencyDatabaseValue () {
      return this.dependencyDatabase.paramAttribute.databaseValue
    },
    dependencyTableValue () {
      return this.dependencyTable.paramAttribute.tableValue
    }
  },
  created () {
    this.templateParameter.paramAttribute.columnValue_ = []
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/settings.scss";
</style>
