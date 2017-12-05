<template>
  <div class="row no-flex">
    <div class="sidebar">
      <menu-panel></menu-panel>
    </div>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import MenuPanel from './components/MenuPanel.vue'

  export default {
    components: {
      MenuPanel
    }
  }
</script>

<style lang="scss" scoped>
  @import "~@/assets/styles/settings.scss";

  .row {
    width: 100%;
  }

  .sidebar {
    flex-grow: 0;
    flex-shrink: 0;
    padding: 0 1rem;
    margin-right: 2rem;
  }

  .content {
    flex-grow: 1;
  }
</style>
