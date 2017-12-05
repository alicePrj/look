<template>
  <div>
    <div class="flex mb-3">
      <h4 class="font-weight-bold mb-0 pl-2">Category Edit</h4>
      <div class="empty"></div>
      <div class="position-relative-z-index-1" id="spinnerDelete"><a ref="runBtn" href="#" class="button run mb-0 mr-2" :class="{ 'invisible': categoryId === 0 }" @click="del($event, 'spinnerDelete')">Delete</a></div>
    </div>
    <div>
      <div ref="tabs" class="tab clearfix">
        <router-link v-bind:to="{ name: 'category-infomation', params: { firstCategoryId: firstCategoryId, categoryId: categoryId, lang: 'EN' } }" class="button button-clear column column-50 db-tab" :class="{ 'tab-selected': $route.name  === 'category-infomation' }">Category Info Edit</router-link>
        <router-link v-if="categoryId !== 0" v-bind:to="{ name: 'subordinate-template', params: { firstCategoryId: firstCategoryId, categoryId: categoryId } }" class="button button-clear column column-50 db-tab" activeClass="tab-selected" exact>Template Order</router-link>
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import * as types from '@/shared/stores/types'

export default {
  computed: {
    firstCategoryId () {
      return Number(this.$route.params.firstCategoryId)
    },
    categoryId () {
      return Number(this.$route.params.categoryId)
    }
  },
  methods: {
    del (e, spinnerId) {
      e.preventDefault()
      this.spinnerId = spinnerId
      if (confirm('정말 삭제하시겠습니까?')) {
        this.$store.dispatch(types.CATEGORY_DELETE, this)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/settings.scss";

h4:before {
  content: "• ";
}
</style>
