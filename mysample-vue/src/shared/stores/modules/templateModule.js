import { map, join, findIndex } from 'lodash'
import { http } from '@/shared/utils/httpaxios'
import { util } from '@/shared/utils/util'
import { common } from '@/shared/utils/common'
import * as types from '@/shared/stores/types'
import mockTemplateListPost from '@mock/template/TemplateListPost'
import mockTemplateGet from '@mock/template/TemplateGet'

export const templateModule = {
  state: {
    _useMock: {
      [types.TEMPLATE_LIST_POST]: false,
      [types.TEMPLATE_GET]: false,
      [types.TEMPLATE_ORDER]: false,
      [types.TEMPLATE_CATEGORY]: false,
      [types.TEMPLATE_DISPLAY]: false,
      [types.TEMPLATE_DELETE]: false,
      [types.TEMPLATE_SAVE_1]: false,
      [types.TEMPLATE_SAVE_2]: false,
      [types.TEMPLATE_PARAMETER]: false,
      [types.TEMPLATE_PARAMETER_ORDER]: false,
      [types.TEMPLATE_SAVE_4]: false,
      [types.TEMPLATE_IMAGE_POST]: false,
      [types.TEMPLATE_IMAGE_DELETE]: false,
      [types.TEMPLATE_DEPLOY]: false,
      [types.TEMPLATE_ORG]: false,
      [types.TEMPLATE_DISCARDCHANGE]: false
    },
    _templateList: {},
    _template: {},
    _templateOrg: {}
  },
  mutations: {
    [types.TEMPLATE_LIST_POST] (state, templateList) {
      state._templateList = templateList
    },
    [types.TEMPLATE_GET] (state, template) {
      state._template = template
    },
    [types.TEMPLATE_ORG] (state, template) {
      state._templateOrg = template
    }
  },
  /* getters: {
    [types.TEMPLATE_LIST_POST]: (state) => {
      return state._templateList
    },
    [types.TEMPLATE_GET]: (state) => {
      return state._template
    }
  }, */
  actions: {
    [types.TEMPLATE_LIST_POST] ({ commit }, condition) {
      const { state } = this._modules.root._children.template
      if (state._useMock[types.TEMPLATE_LIST_POST]) {
        commit(types.TEMPLATE_LIST_POST, mockTemplateListPost.result)
      } else {
        http.postPromise('/template/list', condition).then(res => {
          commit(types.TEMPLATE_LIST_POST, res.data.result)
        })
      }
    },
    [types.TEMPLATE_GET] ({ commit }, templateId) {
      const { state } = this._modules.root._children.template
      if (state._useMock[types.TEMPLATE_GET]) {
        commit(types.TEMPLATE_GET, mockTemplateGet.result)
      } else {
        http.getPromise('/template/' + templateId).then(res => {
          commit(types.TEMPLATE_GET, res.data.result)
        })
      }
    },
    [types.TEMPLATE_ORDER] ({ ommit }, self) {
      const { state } = this._modules.root._children.template
      if (state._useMock[types.TEMPLATE_ORDER]) {
        util.toastr().success('수정 배포 되었습니다.')
      } else {
        const newOrder = []
        map(self.orders, (order, key) => {
          newOrder[key] = {
            templateId: order.templateId,
            orderNum: key + 1
          }
        })
        const spinner = util.spinner(self.spinnerId)
        http.putPromise('/template/order', newOrder).then(res => {
          spinner.stop()
          if (res.data) {
            if (res.data.result) {
              util.toastr().success('수정 배포 되었습니다.')
              self.$store.dispatch(types.CATEGORY_GET, self.categoryId)
            } else {
              util.toastr().error('Unknown Exception')
            }
          } else {
            util.toastr().error('Unknown Exception')
          }
        })
      }
    },
    [types.TEMPLATE_CATEGORY] ({ ommit }, self) {
      const { state } = this._modules.root._children.template
      if (state._useMock[types.TEMPLATE_CATEGORY]) {
        util.toastr().success('수정 배포 되었습니다.')
      } else {
        const newCategory = {
          templateId: self.templateId,
          categoryId: self.categoryList[self.categoryIndex].categoryId
        }
        const spinner = util.spinner(self.spinnerId)
        http.putPromise('/template/category', newCategory).then(res => {
          spinner.stop()
          if (res.data) {
            if (res.data.result) {
              util.toastr().success('수정 배포 되었습니다.')
              if (self.from === 'category') {
                self.$store.dispatch(types.CATEGORY_GET, self.categoryId)
              } else {
                self.template.categoryId = self.categoryList[self.categoryIndex].categoryId
                self.template.firstCategoryId = self.categoryList[self.categoryIndex].firstCategoryId
              }
              self.$parent.$parent.close()
            } else {
              util.toastr().error('Unknown Exception')
            }
          } else {
            util.toastr().error('Unknown Exception')
          }
        })
      }
    },
    [types.TEMPLATE_DISPLAY] ({ ommit }, self) {
      const { state } = this._modules.root._children.template
      const template = self.currentTemplate
      const templateKey = self.currentTemplateKey
      let displayYn = 'Y'
      if (template.lastStep < 5) {
        // util.toastr().warning('모든 step이 완료되어야 노출 가능합니다.')
        alert('모든 step이 완료되어야 노출 가능합니다.')
        return
      } else if (template.displayYn === 'Y') {
        if (!confirm('이 Template이 더 이상 노출되지 않습니다. 계속 진행하시겠습니까?')) {
          return
        }
        displayYn = 'N'
      } else {
        if (!confirm('이 Template이 서비스에서 노출됩니다. 계속 진행하시겠습니까?')) {
          return
        }
      }
      if (state._useMock[types.TEMPLATE_DISPLAY]) {
        util.toastr().success('수정 배포 되었습니다.')
        document.getElementById('displayButton' + templateKey).click()
      } else {
        const display = {
          templateId: self.currentTemplate.templateId,
          display: displayYn
        }
        const spinner = util.spinner(self.spinnerId)
        http.putPromise('/template/display', display).then(res => {
          spinner.stop()
          if (res.data) {
            if (res.data.result) {
              util.toastr().success('수정 배포 되었습니다.')
              self.currentTemplate.displayYn = displayYn
              document.getElementById('displayButton' + templateKey).click()
            } else {
              util.toastr().error('Unknown Exception')
            }
          } else {
            util.toastr().error('Unknown Exception')
          }
        })
      }
    },
    [types.TEMPLATE_DELETE] ({ ommit }, self) {
      const { state } = this._modules.root._children.template
      if (!confirm('정말 삭제하시겠습니까?')) {
        return
      }
      if (state._useMock[types.TEMPLATE_DELETE]) {
        util.toastr().success('삭제 되었습니다.')
      } else {
        const spinner = util.spinner(self.spinnerId)
        http.deletePromise('/template/' + self.currentTemplate.templateId).then(res => {
          spinner.stop()
          if (res.data) {
            if (res.data.result) {
              util.toastr().success('삭제 되었습니다.')
              self.$store.dispatch(types.TEMPLATE_LIST_POST, self.condition)
            } else {
              util.toastr().error('Unknown Exception')
            }
          } else {
            util.toastr().error('Unknown Exception')
          }
        })
      }
    },
    [types.TEMPLATE_SAVE_1] ({ ommit }, self) {
      const { state } = this._modules.root._children.template
      if (state._useMock[types.TEMPLATE_SAVE_1]) {
        util.toastr().success('저장 되었습니다.')
        self.$router.push({name: 'template-step2', params: {templateId: 1}})
      } else {
        const template = { ...self.template }
        if (!template.categoryId) {
          util.toastr().warning('2 depth Category를 선택해 주세요.')
          return
        }
        if (!template.templateDetails[0].templateNm) {
          util.toastr().warning('Template 영문 이름을 입력해 주세요.')
          return
        }
        const authLevels = []
        if (self.permissions.Admin) authLevels[authLevels.length] = 'Admin'
        if (self.permissions.Wizard_Admin) authLevels[authLevels.length] = 'Wizard_Admin'
        if (self.permissions.LINE_Premium) authLevels[authLevels.length] = 'LINE_Premium'
        if (self.permissions.LINE_Common) authLevels[authLevels.length] = 'LINE_Common'
        if (self.permissions.Common) authLevels[authLevels.length] = 'Common'
        template.authLevel = join(authLevels, ',')
        const spinner = util.spinner(self.spinnerId)
        http[template.templateId === 0 ? 'postPromise' : 'putPromise']('/template/1st', template).then(res => {
          spinner.stop()
          if (res.data && res.data.result) {
            util.toastr().success('저장 되었습니다.')
            self.$router.push({name: 'template-step2', params: {templateId: template.templateId === 0 ? res.data.result.templateId : template.templateId}})
          } else {
            util.toastr().error('Unknown Exception')
          }
        })
      }
    },
    [types.TEMPLATE_SAVE_2] ({ ommit }, self) {
      const { state } = this._modules.root._children.template
      if (state._useMock[types.TEMPLATE_SAVE_2]) {
        util.toastr().success('저장 되었습니다.')
        self.$router.push({name: 'template-step2-preview', params: {templateId: 1}})
      } else {
        const template = { ...self.template }
        if (!template.queryString) {
          util.toastr().warning('Query를 입력해 주세요.')
          return
        }
        if (template.countQueryUseyn && !template.countQueryString) {
          util.toastr().warning('Count Check Query를 입력해 주세요.')
          return
        }
        template.countQueryUseyn = template.countQueryUseyn === true ? 'Y' : 'N'
        const spinner = util.spinner(self.spinnerId)
        http.putPromise('/template/2nd', template).then(res => {
          spinner.stop()
          if (res.data && res.data.result) {
            util.toastr().success('저장 되었습니다.')
            self.$router.push({name: 'template-step2-preview', params: {templateId: res.data.result.templateId}})
          } else {
            util.toastr().error('Unknown Exception')
          }
        })
      }
    },
    [types.TEMPLATE_PARAMETER_ORDER] ({ ommit }, self) {
      const { state } = this._modules.root._children.template
      if (state._useMock[types.TEMPLATE_PARAMETER_ORDER]) {
        util.toastr().success('수정 되었습니다.')
      } else {
        const newOrder = []
        map(self.orders, (order, key) => {
          newOrder[key] = {
            paramId: order.paramId,
            orderNum: key + 1
          }
        })
        const spinner = util.spinner(self.spinnerId)
        http.putPromise('/template/paramOrder', newOrder).then(res => {
          spinner.stop()
          if (res.data) {
            if (res.data.result) {
              util.toastr().success('수정 되었습니다.')
              self.$store.dispatch(types.TEMPLATE_GET, self.templateId)
            } else {
              util.toastr().error('Unknown Exception')
            }
          } else {
            util.toastr().error('Unknown Exception')
          }
        })
      }
    },
    [types.TEMPLATE_PARAMETER] ({ ommit }, self) {
      const { state } = this._modules.root._children.template
      if (state._useMock[types.TEMPLATE_PARAMETER]) {
        util.toastr().success('저장 되었습니다.')
        self.$router.push({name: 'template-step3', params: {templateId: 1, parameter: 'none'}})
      } else {
        const template = { ...self.template }
        const templateParameter = template.templateParameters[self.parameterFindIndex()]
        if (!templateParameter.paramNmEn) {
          util.toastr().warning('영문 조건명을 입력해 주세요.')
          return
        }
        switch (self.parameterType()) {
          case '@table':
            if (!templateParameter.paramAttr['tableValue' + templateParameter.paramAttr.dependencyType]) {
              util.toastr().warning('Dependency 조건을 확인해 주세요.')
              return
            } else {
              templateParameter.paramAttr.tableValue = templateParameter.paramAttr['tableValue' + templateParameter.paramAttr.dependencyType]
            }
            break
          case '@column':
            if (!templateParameter.paramAttr['databaseValue' + templateParameter.paramAttr.dependencyType] || !templateParameter.paramAttr['tableValue' + templateParameter.paramAttr.dependencyType]) {
              util.toastr().warning('Dependency 조건을 확인해 주세요.')
              return
            } else {
              templateParameter.paramAttr.databaseValue = templateParameter.paramAttr['databaseValue' + templateParameter.paramAttr.dependencyType]
              templateParameter.paramAttr.tableValue = templateParameter.paramAttr['tableValue' + templateParameter.paramAttr.dependencyType]
            }
            break
          case '@code':
            if (!templateParameter.paramAttr['tableValue' + templateParameter.paramAttr.dependencyType]) {
              util.toastr().warning('Dependency 조건을 확인해 주세요.')
              return
            }
            if (!templateParameter.paramAttr.tableValue || !templateParameter.paramAttr.columnValue) {
              util.toastr().warning('Code 정보를 불러올 table과 column을 입력해 주세요.')
              return
            }
            break
          case '@int':
            const minValue = common.validNumberCommas(templateParameter.paramAttr['minValue_'])
            const maxValue = common.validNumberCommas(templateParameter.paramAttr['maxValue_'])
            if (minValue === false) {
              util.toastr().warning('최소값에 숫자만 입력 해주세요.')
              return
            }
            if (maxValue === false) {
              util.toastr().warning('최대값에 숫자만 입력 해주세요.')
              return
            }
            templateParameter.paramAttr['minValue'] = minValue
            templateParameter.paramAttr['maxValue'] = maxValue
            break
          default:
        }
        /* console.log(self.parameterType())
        console.log(templateParameter)
        if (template !== templateParameter) {
          return
        } */
        const spinner = util.spinner(self.spinnerId)
        http.putPromise('/template/parameter', templateParameter).then(res => {
          spinner.stop()
          if (res.data && res.data.result) {
            util.toastr().success('저장 되었습니다.')
            self.$store.dispatch(types.TEMPLATE_GET, self.templateId)
          } else {
            util.toastr().error('Unknown Exception')
          }
        })
      }
    },
    [types.TEMPLATE_SAVE_4] ({ ommit }, self) {
      const { state } = this._modules.root._children.template
      if (state._useMock[types.TEMPLATE_SAVE_4]) {
        util.toastr().success('저장 되었습니다.')
        self.$router.push({name: 'template-step4-preview', params: {templateId: 1}})
      } else {
        const template = { ...self.template }
        const index = findIndex(template.templateDetails, ['langType', self.lang.toLowerCase()]) >= 0 ? findIndex(template.templateDetails, ['langType', self.lang.toLowerCase()]) : findIndex(template.templateDetails, ['langType', self.lang.toUpperCase()])
        const templateDetail = template.templateDetails[index]
        if (!templateDetail.templateNm) {
          util.toastr().warning('Query를 입력해 주세요.')
          return
        }
        if (!templateDetail.templateContent) {
          util.toastr().warning('Template 설명을 입력해 주세요.')
          return
        }
        if (!self.checkEnterLimit(templateDetail.templateContent, 4)) {
          util.toastr().warning('Template 설명은 3줄까지 입력 가능합니다.')
          return
        }
        const spinner = util.spinner(self.spinnerId)
        http.putPromise('/template/4th', templateDetail).then(res => {
          spinner.stop()
          if (res.data && res.data.result) {
            util.toastr().success('저장 되었습니다.')
            self.$store.dispatch(types.TEMPLATE_GET, self.templateId)
          } else {
            util.toastr().error('Unknown Exception')
          }
        })
      }
    },
    [types.TEMPLATE_IMAGE_POST] ({ ommit }, self) {
      const { state } = this._modules.root._children.template
      if (state._useMock[types.TEMPLATE_IMAGE_POST]) {
        util.toastr().success('저장 되었습니다.')
        document.getElementById(self.fileStatus).value = 'Upload Completed'
        self.fileCurrent = 'complated'
      } else {
        const template = { ...self.template }
        const filePath = self.fileEvent.target.value.split('\\')
        const fileNameFull = filePath[filePath.length - 1]
        const fileSplit = fileNameFull.split('.')
        const fileName = fileSplit[0]
        const fileExt = fileSplit[1]
        for (let i = 0; i < fileName.length; i += 1) {
          if ('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.indexOf(fileName[i]) < 0) {
            util.toastr().warning('파일명은 영문 & 숫자만 가능합니다. 파일명을 확인해 주세요.')
            return
          }
        }
        if (fileExt !== 'jpg' && fileExt !== 'png' && fileExt !== 'gif') {
          util.toastr().warning('파일 형식은 소문자 jpg, png, gif만 가능합니다. 파일 형식을 확인해 주세요.')
          return
        }
        document.getElementById(self.fileStatus).value = fileNameFull
        const formData = new FormData()
        formData.append('templateId', template.templateId)
        formData.append('file', document.getElementById(self.fileId).files[0])
        const spinner = util.spinner(self.spinnerId)
        http.postPromise('/template/image', formData).then(res => {
          spinner.stop()
          if (res.data && res.data.result) {
            util.toastr().success('저장 되었습니다.')
            document.getElementById(self.fileStatus).value = 'Upload Completed'
            self.fileCurrent = 'complated'
          } else {
            util.toastr().error('Unknown Exception')
          }
        })
      }
    },
    [types.TEMPLATE_IMAGE_DELETE] ({ ommit }, self) {
      const { state } = this._modules.root._children.template
      if (!confirm('정말 삭제하시겠습니까?')) {
        return
      }
      if (state._useMock[types.TEMPLATE_IMAGE_DELETE]) {
        util.toastr().success('삭제 되었습니다.')
        document.getElementById(self.fileStatus).value = ''
        self.fileCurrent = 'deleted'
      } else {
        document.getElementById(self.fileStatus).value = 'Deleting'
        const spinner = util.spinner(self.spinnerId)
        http.deletePromise('/template/image/' + self.templateId).then(res => {
          spinner.stop()
          if (res.data && res.data.result) {
            util.toastr().success('삭제 되었습니다.')
            document.getElementById(self.fileStatus).value = ''
            self.fileCurrent = 'deleted'
          } else {
            util.toastr().error('Unknown Exception')
          }
        })
      }
    },
    [types.TEMPLATE_DEPLOY] ({ ommit }, self) {
      const { state } = this._modules.root._children.template
      if (state._useMock[types.TEMPLATE_DEPLOY]) {
        if (!confirm('배포하시겠습니까?')) {
          return
        }
        util.toastr().success('배포 되었습니다.')
        self.$store.dispatch(types.TEMPLATE_GET, self.templateId)
      } else {
        const template = { ...self.template }
        const deployStatus = Number(template.deployStatus)
        if (deployStatus === 0) {
          if (!confirm('배포하시겠습니까?')) {
            return
          }
        } else if (deployStatus === 1) {
          if (!confirm('해당 버전으로 배포하시겠습니까?')) {
            return
          }
        } else {
          util.toastr().warning('Unknown Version')
          return
        }
        const body = {
          templateId: self.templateId,
          deployType: deployStatus
        }
        const spinner = util.spinner(self.spinnerId)
        http.putPromise('/template/deploy', body).then(res => {
          spinner.stop()
          if (res.data && res.data.result) {
            util.toastr().success('배포 되었습니다.')
            self.$store.dispatch(types.TEMPLATE_GET, self.templateId)
          } else {
            util.toastr().error('Unknown Exception')
          }
        })
      }
    },
    [types.TEMPLATE_DISCARDCHANGE] ({ ommit }, self) {
      const { state } = this._modules.root._children.template
      if (!confirm('지금까지 수정된 내용이 모두 삭제되게 됩니다. 계속 진행하시겠습니까?')) {
        return
      }
      if (state._useMock[types.TEMPLATE_DISCARDCHANGE]) {
        util.toastr().success('삭제 되었습니다.')
        self.$store.dispatch(types.TEMPLATE_GET, self.templateId)
      } else {
        const spinner = util.spinner(self.spinnerId)
        http.putPromise('/template/discardChange/' + self.templateId).then(res => {
          spinner.stop()
          if (res.data && res.data.result) {
            util.toastr().success('삭제 되었습니다.')
            self.$store.dispatch(types.TEMPLATE_GET, self.templateId)
          } else {
            util.toastr().error('Unknown Exception')
          }
        })
      }
    },
    [types.TEMPLATE_ORG] ({ commit }, templateId) {
      const { state } = this._modules.root._children.template
      if (state._useMock[types.TEMPLATE_ORG]) {
        commit(types.TEMPLATE_ORG, mockTemplateGet.result)
      } else {
        http.getPromise('/template/org/' + templateId).then(res => {
          commit(types.TEMPLATE_ORG, res.data.result)
        })
      }
    }
  }
}
