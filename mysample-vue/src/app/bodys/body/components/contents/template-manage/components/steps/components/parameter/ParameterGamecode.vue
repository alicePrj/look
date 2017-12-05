<template>
  <div>
    <component-user-display placeholderEN="Game Name"></component-user-display>
    <hr>
    <component-select-type paramaterType="gamecode"></component-select-type>
  </div>
</template>

<script>
import ComponentUserDisplay from './components/ComponentUserDisplay.vue'
import ComponentSelectType from './components/ComponentSelectType.vue'

export default {
  components: {
    ComponentUserDisplay,
    ComponentSelectType
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/settings.scss";

table {
  width: 100%;
  font-size: 1.4rem;
  border-collapse: collapse;
  tr {
    width: 1%;
    white-space: nowrap;
    &:first-child  th {
      background-color: #c3d69b;
    }
  }

  th, td {
    font-weight: normal;
    border: 2px solid $color-secondary;
    @extend .p-2;
    @extend .text-center;
  }

  th {
    @extend .background;
  }
}
</style>
