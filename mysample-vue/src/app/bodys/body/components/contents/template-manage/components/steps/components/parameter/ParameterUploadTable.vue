<template>
  <div>
    <component-user-display placeholderEN="Upload" :templateParameter="templateParameter"></component-user-display>
    <hr>
    <component-use-ui paramaterType="uploadTable"></component-use-ui>
  </div>
</template>

<script>
import ComponentUserDisplay from './components/ComponentUserDisplay.vue'
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
        this.templateParameter.paramAttr = {}
      }
    }
  },
  components: {
    ComponentUserDisplay,
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
