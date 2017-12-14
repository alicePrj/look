<template>
  <select class="mb-0" title="Data Type" v-model="templateParameter.paramAttribute.tableValue"
    :class="{pointer: dependencyDatabaseValue, invalid50: !dependencyDatabaseValue}" :disabled="!dependencyDatabaseValue">
    <option :value="undifined">데이터타입을 선택해 주세요.</option>
    <option value="oap_real_hbaccess">Access log</option>
    <option value="Playtime">Playtime</option>
    <option value="Moneylog">Moneylog</option>
    <option value="Playend_log">Playend log</option>
    <option value="Social_Log">Social Log</option>
    <option value="User_Inflow">User Inflow</option>
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
    dependencyDatabaseSelected: false
  },
  watch: {
    dependencyDatabaseValue: function (databaseValue) {}
  },
  computed: {
    dependencyDatabaseValue () {
      return this.dependencyDatabase.paramAttribute.databaseValue
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/settings.scss";
</style>
