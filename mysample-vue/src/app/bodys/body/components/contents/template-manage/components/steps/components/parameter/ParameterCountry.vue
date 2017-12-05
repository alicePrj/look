<template>
  <div>
    <component-user-display placeholderEN="Country"></component-user-display>
    <hr>
    <component-filter></component-filter>
    <hr>
    <component-use-ui paramaterType="country"></component-use-ui>
  </div>
</template>

<script>
import ComponentUserDisplay from './components/ComponentUserDisplay.vue'
import ComponentFilter from './components/ComponentFilter.vue'
import ComponentUseUi from './components/ComponentUseUi.vue'

export default {
  components: {
    ComponentUserDisplay,
    ComponentFilter,
    ComponentUseUi
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/settings.scss";
</style>
