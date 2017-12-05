<template>
  <div class="px-3">
    <template-step-banner></template-step-banner>
    <form class="text-left">
      <div>
        <h4>Category 선택 *</h4>
        <div class="px-5">
          <select class="mr-3" style="width: 15%" title="Category1" v-model="selectedCategory" @change="template.categoryId = 0">
            <option :value="0">Analysis</option>
            <option :value="1">Operation</option>
          </select>
          <select class="mr-3" style="width: 55%" title="Category2" v-model="template.categoryId">
            <option :value="0">2 depth Category를 선택해 주세요</option>
            <option v-for="(category, key) in currentCategoryList" :key="key" :value="category.categoryId">
              {{category.categoryDetails[0].categoryNm}}
            </option>
          </select>
          <span><router-link to="/category-manage" target="_blank" activeClass="selected">Go to Category Manage</router-link></span>
        </div>
      </div>
      <hr>
      <div>
        <h4 class="mb-0">Template 권한 *</h4>
        <p class="px-5 mb-4 p-description-color">※ Admin & Wizard_Admin은 모든 Permission을 갖습니다.</p>
        <div class="px-5">
          <table>
            <tbody>
              <tr>
                <td><input type="checkbox" id="cbAdmin" class="mb-0 pointer" v-model="permissions.Admin" checked="checked" disabled="disabled"><label for="cbAdmin" class="pl-3 pointer">Admin</label></td>
                <td><input type="checkbox" id="cbWizard_Admin" class="mb-0 pointer" v-model="permissions.Wizard_Admin" checked="checked" disabled="disabled"><label for="cbWizard_Admin" class="pl-3 pointer">Wizard_Admin</label></td>
              </tr>
              <tr>
                <td><input type="checkbox" id="cbLINE_Premium" class="mb-0 pointer" v-model="permissions.LINE_Premium" :disabled="checkCategoryPermissions('LINE_Premium')"><label for="cbLINE_Premium" class="pl-3 pointer">LINE_Premium</label></td>
                <td><input type="checkbox" id="cbLINE_Common" class="mb-0 pointer" v-model="permissions.LINE_Common" :disabled="checkCategoryPermissions('LINE_Common')"><label for="cbLINE_Common" class="pl-3 pointer">LINE_Common</label></td>
              </tr>
              <tr v-if="this.selectedCategory === 0">
                <td><input type="checkbox" id="cbCommon" class="mb-0 pointer" v-model="permissions.Common" :disabled="checkCategoryPermissions('Common')"><label for="cbCommon" class="pl-3 pointer">Common</label></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <hr>
      <div>
        <h4 class="mb-0">Template 이름</h4>
        <p class="px-5 mb-4 p-description-color">※ EN은 필수이며, KR /JP Template 이름을 입력하지 않을 경우에는, EN에 입력된 이름으로 노출됩니다.</p>
        <div class="px-5">
          <table>
            <tbody>
              <tr>
                <th class="title">EN *</th>
                <td class="input_text"><input type="text" class="mb-0" title="EN title" placeholder="MID Extraction" v-model="template.templateDetails[0].templateNm" maxlength="50"></td>
                <td>({{ template.templateDetails[0].templateNm | stringLengthComma }}/50 byte)</td>
              </tr>
              <tr>
                <th class="title">KR</th>
                <td class="input_text"><input type="text" class="mb-0" title="KR title" placeholder="MID 추출" v-model="template.templateDetails[1].templateNm" maxlength="50"></td>
                <td>({{ template.templateDetails[1].templateNm | stringLengthComma }}/50 byte)</td>
              </tr>
              <tr>
                <th class="title">JP</th>
                <td class="input_text"><input type="text" class="mb-0" title="JP title" placeholder="MID抽出" v-model="template.templateDetails[2].templateNm" maxlength="50"></td>
                <td>({{ template.templateDetails[2].templateNm | stringLengthComma }}/50 byte)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <hr>
      <div>
        <h4>결과 File 제공 포맷*</h4>
        <div class="px-5 flex">
          <!-- <div class="flex-grow-1"><input class="pointer" name="csv-txt" type="radio" checked="checked" id="csv-txt"> <label class="pointer" for="csv-txt">CSV + TXT</label></div> -->
          <div class="flex-grow-1"><input class="pointer" name="csv-txt" type="radio" id="csv-only" v-model="template.fileType" :value="0"> <label class="pointer" for="csv-only">CSV만</label></div>
          <div class="flex-grow-3"><input class="pointer" name="csv-txt" type="radio" id="txt-only" v-model="template.fileType" :value="1"> <label class="pointer" for="txt-only">TXT만</label></div>
        </div>
      </div>
      <div class="flex px-5">
        <div class="empty"></div>
        <div>
          <input type="button" class="button button-outline mb-2" value="Cancel" @click="reset()">
          <span class="position-relative" id="spinnerDeploy">
            <input type="button" class="button mb-2" value="Save" @click="save('spinnerDeploy')">
          </span>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { cloneDeep, concat, findIndex, indexOf } from 'lodash'
import * as types from '@/shared/stores/types'
import TemplateStepBanner from './components/TemplateStepBanner.vue'

export default {
  data () {
    return {
      templateOri: {},
      permissionsOri: {},
      template: {
        categoryId: 0,
        templateDetails: [{}, {}, {}]
      },
      permissions: {},
      selectedCategory: 0,
      AnalysisCategoryList: [],
      OperationCategoryList: [],
      categoryList: []
    }
  },
  watch: {
    apiCategoryList: function (categoryList) {
      this.AnalysisCategoryList = categoryList[0].categoryList
      this.OperationCategoryList = categoryList[1].categoryList
      this.categoryList = concat(categoryList[0].categoryList, categoryList[1].categoryList)
    },
    apiTemplate: function (template) {
      this.setTemplate(template)
    }
  },
  computed: {
    ...mapState({
      apiCategoryList: state => state.category._categoryList,
      apiTemplate: state => state.template._template
    }),
    currentCategoryList () {
      return this.selectedCategory === 0 ? this.AnalysisCategoryList : this.OperationCategoryList
    },
    templateId () {
      return Number(this.$route.params.templateId)
    }
  },
  methods: {
    checkCategoryPermissions (permission) {
      const { categoryId } = this.template
      if (categoryId === 0) {
        return true
      }
      const authLevels = this.categoryList[findIndex(this.categoryList, ['categoryId', categoryId])].authLevel.split(',')
      return !(indexOf(authLevels, permission) > -1)
    },
    setTemplate (template) {
      this.templateOri = {
        templateId: template.templateId,
        categoryId: template.categoryId,
        authLevel: template.authLevel,
        fileType: template.fileType,
        useyn: template.useyn,
        templateDetails: template.templateDetails
      }
      const authLevels = template.authLevel.split(',')
      this.permissionsOri = {
        Admin: indexOf(authLevels, 'Admin') > -1,
        Wizard_Admin: indexOf(authLevels, 'Wizard_Admin') > -1,
        LINE_Premium: indexOf(authLevels, 'LINE_Premium') > -1,
        LINE_Common: indexOf(authLevels, 'LINE_Common') > -1,
        Common: indexOf(authLevels, 'Common') > -1
      }
      this.template = cloneDeep(this.templateOri)
      this.permissions = cloneDeep(this.permissionsOri)
    },
    reset () {
      if (!confirm('지금까지 입력한 내용이 모두 삭제됩니다.')) {
        return
      }
      this.template = cloneDeep(this.templateOri)
      this.permissions = cloneDeep(this.permissionsOri)
    },
    save (spinnerId) {
      this.spinnerId = spinnerId
      this.$store.dispatch(types.TEMPLATE_SAVE_1, this)
    }
  },
  created () {
    this.$store.dispatch(types.CATEGORY_LIST_GET, this.condition)
    if (this.templateId !== 0) {
      this.$store.dispatch(types.TEMPLATE_GET, this.templateId)
    } else {
      this.setTemplate({
        templateId: 0,
        categoryId: 0,
        authLevel: 'Admin,Wizard_Admin',
        fileType: 0,
        useYn: 'Y',
        templateDetails: [{
          langType: 'EN',
          templateNm: ''
        }, {
          langType: 'KR',
          templateNm: ''
        }, {
          langType: 'JP',
          templateNm: ''
        }]
      })
    }
  },
  components: {
    TemplateStepBanner
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/settings.scss";

h4:before {
  content: "• ";
}

form {
  select {
    display: inline !important;
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
}
</style>
