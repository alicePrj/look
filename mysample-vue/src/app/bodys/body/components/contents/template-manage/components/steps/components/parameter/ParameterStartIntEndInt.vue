<template>
  <div>
    <component-user-display placeholderEN="Value" :templateParameter="templateParameter"></component-user-display>
    <hr>
    <component-int-between :templateParameter="templateParameter"></component-int-between>
    <hr>
    <component-use-ui paramaterType="startInt~endInt"></component-use-ui>
  </div>
</template>

<script>
import ComponentUserDisplay from './components/ComponentUserDisplay.vue'
import ComponentIntBetween from './components/ComponentIntBetween.vue'
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
          minValue: '',
          minValue_: '',
          maxValue: '',
          maxValue_: ''
        }
      }
    }
  },
  components: {
    ComponentUserDisplay,
    ComponentIntBetween,
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
