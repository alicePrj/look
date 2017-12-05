<template>
  <div>
    <component-user-display placeholderEN="Data Type" :templateParameter="templateParameter"></component-user-display>
    <hr>
    <component-dependency-database :templateParameter="templateParameter"></component-dependency-database>
    <hr>
    <div class="mb-5">
      <h6>사용 UI</h6>
      <div class="px-5">
        <img src="~@/assets/images/sample-image/table.png" alt="table" width="429">
      </div>
    </div>
  </div>
</template>

<script>
import ComponentUserDisplay from './components/ComponentUserDisplay.vue'
import ComponentDependencyDatabase from './components/ComponentDependencyDatabase.vue'

export default {
  props: {
    templateParameter: {
      type: Object
    }
  },
  watch: {
    templateParameter: function (templateParameter) {
      this.init()
    }
  },
  methods: {
    init () {
      if (!this.templateParameter.paramAttr) {
        this.templateParameter.paramAttr = {
          dependencyType: 0,
          tableValue: ''
        }
      } else if (this.templateParameter.paramAttr.dependencyType === 0) {
        this.templateParameter.paramAttr.tableValue0 = this.templateParameter.paramAttr.tableValue
      } else if (this.templateParameter.paramAttr.dependencyType === 1) {
        this.templateParameter.paramAttr.tableValue1 = this.templateParameter.paramAttr.tableValue
      }
    }
  },
  components: {
    ComponentUserDisplay,
    ComponentDependencyDatabase
  },
  created () {
    this.init()
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/settings.scss";
</style>
