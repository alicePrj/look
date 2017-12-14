<template>
  <div>
    <component-user-display placeholderEN="Date" :templateParameter="templateParameter"></component-user-display>
    <hr>
    <component-date-option :templateParameter="templateParameter"></component-date-option>
    <hr>
    <component-select-type paramaterType="date" :templateParameter="templateParameter"></component-select-type>
  </div>
</template>

<script>
import ComponentUserDisplay from './components/ComponentUserDisplay.vue'
import ComponentDateOption from './components/ComponentDateOption.vue'
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
          to: 0
        }
      }
    }
  },
  components: {
    ComponentUserDisplay,
    ComponentDateOption,
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
