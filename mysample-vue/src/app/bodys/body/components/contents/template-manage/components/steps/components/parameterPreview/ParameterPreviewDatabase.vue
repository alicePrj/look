<template>
  <select class="mb-0 pointer" title="Service" v-model="templateParameter.paramAttribute.databaseValue">
    <option :value="undifined">서비스를 선택해 주세요.</option>
    <option value="Internal_Common" v-if="templateParameter.paramAttr.internalLine === 'Y'">Internal_Common</option>
    <option value="lgpkpk_line">LINE Pokopoko</option>
    <option value="LINE_Rangers">LINE Rangers</option>
    <option value="LINE_Play">LINE Play</option>
    <option value="LINE_Bubble_2">LINE Bubble 2</option>
  </select>
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
