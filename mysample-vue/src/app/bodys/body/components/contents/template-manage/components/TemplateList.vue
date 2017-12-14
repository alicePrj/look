<template>
  <div class="container" id="TemplateList">
    <div class="row search flex mb-4">
      <div class="search-panel">
        <label for="search-box" class="float-left m-0" style="line-height: 2.4;">Search</label>
        <div class="flex">
          <div class="mx-4">
            <select class="mb-0" title="langType" v-model="condition.langType" @change="search">
              <option value="EN">EN</option>
              <option value="KR">KR</option>
              <option value="JP">JP</option>
            </select>
          </div>
          <div class="position-relative full">
            <input type="text" class="" v-model="condition.searchString" @keyup.enter="search" placeholder="Enter Template or category Name" id="search-box">
            <span @click="search" class="search-icon"><icon name="search" scale="1"></icon></span>
          </div>
        </div>
      </div>
      <div class="add-buttons">
        <router-link v-bind:to="{name: 'template-step1', params: {templateId: 0}}" class="button add-staff" activeClass="selected" exact>Add New Template</router-link>
      </div>
    </div>
    <div class="row">
      <table>
        <thead>
          <tr>
            <th>
              <div class="flex">
                <div>Registered Time</div>
                <div class="pt-2 pl-2">
                  <icon label="sort">
                    <icon
                      class="pointer sort" name="sort-desc" scale="1.4" @mousedown.native="changeSort('crt_date', 'desc')"
                      :class="{active: condition.sortValue === 'desc' && condition.sortColumn === 'crt_date'}"></icon>
                    <icon
                      class="pointer sort" name="sort-asc" scale="1.4" @mousedown.native="changeSort('crt_date', 'asc')"
                      :class="{active: condition.sortValue === 'asc' && condition.sortColumn === 'crt_date'}"></icon>
                  </icon>
                </div>
              </div>
            </th>
            <th>
              <div class="flex">
                <div>Template Name</div>
                <div class="pt-2 pl-2">
                  <icon label="sort">
                    <icon
                      class="pointer sort" name="sort-desc" scale="1.4" @mousedown.native="changeSort('template_nm', 'desc')"
                      :class="{active: condition.sortValue === 'desc' && condition.sortColumn === 'template_nm'}"></icon>
                    <icon
                      class="pointer sort" name="sort-asc" scale="1.4" @mousedown.native="changeSort('template_nm', 'asc')"
                      :class="{active: condition.sortValue === 'asc' && condition.sortColumn === 'template_nm'}"></icon>
                  </icon>
                </div>
              </div>
            </th>
            <th>
              <div class="flex">
                <div>Category</div>
                <div class="pt-2 pl-2">
                  <icon label="sort">
                    <icon
                      class="pointer sort" name="sort-desc" scale="1.4" @mousedown.native="changeSort('category_nm', 'desc')"
                      :class="{active: condition.sortValue === 'desc' && condition.sortColumn === 'category_nm'}"></icon>
                    <icon
                      class="pointer sort" name="sort-asc" scale="1.4" @mousedown.native="changeSort('category_nm', 'asc')"
                      :class="{active: condition.sortValue === 'asc' && condition.sortColumn === 'category_nm'}"></icon>
                  </icon>
                </div>
              </div>
            </th>
            <th>Register</th>
            <th>Last Editor</th>
            <th>Step</th>
            <th>Display</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(template, key) in templateList" :key="key">
            <td class="bg-sky">{{ template.crtDateFormat }}</td>
            <td class="bg-sky">{{ template.templateNm }}</td>
            <td class="bg-sky"><a class="position-relative-z-index-1 pointer" @click="changeCategory(template)" v-popover:popOver>{{template.firstCategoryId === 0 ? 'Anlaysis' : 'Operation'}} > {{template.categoryNmEn}}</a></td>
            <td class="bg-sky">{{ template.crtNm }}</td>
            <td class="bg-sky">{{ template.modifyNm }}</td>
            <td>Step{{ template.lastStep || 1 }}</td>
            <td>
              <span>
                <toggle-button
                  @mousedown.native="clickDisplay($event, template, key)"
                  :id="'displayButton' + key"
                  :value="template.displayYn === 'Y'"
                  :width="64" :height="30" :sync="true" :labels="true"
                  color="#428BCA" style="font-size:1.1rem; text-transform:uppercase"
                ></toggle-button>
              </span>
              <!-- <span @click="clickDisplay($event, template, key)">
                <toggle-button
                  :id="'displayButton' + key"
                  :value="template.displayYn === 'Y'"
                  :width="64" :height="30" :sync="true" :labels="true"
                  color="#428BCA" style="font-size:1.1rem; text-transform:uppercase"
                ></toggle-button>
              </span> -->
            </td>
            <td>
              <a class="button edit px-4" @click="go(template)">Edit</a>
              <a class="button delete px-4" :class="{'d-none': Number(template.lastStep) === 5}" @click="del(template)">Delete</a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div :class="{'d-none': !noResult}">
      검색된 Template가 없습니다.
    </div>
    <div class="row mb-5">
      <div class="pages">
        <span
          v-for="(i, key) in totalPages"
          @click="jumpToPage(i)"
          :class="{ 'page-number': condition.nowPage != i, 'current-page-number': condition.nowPage == i }"
          :key="key"
        >{{ i }}</span>
      </div>
    </div>
    <popover name="popOver">
      <div>
        <category-selector :template="currentTemplate" :templateId="currentTemplate.templateId" :categoryId="currentTemplate.categoryId" from="template"></category-selector>
      </div>
    </popover>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { map } from 'lodash'
import moment from 'moment'
import { common } from '@/shared/utils/common'
import * as types from '@/shared/stores/types'
import CategorySelector from '@/app/bodys/body/common/CategorySelector'
import Icon from 'vue-awesome/components/Icon.vue'
import 'vue-awesome/icons/filter'
import 'vue-awesome/icons/search'
import 'vue-awesome/icons/camera'
import 'vue-awesome/icons/ban'
import 'vue-awesome/icons/sort-desc'
import 'vue-awesome/icons/sort-asc'

export default {
  data () {
    return {
      condition: {
        nowPage: 1,
        pageNum: 15,
        langType: 'EN'
      },
      totCnt: 0,
      templateList: [],
      currentTemplate: {},
      noResult: false
    }
  },
  watch: {
    '$route.query': function (query) {
      this.setContition(query)
      this.$store.dispatch(types.TEMPLATE_LIST_POST, this.condition)
    },
    apiTemplateList: function (result) {
      this.totCnt = result.listInfo.totCnt
      this.templateList = result.templateList.slice(0)
      map(this.templateList, template => {
        template.crtDateFormat = moment(template.crtDate).format('YYYY-MM-DD hh:mm:ss')
      })
      this.noResult = this.templateList.length === 0
    }
  },
  computed: {
    ...mapState({
      apiTemplateList: state => state.template._templateList
    }),
    totalPages () {
      return Math.ceil(this.totCnt / this.condition.pageNum)
    }
  },
  methods: {
    /* clickDisplay (e, template, key) {
      if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'LABEL') {
        e.stopPropagation()
        e.preventDefault()
        this.currentTemplate = template
        this.currentTemplateKey = key
        this.$store.dispatch(types.TEMPLATE_DISPLAY, this)
      }
    }, */
    clickDisplay (e, template, key) {
      this.currentTemplate = template
      this.currentTemplateKey = key
      this.$store.dispatch(types.TEMPLATE_DISPLAY, this)
    },
    setContition (query) {
      this.condition = {
        searchString: query.searchString || '',
        sortColumn: query.sortColumn || 'crt_date',
        sortValue: query.sortValue || 'desc',
        langType: query.langType || 'EN',
        pageNum: Number(query.pageNum) || 15,
        nowPage: Number(query.nowPage) || 1
      }
    },
    jumpToPage (pageNumber) {
      this.condition.nowPage = pageNumber
      this.$router.push({ name: 'template-list', query: { ...this.condition } })
    },
    search () {
      this.condition.nowPage = 1
      this.$router.push({ name: 'template-list', query: { ...this.condition } })
    },
    changeSort (sortColumn, sortValue) {
      this.condition.sortColumn = sortColumn
      this.condition.sortValue = sortValue
      this.condition.nowPage = 1
      this.$router.push({ name: 'template-list', query: { ...this.condition } })
    },
    changeCategory (template) {
      this.currentTemplate = template
    },
    go (template) {
      common.goCurrentStep(this, template)
    },
    close: function () {
      document.getElementById('TemplateList').click()
    },
    del (template) {
      this.currentTemplate = template
      this.$store.dispatch(types.TEMPLATE_DELETE, this)
    }
  },
  created () {
    this.setContition(this.$route.query)
    this.$store.dispatch(types.TEMPLATE_LIST_POST, this.condition)
  },
  components: {
    Icon,
    CategorySelector
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/settings.scss";

.row.search {
  background-color: #f1f1f1;
  border-radius: .4rem;
  padding: 1rem;
}

.search-box-wrap {
  padding-left: 2rem;
  display: block;
  overflow: hidden;
}

.search-panel {
  flex-grow: 1;
}

#search-box {
  font-size: 1.2rem;
  // width: 30rem;
  margin-bottom: 0;
}

.search-icon {
  position: absolute;
  top: 8px;
  right: 10px;
  margin-left: -3rem;
  cursor: pointer;
}

.add-buttons {
  margin-left: 5rem
}

.add-buttons a.button {
  margin-top: 0;
  margin-bottom: 0;
}

.bg-sky {
  background-color: #EFF2F8;
}

.button.edit {
  background-color: #4FABC9;
  border-color: #4FABC9;
}

.button.delete {
  background-color: #7E7E7E;
  border-color: #7E7E7E;
}

table {
  font-size: 1.2rem;
}

.company-filter {
  width: 0;
  height: 2rem;
  padding-left: 0;
  margin-bottom: 0;
}

table a.button {
  margin-top: .2rem;
  margin-bottom: .2rem;
}

.sort {
  color: #BFCBD9;
  &:hover, &.active {
    color: #428BCA;
  }
}
.button.edit-role {
  background-color: #4FABC9;
  border-color: #4FABC9;
}

.button.delete {
  background-color: #7E7E7E;
  border-color: #7E7E7E;
}

.pages {
  margin: 0 auto;
}

.page-number {
  margin: 0 .6rem;
  padding: .3rem .6rem;
  border: 1px solid #a1a1a1;
  color: #a1a1a1;
  border-radius: .4rem;
}

.page-number:hover {
  background-color: #a1a1a1;
  color: white;
  cursor: pointer;
}

.current-page-number {
  border: 0;
  margin: 0 1rem;
}

div[data-popover="popOver"] {
  border: 1px solid $border-color-primary !important;
  width: auto !important;
  @extend .p-3;
}

div[data-popover="popOver"]:before {
  display: none;
}
</style>
