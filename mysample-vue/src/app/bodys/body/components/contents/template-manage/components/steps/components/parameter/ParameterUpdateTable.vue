<template>
  <div>
    <component-user-display placeholderEN="Upload"></component-user-display>
    <hr>
    <component-use-ui paramaterType="update_table"></component-use-ui>
  </div>
</template>

<script>
import ComponentUserDisplay from './components/ComponentUserDisplay.vue'
import ComponentUseUi from './components/ComponentUseUi.vue'

export default {
  components: {
    ComponentUserDisplay,
    ComponentUseUi
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/settings.scss";
</style>
