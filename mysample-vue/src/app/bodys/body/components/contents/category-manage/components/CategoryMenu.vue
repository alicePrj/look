<template>
  <div class="border-color text-left p-4">
    <div class="mb-5">
      <div class="flex mb-4">
        <h3 class="font-weight-bold mb-0">Analysis</h3>
        <div class="empty"></div>
        <div><a class="button run mb-0 mr-2" @click="addAnalysis()">+ Add</a></div>
      </div>
      <div>
        <ul class="ml-4 mb-0 position-relative-z-index-1" id="spinnerAnalysis">
          <draggable v-model="analysisTemplates" :options="dragOptions" @start="drag=true" @end="drag=false">
            <li v-for="(template, key) in analysisTemplates" :key="key" class="template-class">
              <span class="pointer popover-parent">
                <span @click="go(template)" :class="{ 'active': categoryId === template.categoryId }">{{template.categoryDetails[0].categoryNm}}</span>
                <a class="button button-small mb-0 ml-2 invisible" @click="go(template)">Edit</a>
                <div class="popover-child d-none" :class="{drag: drag === true}">{{template.categoryDetails[0].categoryNm}}</div>
              </span>
            </li>
            <div :class="{ 'd-none': !emptyAnalysis }">&nbsp;</div>
          </draggable>
        </ul>
      </div>
    </div>
    <div>
      <div class="flex mb-4">
        <h3 class="font-weight-bold mb-0">Operation</h3>
        <div class="empty"></div>
        <div><a class="button run mb-0 mr-2" @click="addOperation()">+ Add</a></div>
      </div>
      <ul class="ul ml-4 mb-0 position-relative-z-index-1" id="spinnerOperation">
        <draggable v-model="operationTemplates" :options="dragOptions" @start="drag=true" @end="drag=false">
          <li v-for="(template, key) in operationTemplates" :key="key" class="template-class">
            <span class="pointer popover-parent">
              <span @click="go(template)" :class="{ 'active': categoryId === template.categoryId }">{{template.categoryDetails[0].categoryNm}}</span>
              <a class="button button-small mb-0 ml-2 invisible" style="display: inline" @click="go(template)">Edit</a>
              <div class="popover-child d-none" :class="{drag: drag === true}">{{template.categoryDetails[0].categoryNm}}</div>
            </span>
          </li>
          <div :class="{ 'd-none': !emptyOperation }">&nbsp;</div>
        </draggable>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { findIndex } from 'lodash'
import { util } from '@/shared/utils/util'
import draggable from 'vuedraggable'
import * as types from '@/shared/stores/types'

export default {
  data () {
    const analysisSecondTemplates = []
    const operationSecondTemplates = []
    return {
      editable: true,
      analysisSecondTemplates: analysisSecondTemplates,
      operationSecondTemplates: operationSecondTemplates,
      thirdDepthMenu: false,
      orders: [],
      drag: false
    }
  },
  watch: {
    apicategoryList: function (categoryList) {
      this.analysisSecondTemplates = categoryList[0].categoryList
      this.operationSecondTemplates = categoryList[1].categoryList
    }
  },
  computed: {
    ...mapState({
      apicategoryList: state => state.category._categoryList
    }),
    categoryId () {
      return Number(this.$route.params.categoryId)
    },
    dragOptions () {
      return {
        group: 'secondTemplates',
        disabled: !this.editable
      }
    },
    analysisTemplates: {
      get () {
        return this.analysisSecondTemplates
      },
      set (orders) {
        if (this.$route.name !== 'category-intro') {
          util.toastr().warning('카테코리 이동은 Category Intro 화면에서만 가능 합니다.')
          return
        }
        this.orders = orders
        this.ordersFirstCategoryId = 0
        this.spinnerId = 'spinnerAnalysis'
        this.$store.dispatch(types.CATEGORY_ORDER, this)
        this.analysisSecondTemplates = orders
      }
    },
    emptyAnalysis () {
      return !this.analysisSecondTemplates.length
    },
    operationTemplates: {
      get () {
        return this.operationSecondTemplates
      },
      set (orders) {
        if (this.$route.name !== 'category-intro') {
          util.toastr().warning('카테코리 이동은 Category Intro 화면에서만 가능 합니다.')
          return
        }
        this.orders = orders
        this.ordersFirstCategoryId = 1
        this.spinnerId = 'spinnerOperation'
        this.$store.dispatch(types.CATEGORY_ORDER, this)
        this.operationSecondTemplates = orders
      }
    },
    emptyOperation () {
      return !this.operationSecondTemplates.length
    }
  },
  methods: {
    addAnalysis () {
      if (this.$route.name !== 'category-intro') {
        util.toastr().warning('카테코리 추가는 Category Intro 화면에서만 가능 합니다.')
        return
      }
      const template = {
        firstCategoryId: 0,
        categoryId: 0,
        categoryNmEn: 'New Category'
      }
      if (findIndex(this.analysisSecondTemplates, ['categoryId', 0]) === -1) {
        this.analysisSecondTemplates.push(template)
      }
      this.go(template)
    },
    addOperation () {
      if (this.$route.name !== 'category-intro') {
        util.toastr().warning('카테코리 추가는 Category Intro 화면에서만 가능 합니다.')
        return
      }
      const template = {
        firstCategoryId: 1,
        categoryId: 0,
        categoryNmEn: 'New Category'
      }
      if (findIndex(this.operationSecondTemplates, ['categoryId', 0]) === -1) {
        this.operationSecondTemplates.push(template)
      }
      this.go(template)
    },
    go (template) {
      this.$router.push({
        name: 'category-infomation',
        params: {
          firstCategoryId: template.firstCategoryId,
          categoryId: template.categoryId,
          lang: 'EN'
        }})
    }
  },
  created () {
    this.$store.dispatch(types.CATEGORY_LIST_GET)
  },
  components: {
    draggable
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/settings.scss";

ul {
  list-style: disc;
  & > li {
    @extend .mb-1;
  }
}

.popover-parent:hover {
  position: relative;
  & .popover-child {
    position: absolute;
    background-color: white;
    border-radius: 5px;
    border: 1px solid $border-color-primary !important;
    box-shadow: 0 4px 20px 0;
    width: auto !important;
    @extend .p-3;
    @extend .mt-2;
    display: block !important;
    &.drag {
      display: none !important;
    }
  }
}

.template-class {
  .button.button-small {
    font-size: .8rem;
    height: 2.2rem;
    line-height: 2.2rem;
    padding: 0 1.5rem;
    display: inline-block !important;
  }
  &:hover .button.button-small {
    visibility: visible;
  }
}

span.active {
  text-decoration: underline;
}
</style>
