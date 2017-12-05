<template>
  <div class="px-3">
    <template-step-banner></template-step-banner>
    <form class="text-left">
      <div>
        <h4 class="mb-0 mr-5">Sample 이미지 *</h4>
        <p class="px-5 mb-4 p-description-color">
          ※ 920 * 660 사이즈는 JPG, PNG, GIF 파일만 업로드 가능합니다. 파일명은 영문과 숫자로만 저장해 주세요.<br>
          &nbsp;&nbsp;&nbsp;&nbsp;(대략적인 사이즈로 업로드하면 가로 920에 맞춰져 리사이즈 됩니다.)
        </p>
        <div class="px-5">
          <table class="width60">
            <tbody>
              <tr>
                <th class="title">
                  <div class="position-relative-z-index-1">
                    <div class="position-relative" id="spinnerFile">
                      <input type="file" class="sampleImageInput" id="sampleImage" @change="selectedFile($event, 'sampleImage', 'fileStatus', 'spinnerFile')">
                      <label for="sampleImage" class="sampleImageLabel" id="sampleImageLabel">sampleImageLabel</label>
                      <input type="button" class="button button-gray mb-2" value="File Upload" @click="sampleImageClick()">
                    </div>
                  </div>
                </th>
                <td class="input_text">
                  <div class="position-relative">
                    <input type="text" class="mb-0" title="EN title" placeholder="File Name" readonly="readonly" value="" id="fileStatus">
                    <span v-if="fileCurrent === 'complated'" @click="deleteFile()"><icon class="close-icon" name="close" scale="1"></icon></span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <hr>
      <div>
        <h4 class="mb-0 mr-5">Template 페이지 구축 *</h4>
        <p class="px-5 mb-4 p-description-color">※ EN 입력이 필수이며, KR/JP 입력을 하지 않으면, EN에 입력된 내용으로 노출됩니다.</p>
        <div class="px-5 mb-4">
          <div ref="tabs" class="tab clearfix">
            <router-link v-for="(templateDetail, key) in template.templateDetails" :key="key" v-bind:to="{name: 'template-step4', params: {templateId: templateId, lang: infoTemplateDetails[key].key}}" class="button button-clear column column-20 db-tab" activeClass="tab-selected" exact>
              <icon class="circle-icon mr-2" v-if="templateOri.templateDetails[key].templateNm && templateOri.templateDetails[key].templateContent" name="check-circle" scale="1"></icon>
              <icon class="circle-icon mr-2" v-if="!templateOri.templateDetails[key].templateNm || !templateOri.templateDetails[key].templateContent" name="times-circle" scale="1"></icon>
              <span>{{infoTemplateDetails[key].key}}</span>
            </router-link>
          </div>
          <div class="border-color text-left p-4" v-for="(templateDetail, key) in template.templateDetails" :key="key" v-if="infoTemplateDetails[key].key === lang">
            <div>
              <h5 class="mt-3">Template 이름 *</h5>
              <div class="px-5">
                <table>
                  <tbody>
                    <tr>
                      <td class="input_text width80">
                        <input type="text" class="mb-0" maxlength="100"
                          :title="infoTemplateDetails[key].title"
                          :placeholder="infoTemplateDetails[key].placeholder" v-model="template.templateDetails[key].templateNm">
                      </td>
                      <td>({{ template.templateDetails[key].templateNm | stringLengthComma }}/100 byte)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <hr>
            <div>
              <h5 class="mt-3 mb-0">Template 설명 *</h5>
              <p class="px-5 mb-4 p-description-color">※ Enter를 통한 줄 바뀜만 적용됩니다. 3줄까지 가능합니다.</p>
              <div class="px-5">
                <table>
                  <tbody>
                    <tr>
                      <td class="input_text width80">
                        <textarea
                          class="mb-0" maxlength="1000" @keypress.13="changeContent($event, template.templateDetails[key])"
                          :title="infoTemplateDetails[key].contentTitle"
                          :placeholder="infoTemplateDetails[key].contentPlaceholder"v-model="template.templateDetails[key].templateContent"></textarea>
                      </td>
                      <td>({{ template.templateDetails[key].templateContent | stringLengthComma }}/1,000 byte)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div class="flex px-5">
              <div class="empty"></div>
              <div>
                <input type="button" class="button button-outline mb-2" value="Cancel" @click="reset()">
                <span class="position-relative" id="spinnerSave">
                  <input type="button" class="button button-red mb-2" value="Save" @click="save('spinnerSave')">
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr>
      <div class="flex px-5">
        <p class="mb-0">필요한 Page Description을 입력한 후, 다음 Step으로 진행해 주세요.</p>
        <div class="empty"></div>
        <div>
          <input type="button" class="button mb-0" value="Next" @click="goPreview()" :class="{invalid: !checkNextStep}">
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { cloneDeep } from 'lodash'
import { util } from '@/shared/utils/util'
import * as types from '@/shared/stores/types'
import TemplateStepBanner from './components/TemplateStepBanner.vue'
import Icon from 'vue-awesome/components/Icon.vue'
import 'vue-awesome/icons/close'
import 'vue-awesome/icons/check-circle'
import 'vue-awesome/icons/times-circle'

export default {
  data () {
    return {
      templateOri: {
        templateDetails: [{}, {}, {}]
      },
      template: {
        templateDetails: [{}, {}, {}]
      },
      fileCurrent: 'before',
      infoTemplateDetails: [{
        key: 'EN',
        title: 'EN title',
        placeholder: 'MID Extraction',
        contentTitle: 'EN content',
        contentPlaceholder: `LINE LAN 배너 이벤트, 포인트 지급, 이벤트 참여 유저 확인을 위한 유저 ID를 추출할 수 있습니다.
Ex) 2017년 8월 5일 이후 휴면 유저를 대상으로 LAN 배너 이벤트를 시행하려고 할 때`
      }, {
        key: 'KR',
        title: 'KR title',
        placeholder: 'MID 추출',
        contentTitle: 'KR content',
        contentPlaceholder: `LINE LAN 배너 이벤트, 포인트 지급, 이벤트 참여 유저 확인을 위한 유저 ID를 추출할 수 있습니다.
Ex) 2017년 8월 5일 이후 휴면 유저를 대상으로 LAN 배너 이벤트를 시행하려고 할 때`
      }, {
        key: 'JP',
        title: 'JP title',
        placeholder: 'MID抽出',
        contentTitle: 'JP content',
        contentPlaceholder: `LINE LAN 배너 이벤트, 포인트 지급, 이벤트 참여 유저 확인을 위한 유저 ID를 추출할 수 있습니다.
Ex) 2017년 8월 5일 이후 휴면 유저를 대상으로 LAN 배너 이벤트를 시행하려고 할 때`
      }]
    }
  },
  watch: {
    apiTemplate: function (template) {
      this.setTemplate(template)
    }
  },
  computed: {
    ...mapState({
      apiTemplate: state => state.template._template
    }),
    templateId () {
      return Number(this.$route.params.templateId)
    },
    lang () {
      return this.$route.params.lang
    },
    checkNextStep () {
      return this.template.lastStep >= 4
    }
  },
  methods: {
    setTemplate (template) {
      this.templateOri = {
        templateDetails: template.templateDetails,
        lastStep: template.lastStep
      }
      this.template = cloneDeep(this.templateOri)
      if (template.hasSampleImage === 'Y') {
        this.fileCurrent = 'complated'
        document.getElementById('fileStatus').value = 'Upload Completed'
      }
    },
    sampleImageClick () {
      document.getElementById('sampleImageLabel').click()
    },
    selectedFile (e, fileId, fileStatus, spinnerId) {
      this.fileEvent = e
      this.fileId = fileId
      this.fileStatus = fileStatus
      this.fileCurrent = 'uploading'
      this.spinnerId = spinnerId
      this.$store.dispatch(types.TEMPLATE_IMAGE_POST, this)
    },
    deleteFile () {
      this.$store.dispatch(types.TEMPLATE_IMAGE_DELETE, this)
    },
    checkEnterLimit (value, limit) {
      return (value.split('\n')).length < limit
    },
    changeContent (e, templateDetail) {
      if (!this.checkEnterLimit(e.target.value, 3)) {
        util.toastr().warning('3줄까지 입력 가능합니다.')
        e.preventDefault()
      }
    },
    save (spinnerId) {
      this.spinnerId = spinnerId
      this.$store.dispatch(types.TEMPLATE_SAVE_4, this)
    },
    reset () {
      if (!confirm('지금까지 입력한 내용이 모두 삭제됩니다.')) {
        return
      }
      this.template.templateDetails = cloneDeep(this.templateOri.templateDetails)
    },
    goPreview () {
      if (!this.checkNextStep) {
        util.toastr().warning('영문 Template 정보를 완료해 주세요.')
      } else {
        this.$router.push({name: 'template-step4-preview', params: {templateId: this.templateId, lang: 'EN'}})
      }
    }
  },
  components: {
    TemplateStepBanner,
    Icon
  },
  created () {
    this.$store.dispatch(types.TEMPLATE_GET, this.templateId)
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/settings.scss";

h4:before, h5:before {
  content: "• ";
}

form {
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
}

.close-icon {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
}

.sampleImageLabel, .sampleImageInput {
  position: absolute;
  top: -1000px;
}

.circle-icon {
  position: relative;
  top: 3px;
  color: black;
}
</style>
