<template>
  <div>
    <component-user-display placeholderEN="OS" :templateParameter="templateParameter"></component-user-display>
    <hr>
    <component-filter :templateParameter="templateParameter"></component-filter>
    <hr>
    <component-use-ui paramaterType="os"></component-use-ui>
  </div>
</template>

<script>
import ComponentUserDisplay from './components/ComponentUserDisplay.vue'
import ComponentFilter from './components/ComponentFilter.vue'
import ComponentUseUi from './components/ComponentUseUi.vue'

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
          moreOption: false
        }
      }
    }
  },
  components: {
    ComponentUserDisplay,
    ComponentFilter,
    ComponentUseUi
  },
  created () {
    this.init()
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/settings.scss";
</style>
