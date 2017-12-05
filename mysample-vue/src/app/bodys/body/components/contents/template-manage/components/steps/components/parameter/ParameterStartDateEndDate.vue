<template>
  <div>
    <component-user-display placeholderEN="Period"></component-user-display>
    <hr>
    <component-date-option></component-date-option>
    <hr>
    <component-range-option></component-range-option>
    <hr>
    <component-select-type paramaterType="start_date~end_date"></component-select-type>
  </div>
</template>

<script>
import ComponentUserDisplay from './components/ComponentUserDisplay.vue'
import ComponentDateOption from './components/ComponentDateOption.vue'
import ComponentRangeOption from './components/ComponentRangeOption.vue'
import ComponentSelectType from './components/ComponentSelectType.vue'

export default {
  components: {
    ComponentUserDisplay,
    ComponentDateOption,
    ComponentRangeOption,
    ComponentSelectType
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/settings.scss";
</style>
