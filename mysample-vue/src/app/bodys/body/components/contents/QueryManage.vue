<template>
  <div>
    <div ref="tabs" class="pt-3 tab clearfix">
      <router-link v-bind:to="{ name: 'query', params: {type: 'Hive'} }" class="button button-clear column column-20 db-tab" activeClass="tab-selected" exact>Hive</router-link>
      <router-link v-bind:to="{ name: 'query', params: {type: 'Impala'} }" class="button button-clear column column-20 db-tab" activeClass="tab-selected" exact>Impala</router-link>
    </div>
    <query-panel></query-panel>
    <query-status hidable="true"></query-status>
    <hr>
    <query-history :isAdmin="true"></query-history>
  </div>
</template>

<script>
  import QueryPanel from '@/app/bodys/body/common/querys/QueryPanel'
  import QueryStatus from '@/app/bodys/body/common/querys/QueryStatus'
  import QueryHistory from '@/app/bodys/body/common/querys/QueryHistory'

  export default {
    components: {
      QueryPanel,
      QueryStatus,
      QueryHistory
    }
  }
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/settings.scss";
</style>
