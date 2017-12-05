<template>
  <div class="border-color text-left p-4">
    <div>
      <!-- <div>
        <h5 class="mt-3">Category Name (EN 입력 필수)</h5>
        <div class="px-5">
          <table class="normalTable">
            <tbody>
              <tr>
                <th class="title">EN *</th>
                <td class="input_text"><input type="text" class="mb-0" title="EN title" placeholder="MID Extraction" v-model="category.categoryNmEn" maxlength="50"></td>
                <td>({{ category.categoryNmEn | stringLengthComma }}/50 byte)</td>
              </tr>
              <tr>
                <th class="title">KR</th>
                <td class="input_text"><input type="text" class="mb-0" title="KR title" placeholder="MID 추출" v-model="category.categoryNmKr" maxlength="50"></td>
                <td>({{ category.categoryNmKr | stringLengthComma }}/50 byte)</td>
              </tr>
              <tr>
                <th class="title">JP</th>
                <td class="input_text"><input type="text" class="mb-0" title="JP title" placeholder="MID抽出" v-model="category.categoryNmJp" maxlength="50"></td>
                <td>({{ category.categoryNmJp | stringLengthComma }}/50 byte)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <hr> -->
      <div>
        <h5 class="mt-3 mb-0">Permission</h5>
        <p class="px-5 mb-4 p-description-color">※ Admin & Wizard_Admin은 모든 Permission을 갖습니다.</p>
        <div class="px-5">
          <table class="normalTable">
            <tbody>
              <tr>
                <td><input type="checkbox" id="cbAdmin" class="mb-0 pointer" v-model="permissions.Admin" checked="checked" disabled="disabled"><label for="cbAdmin" class="pl-3 pointer">Admin</label></td>
                <td><input type="checkbox" id="cbWizard_Admin" class="mb-0 pointer" v-model="permissions.Wizard_Admin" checked="checked" disabled="disabled"><label for="cbWizard_Admin" class="pl-3 pointer">Wizard_Admin</label></td>
              </tr>
              <tr>
                <td><input type="checkbox" id="cbLINE_Premium" class="mb-0 pointer" v-model="permissions.LINE_Premium"><label for="cbLINE_Premium" class="pl-3 pointer">LINE_Premium</label></td>
                <td><input type="checkbox" id="cbLINE_Common" class="mb-0 pointer" v-model="permissions.LINE_Common"><label for="cbLINE_Common" class="pl-3 pointer">LINE_Common</label></td>
              </tr>
              <tr v-if="this.firstCategoryId === 0">
                <td><input type="checkbox" id="cbCommon" class="mb-0 pointer" v-model="permissions.Common"><label for="cbCommon" class="pl-3 pointer">Common</label></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <hr>
      <div>
        <div class="px-5 mb-5">
          <div ref="tabs" class="tab clearfix">
            <router-link v-for="(infoCategoryDetail, key) in infoCategoryDetails" :key="key" v-bind:to="{name: 'category-infomation', params: {firstCategoryId: firstCategoryId, categoryId: categoryId, lang: infoCategoryDetail.key}}" class="button button-clear column column-20 db-tab" activeClass="tab-selected" exact>
              <span>{{infoCategoryDetail.key}}</span>
            </router-link>
          </div>
          <div class="border-color text-left p-4" v-for="(categoryDetail, key) in category.categoryDetails" :key="key" v-if="infoCategoryDetails[key].key === lang">
            <div>
              <h5 class="mt-3">Category Name <span v-if="lang == 'EN'">(EN 입력 필수)</span></h5>
              <div class="px-5">
                <table>
                  <tbody>
                    <tr>
                      <td class="input_text width80">
                        <input type="text" class="mb-0" maxlength="100"
                          :title="infoCategoryDetails[key].title"
                          :placeholder="infoCategoryDetails[key].placeholder" v-model="category.categoryDetails[key].categoryNm">
                      </td>
                      <td>({{ category.categoryDetails[key].categoryNm | stringLengthComma }}/100 byte)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <hr>
            <div>
              <h5 class="mt-3 mb-0">Description <span v-if="lang == 'EN'">(EN 입력 필수)</span></h5>
              <p class="px-5 mb-4 p-description-color">※ Enter를 통한 줄 바뀜만 적용됩니다.</p>
              <div class="px-5">
                <table>
                  <tbody>
                    <tr>
                      <td class="input_text width80">
                        <textarea
                          class="mb-0" maxlength="1000"
                          :title="infoCategoryDetails[key].contentTitle"
                          :placeholder="infoCategoryDetails[key].contentPlaceholder"v-model="category.categoryDetails[key].categoryContent"></textarea>
                      </td>
                      <td>({{ category.categoryDetails[key].categoryContent | stringLengthComma }}/1,000 byte)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div class="flex px-5">
          <div class="empty"></div>
          <div>
            <input type="button" class="button button-outline mb-2" value="Cancel" @click="reset()">
            <span class="position-relative" id="spinnerDeploy">
              <input type="button" class="button button-red mb-2" value="Deploy" @click="deploy('spinnerDeploy')">
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { cloneDeep, indexOf } from 'lodash'
import * as types from '@/shared/stores/types'

export default {
  data () {
    return {
      categoryOri: {
        categoryDetails: []
      },
      permissionsOri: {},
      category: {
        categoryDetails: []
      },
      permissions: {},
      infoCategoryDetails: [{
        key: 'EN',
        title: 'EN title',
        placeholder: 'MID Extraction',
        contentTitle: 'EN content',
        contentPlaceholder: ''
      }, {
        key: 'KR',
        title: 'KR title',
        placeholder: 'MID 추출',
        contentTitle: 'KR content',
        contentPlaceholder: ''
      }, {
        key: 'JP',
        title: 'JP title',
        placeholder: 'MID抽出',
        contentTitle: 'JP content',
        contentPlaceholder: ''
      }]
    }
  },
  watch: {
    categoryId: function (categoryId) {
      if (categoryId === 0) {
        this.categoryOri = this.getNewCategory()
        this.setCategory(this.categoryOri)
      } else {
        this.getCategory()
      }
    },
    apiCategory: function (category) {
      this.setCategory(category)
    }
  },
  computed: {
    ...mapState({
      apiCategory: state => state.category._category
    }),
    firstCategoryId () {
      return Number(this.$route.params.firstCategoryId)
    },
    categoryId () {
      return Number(this.$route.params.categoryId)
    },
    lang () {
      return this.$route.params.lang
    }
  },
  methods: {
    getNewCategoryDetails () {
      return [{
        langType: 'EN',
        categoryNm: 'New Category',
        categoryContent: ''
      }, {
        langType: 'KR',
        categoryNm: '',
        categoryContent: ''
      }, {
        langType: 'JP',
        categoryNm: '',
        categoryContent: ''
      }]
    },
    getNewCategory () {
      return {
        firstCategoryId: this.firstCategoryId,
        categoryId: this.categoryId,
        categoryNmEn: 'New Category',
        categoryNmKr: '',
        categoryNmJp: '',
        authLevel: 'Admin,Wizard_Admin',
        useyn: 'Y',
        orderNum: 0,
        categoryDetails: this.getNewCategoryDetails()
      }
    },
    getCategory () {
      this.$store.dispatch(types.CATEGORY_GET, this.categoryId)
    },
    setCategory (category) {
      this.categoryOri = {
        firstCategoryId: category.firstCategoryId,
        categoryId: category.categoryId,
        categoryNmEn: category.categoryNmEn,
        categoryNmKr: category.categoryNmKr,
        categoryNmJp: category.categoryNmJp,
        authLevel: category.authLevel,
        useyn: category.useyn,
        orderNum: category.orderNum,
        categoryDetails: category.categoryDetails
      }
      if (this.categoryOri.categoryDetails.length !== 3) {
        this.categoryOri.categoryDetails = this.getNewCategoryDetails()
      }
      const authLevels = category.authLevel.split(',')
      this.permissionsOri = {
        Admin: indexOf(authLevels, 'Admin') > -1,
        Wizard_Admin: indexOf(authLevels, 'Wizard_Admin') > -1,
        LINE_Premium: indexOf(authLevels, 'LINE_Premium') > -1,
        LINE_Common: indexOf(authLevels, 'LINE_Common') > -1,
        Common: indexOf(authLevels, 'Common') > -1
      }
      this.category = cloneDeep(this.categoryOri)
      this.permissions = cloneDeep(this.permissionsOri)
    },
    reset () {
      if (!confirm('지금까지 입력한 내용이 모두 삭제됩니다.')) {
        return
      }
      this.category = cloneDeep(this.categoryOri)
      this.permissions = cloneDeep(this.permissionsOri)
    },
    deploy (spinnerId) {
      this.spinnerId = spinnerId
      this.$store.dispatch(types.CATEGORY_SAVE, this)
    }
  },
  created () {
    if (this.categoryId !== 0) {
      this.getCategory()
    } else {
      this.setCategory(this.getNewCategory())
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/settings.scss";

h5:before {
  content: "• ";
}

table {
  width: 100%;
  font-size: 1.4rem;
}
tr {
  width: 1%;
  white-space: nowrap;
}
th, td {
  font-weight: normal;
  border-bottom-width: 0;
  @extend .pt-2;
  @extend .pb-2;
}

label {
  display: inline;
  font-weight: 100;
}

.input_text {
  width: 90%;
}
</style>
