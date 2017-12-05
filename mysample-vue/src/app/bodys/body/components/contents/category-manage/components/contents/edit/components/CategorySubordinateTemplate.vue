<template>
  <div class="border-color text-left p-4 position-relative" id="categorySubordinateTemplate">
    <div>
      <p>Drag & Drop을 통해 Template 순서를 조정할 수 있습니다. 개별 Template을 다른 Category로 이동하거나, Template을 수정하고 싶을 경우 Template 명에서 우클릭을 해 주세요.</p>
    </div>
    <div v-if="hasTemplates" class="border-color p-4" :class="{height30rem: !apiLoading}" id="spinnerTemplate">
      <ul class="ml-4 mb-0">
        <draggable v-model="templates" :options="dragOptions" @start="drag=true" @end="drag=false">
          <li v-for="(template, key) in templates" :key="key">
            <span class="pointer popover-parent" v-popover:popOver name="v-popover-popOver" @contextmenu="rightClick($event, key)">
              <span @click="leftClick($event)">{{template.templateNmEn}}</span>
              <a class="invisible" @click="go(key)">Edit</a>
              <span class="popover-child d-none" :class="{drag: drag === true}">{{template.templateNmEn}}</span>
            </span>
          </li>
        </draggable>
      </ul>
    </div>
    <div v-if="!hasTemplates" class="border-color p-4 flex height30rem">
      <div class="empty"></div>
      <div :class="{'d-none': !apiLoading}">등록된 하위 Category가 없습니다.</div>
      <div class="empty"></div>
    </div>
    <popover name="popOver">
      <div v-if="isThirdDepthMenu">
        <div class="pointer" @click="chCategory()">Category Change</div>
        <hr class="my-2">
        <!-- <div class="pointer">
          <router-link v-bind:to="{ name: 'category-infomation', params: {idx: 0} }" style="color: inherit;">Template Edit&nbsp;&nbsp;&nbsp;▶</router-link>
        </div> -->
        <div class="pointer" @click="go()">Template Edit&nbsp;&nbsp;&nbsp;▶</div>
      </div>
      <div v-if="!isThirdDepthMenu">
        <category-selector :template="currentTemplate" :templateId="currentTemplate.templateId" :categoryId="categoryId" from="category"></category-selector>
      </div>
    </popover>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { map, orderBy } from 'lodash'
import { common } from '@/shared/utils/common'
import * as types from '@/shared/stores/types'
import draggable from 'vuedraggable'
import CategorySelector from '@/app/bodys/body/common/CategorySelector'

export default {
  data () {
    const thirdDepthTemplates = []
    return {
      editable: true,
      thirdDepthTemplates: thirdDepthTemplates,
      thirdDepthMenu: false,
      apiLoading: false,
      orders: [],
      currentTemplate: {},
      drag: false
    }
  },
  watch: {
    apiCategory: function (category) {
      const thirdDepthTemplates = []
      map(category.templates, (template, key) => {
        thirdDepthTemplates[key] = {
          ...template,
          templateNmEn: 'No name'
        }
        map(template.templateDetails, detail => {
          if (detail.langType.toUpperCase() === 'EN' && detail.templateNm) {
            thirdDepthTemplates[key].templateNmEn = detail.templateNm
          }
        })
      })
      this.thirdDepthTemplates = orderBy(thirdDepthTemplates, 'orderNum', 'asc')
      this.apiLoading = true
    }
  },
  computed: {
    ...mapState({
      apiCategory: state => state.category._category
    }),
    categoryId () {
      return Number(this.$route.params.categoryId)
    },
    hasTemplates () {
      return this.apiCategory.templates && this.apiCategory.templates.length
    },
    dragOptions () {
      return {
        group: 'ThirdDepthTemplates',
        disabled: !this.editable
      }
    },
    templates: {
      get () {
        return this.thirdDepthTemplates
      },
      set (orders) {
        this.orders = orders
        this.spinnerId = 'spinnerTemplate'
        this.$store.dispatch(types.TEMPLATE_ORDER, this)
        this.thirdDepthTemplates = orders
      }
    },
    isThirdDepthMenu () {
      return this.thirdDepthMenu
    }
  },
  methods: {
    leftClick (e) {
      e.stopPropagation()
    },
    rightClick (e, key) {
      e.preventDefault()
      this.thirdDepthMenu = true
      this.currentTemplate = this.templates[key]
      document.getElementsByName('v-popover-popOver')[key].click()
    },
    chCategory () {
      this.thirdDepthMenu = false
    },
    close () {
      document.getElementById('categorySubordinateTemplate').click()
    },
    go () {
      common.goCurrentStep(this, this.currentTemplate)
    }
  },
  created () {
    this.$store.dispatch(types.CATEGORY_GET, this.categoryId)
  },
  components: {
    draggable,
    CategorySelector
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/settings.scss";

p {
  text-indent: -1rem;
  padding-left: 2rem;
  &:before {
    content: "* ";
  }
}

ul {
  list-style: disc;
  li {
    @extend .mb-1;
  }
  li:last-child {
    @extend .mb-0;
  }
}

div[data-popover="popOver"] {
  position: absolute;
  border: 1px solid $border-color-primary !important;
  width: auto !important;
  @extend .p-3;
}

div[data-popover="popOver"]:before {
  display: none;
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

.height30rem {
  height: 30rem
}
</style>
