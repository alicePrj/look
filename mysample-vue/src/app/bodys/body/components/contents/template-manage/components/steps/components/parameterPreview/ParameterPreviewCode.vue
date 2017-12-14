<template>
  <select class="mb-0" title="Column" v-model="templateParameter.paramAttribute.codeValue_" :multiple="templateParameter.paramAttr.selectType === 1"
    :class="{pointer: dependencyDatabaseValue, invalid50: !dependencyDatabaseValue}" :disabled="!dependencyDatabaseValue">
    <option :value="[]">코드를 선택해 주세요.</option>
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
    }
  },
  watch: {
    dependencyDatabaseValue: function (databaseValue) {}
  },
  computed: {
    dependencyDatabaseValue () {
      return this.dependencyDatabase.paramAttribute.databaseValue
    }
  },
  created () {
    this.templateParameter.paramAttribute.codeValue_ = []
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/settings.scss";
</style>
