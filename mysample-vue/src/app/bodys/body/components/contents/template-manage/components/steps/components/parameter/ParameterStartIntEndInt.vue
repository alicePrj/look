<template>
  <div>
    <component-user-display placeholderEN="Value"></component-user-display>
    <hr>
    <component-int-between></component-int-between>
    <hr>
    <component-use-ui paramaterType="start_int~end_int"></component-use-ui>
  </div>
</template>

<script>
import ComponentUserDisplay from './components/ComponentUserDisplay.vue'
import ComponentIntBetween from './components/ComponentIntBetween.vue'
import ComponentUseUi from './components/ComponentUseUi.vue'

export default {
  components: {
    ComponentUserDisplay,
    ComponentIntBetween,
    ComponentUseUi
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/settings.scss";
</style>
