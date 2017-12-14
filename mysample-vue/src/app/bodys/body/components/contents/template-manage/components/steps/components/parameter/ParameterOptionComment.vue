<template>
  <div>
    <component-user-display placeholderEN="Option" :templateParameter="templateParameter"></component-user-display>
    <hr>
    <component-select-options paramaterType="optionComment" :templateParameter="templateParameter"></component-select-options>
    <hr>
    <component-use-ui paramaterType="optionComment"></component-use-ui>
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
          optionCommentA: { EN: '', KR: '', JP: '' },
          optionCommentB: { EN: '', KR: '', JP: '' }
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
