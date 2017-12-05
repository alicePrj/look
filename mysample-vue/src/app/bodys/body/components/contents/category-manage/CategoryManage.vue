<template>
  <div class="row no-flex">
    <div class="column column-33 sidebar">
      <category-menu></category-menu>
    </div>
    <div class="column column-67 content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import CategoryMenu from './components/CategoryMenu.vue'

export default {
  components: {
    CategoryMenu
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/settings.scss";
</style>
