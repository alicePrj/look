<template>
  <div>
    <component-user-display placeholderEN="Date"></component-user-display>
    <hr>
    <component-date-option></component-date-option>
    <hr>
    <component-select-type paramaterType="date"></component-select-type>
  </div>
</template>

<script>
import ComponentUserDisplay from './components/ComponentUserDisplay.vue'
import ComponentDateOption from './components/ComponentDateOption.vue'
import ComponentSelectType from './components/ComponentSelectType.vue'

export default {
  components: {
    ComponentUserDisplay,
    ComponentDateOption,
    ComponentSelectType
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/settings.scss";
</style>
