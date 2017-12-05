<template>
  <div>
    <component-user-display placeholderEN="Yes or No Select"></component-user-display>
    <hr>
    <component-select-options paramaterType="yn"></component-select-options>
    <hr>
    <component-use-ui paramaterType="yn"></component-use-ui>
  </div>
</template>

<script>
import ComponentUserDisplay from './components/ComponentUserDisplay.vue'
import ComponentSelectOptions from './components/ComponentSelectOptions.vue'
import ComponentUseUi from './components/ComponentUseUi.vue'

export default {
  components: {
    ComponentUserDisplay,
    ComponentSelectOptions,
    ComponentUseUi
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/settings.scss";
</style>
