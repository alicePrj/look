<template>
  <div>
    <component-user-display placeholderEN="Yes or No Select" :templateParameter="templateParameter"></component-user-display>
    <hr>
    <component-select-options paramaterType="yn" :templateParameter="templateParameter"></component-select-options>
    <hr>
    <component-use-ui paramaterType="yn"></component-use-ui>
  </div>
</template>

<script>
import ComponentUserDisplay from './components/ComponentUserDisplay.vue'
import ComponentSelectOptions from './components/ComponentSelectOptions.vue'
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
          'Y,N': { EN: '', KR: '', JP: '' },
          Y: { EN: '', KR: '', JP: '' },
          N: { EN: '', KR: '', JP: '' }
        }
      }
    }
  },
  components: {
    ComponentUserDisplay,
    ComponentSelectOptions,
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
