<template>
  <div>
    <component-user-display placeholderEN="Period" :templateParameter="templateParameter"></component-user-display>
    <hr>
    <component-date-option :templateParameter="templateParameter"></component-date-option>
    <hr>
    <component-range-option :templateParameter="templateParameter"></component-range-option>
    <hr>
    <component-select-type paramaterType="startDate~endDate" :templateParameter="templateParameter"></component-select-type>
  </div>
</template>

<script>
import ComponentUserDisplay from './components/ComponentUserDisplay.vue'
import ComponentDateOption from './components/ComponentDateOption.vue'
import ComponentRangeOption from './components/ComponentRangeOption.vue'
import ComponentSelectType from './components/ComponentSelectType.vue'

export default {
  props: {
    templateParameter: {
      type: Object
    }
  },
  watch: {
    templateParameter: function () {
      this.init()
    }
  },
  methods: {
    init () {
      if (!this.templateParameter.paramAttr) {
        this.templateParameter.paramAttr = {
          selectType: 0,
          from: '',
          to: 0,
          range: ''
        }
      }
    }
  },
  components: {
    ComponentUserDisplay,
    ComponentDateOption,
    ComponentRangeOption,
    ComponentSelectType
  },
  created () {
    this.init()
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/settings.scss";
</style>
