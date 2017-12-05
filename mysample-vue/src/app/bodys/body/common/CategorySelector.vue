<template>
  <div>
    <div class="flex">
      <div>Category Change</div>
      <div class="empty"></div>
      <div class="mr-3 pointer" @click="$parent.$parent.close()">X</div>
    </div>
    <hr class="m-3">
    <div>
      <select v-model="categoryIndex">
        <option v-for="(category, key) in categoryList" :key="key" :value="key">
          {{category.firstCategoryId === 0 ? 'Anlaysis' : 'Operation'}} > {{category.categoryDetails[0].categoryNm}}
        </option>
      </select>
    </div>
    <div class="flex pl-5">
      <div class="empty"></div>
      <div>
        <input type="button" class="button button-outline mb-2" value="Cancel" @click="$parent.$parent.close()">
        <span class="position-relative-z-index-1" id="spinnerDeploy">
          <input type="button" class="button button-red mb-2" value="Deploy" @click="deploy('spinnerDeploy')">
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { concat } from 'lodash'
import * as types from '@/shared/stores/types'

export default {
  props: {
    template: {
      type: Object
    },
    templateId: {
      type: Number
    },
    categoryId: {
      type: Number
    },
    from: {
      type: String
    }
  },
  data () {
    return {
      categoryIndex: 0,
      categoryList: []
    }
  },
  watch: {
    apicategoryList: function (categoryList) {
      this.categoryList = concat(categoryList[0].categoryList, categoryList[1].categoryList)
    }
  },
  computed: {
    ...mapState({
      apicategoryList: state => state.category._categoryList
    })
  },
  methods: {
    deploy (spinnerId) {
      this.spinnerId = spinnerId
      this.$store.dispatch(types.TEMPLATE_CATEGORY, this)
    }
  },
  created () {
    this.$store.dispatch(types.CATEGORY_LIST_GET)
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/settings.scss";
</style>
