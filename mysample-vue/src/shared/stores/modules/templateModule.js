import { map, join, findIndex } from 'lodash'
import { http } from '@/shared/utils/httpaxios'
import { util } from '@/shared/utils/util'
import { common } from '@/shared/utils/common'
import * as types from '@/shared/stores/types'
import mockTemplateListPost from '@mock/template/TemplateListPost'
import mockTemplateGet from '@mock/template/TemplateGet'

export const templateModule = {
  state: {
    /* _useMock: {
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
    }, */
    _templateList: {},
    _template: {},
    _templateOrg: {},
    _templateQueryCheck: ''
  },
  mutations: {
    [types.TEMPLATE_LIST_POST] (state, templateList) {
      state._templateList = templateList
    },
    [types.TEMPLATE_GET] (state, template) {
      state._template = template
    },
    [types.TEMPLATE_ORG] (state, templateOrg) {
      state._templateOrg = templateOrg
    },
    [types.TEMPLATE_PARAMETER_QUERY_CHECK] (state, templateQueryCheck) {
      state._templateQueryCheck = templateQueryCheck
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
      const isMock = false
      if (isMock === true) {
        commit(types.TEMPLATE_LIST_POST, mockTemplateListPost.result)
      } else {
        http.postPromise('/template/list', condition).then(res => {
          commit(types.TEMPLATE_LIST_POST, res.data.result)
        })
      }
    },
    [types.TEMPLATE_GET] ({ commit }, templateId) {
      const isMock = false
      if (isMock === true) {
        commit(types.TEMPLATE_GET, mockTemplateGet.result)
      } else {
        http.getPromise('/template/' + templateId).then(res => {
          commit(types.TEMPLATE_GET, res.data.result)
        })
      }
    },
    [types.TEMPLATE_ORDER] ({ commit }, self) {
      const isMock = false
      if (isMock === true) {
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
    [types.TEMPLATE_CATEGORY] ({ commit }, self) {
      const isMock = false
      if (isMock === true) {
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
    [types.TEMPLATE_DISPLAY] ({ commit }, self) {
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
      const isMock = false
      if (isMock === true) {
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
    [types.TEMPLATE_DELETE] ({ commit }, self) {
      if (!confirm('정말 삭제하시겠습니까?')) {
        return
      }
      const isMock = false
      if (isMock === true) {
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
    [types.TEMPLATE_SAVE_1] ({ commit }, self) {
      const isMock = false
      if (isMock === true) {
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
    [types.TEMPLATE_SAVE_2] ({ commit }, self) {
      const isMock = false
      if (isMock === true) {
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
    [types.TEMPLATE_PARAMETER] ({ commit }, self) {
      const isMock = false
      if (isMock === true) {
        util.toastr().success('저장 되었습니다.')
        self.$router.push({name: 'template-step3', params: {templateId: 1, parameter: 'none'}})
      } else {
        const template = { ...self.template }
        const templateParameter = template.templateParameters[self.parameterFindIndex()]
        if (!templateParameter.paramNmEn) {
          util.toastr().warning('영문 조건명을 입력해 주세요.')
          return
        }
        let checked = false
        let validEn = true
        switch (self.parameterType()) {
          case '@table':
            if (!templateParameter.paramAttr['databaseValue' + templateParameter.paramAttr.dependencyType]) {
              util.toastr().warning('Dependency 조건을 확인해 주세요.')
              return
            } else {
              templateParameter.paramAttr.databaseValue = templateParameter.paramAttr['databaseValue' + templateParameter.paramAttr.dependencyType]
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
            if (!templateParameter.paramAttr['databaseValue' + templateParameter.paramAttr.dependencyType]) {
              util.toastr().warning('Dependency 조건을 확인해 주세요.')
              return
            } else {
              templateParameter.paramAttr.databaseValue = templateParameter.paramAttr['databaseValue' + templateParameter.paramAttr.dependencyType]
            }
            if (!templateParameter.paramAttr.tableValue || !templateParameter.paramAttr.columnValue) {
              util.toastr().warning('Code 정보를 불러올 table과 column을 입력해 주세요.')
              return
            }
            break
          case '@int':
          case '@startInt~@endInt':
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
            if ((minValue !== '' && maxValue !== '') && minValue > maxValue) {
              util.toastr().warning('최소값이 최대값 보다 큽니다.')
              return
            }
            templateParameter.paramAttr['minValue'] = minValue
            templateParameter.paramAttr['maxValue'] = maxValue
            break
          case '@string':
            const maxLength = common.validNumberCommas(templateParameter.paramAttr['maxLength_'])
            if (maxLength === false) {
              util.toastr().warning('string 길이에 숫자만 입력 해주세요.')
              return
            }
            if (!templateParameter.paramAttr.noticeEn) {
              util.toastr().warning('영문 주의사항 문구를 설정해 주세요.')
              return
            }
            templateParameter.paramAttr['maxLength'] = maxLength
            break
          case '@yn':
            if (!templateParameter.paramAttr['Y,N'].EN || !templateParameter.paramAttr.Y.EN || !templateParameter.paramAttr.N.EN) {
              util.toastr().warning('영문 선택 옵션 문구를 설정해 주세요.')
              return
            }
            break
          case '@><':
            map(templateParameter.paramAttr, (paramAttr) => {
              if (paramAttr.useYn_) {
                checked = true
                if (!paramAttr.EN) {
                  validEn = false
                }
              }
              paramAttr.useYn = paramAttr.useYn_ ? 'Y' : 'N'
            })
            if (!checked) {
              util.toastr().warning('한 개 이상의 부등호 기호가 선택되어야 합니다.')
              return
            }
            if (!validEn) {
              util.toastr().warning('영문 선택 옵션 문구를 설정해 주세요.')
              return
            }
            break
          case '@userType':
            const types_ = ['NRU_', 'CBU_', 'STU_', 'LeaveUser_', 'ContinuousUser_', 'RestUser_']
            const types = ['NRU', 'CBU', 'STU', 'LeaveUser', 'ContinuousUser', 'RestUser']
            map(templateParameter.paramAttr, (paramAttr, key) => {
              const index = types_.indexOf(key)
              if (index >= 0) {
                if (paramAttr) {
                  checked = true
                }
                templateParameter.paramAttr[types[index]] = paramAttr ? 'Y' : 'N'
              }
            })
            if (!checked) {
              util.toastr().warning('한 개 이상의 Type이 선택되어야 합니다.')
              return
            }
            break
          case '@order':
            if (!templateParameter.paramAttr.Asc.EN || !templateParameter.paramAttr.Desc.EN) {
              util.toastr().warning('영문 선택 옵션 문구를 설정해 주세요.')
              return
            }
            break
          case '@custom':
            checked = true
            map(templateParameter.paramAttr.alias, (alias) => {
              if (!alias.aliasNm || !alias.EN) {
                checked = false
              }
            })
            if (!checked) {
              util.toastr().warning('옵션 항목과 영문 옵션 문구를 설정해 주세요.')
              return
            }
            if (templateParameter.paramAttr.alias.length === 0) {
              util.toastr().warning('한 개 이상의 Alias가 설정되어야 합니다.')
              return
            }
            break
          case '@date':
            if (templateParameter.paramAttr.from.length !== 8) {
              util.toastr().warning('선택 가능한 날짜 시작일을 설정해 주세요. 예) 20180101')
              return
            }
            break
          case '@startDate~@endDate':
          case '@startTime~@endTime':
            if (templateParameter.paramAttr.from.length !== 8) {
              util.toastr().warning('선택 가능한 날짜 시작일을 설정해 주세요. 예) 20180101')
              return
            }
            const range = Number(templateParameter.paramAttr.range)
            if (templateParameter.paramAttr.range !== '' && (range <= 0 || !range)) {
              util.toastr().warning('선택 가능한 날짜 범위는 0 보다 커야 합니다.')
              return
            }
            break
          case '@/*~@*/':
            if (!templateParameter.paramAttr.commentOff.EN || !templateParameter.paramAttr.commentOn.EN) {
              util.toastr().warning('영문 선택 옵션 문구를 설정해 주세요.')
              return
            }
            break
          case '@opt(A)/*~@opt(B)*/':
            if (!templateParameter.paramAttr.optionCommentA.EN || !templateParameter.paramAttr.optionCommentB.EN) {
              util.toastr().warning('영문 선택 옵션 문구를 설정해 주세요.')
              return
            }
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
    [types.TEMPLATE_PARAMETER_ORDER] ({ commit }, self) {
      const isMock = false
      if (isMock === true) {
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
    [types.TEMPLATE_PARAMETER_QUERY_CHECK] ({ commit }, self) {
      const isMock = false
      if (isMock === true) {
        commit(types.TEMPLATE_PARAMETER_QUERY_CHECK, '--test query\nSELECT * FROM oap_real_hbaccess WHERE dt=\'20170428\' limit 10\n\n')
      } else {
        const { templateParameters } = self.template
        const template = {
          templateId: self.template.templateId,
          paramList: []
        }
        for (let i = 0; i < templateParameters.length; i += 1) {
          const templateParameter = templateParameters[i]
          const displayName = self.getDisplayName(templateParameter)
          switch (templateParameter.paramType.toLowerCase()) {
            case '@database':
              if (!templateParameter.paramAttribute.databaseValue) {
                util.toastr().warning(displayName + ' 조건을 선택해 주세요.')
                return false
              }
              break
            case '@table':
              if (!templateParameter.paramAttribute.tableValue) {
                util.toastr().warning(displayName + ' 조건을 선택해 주세요.')
                return false
              }
              break
            case '@column':
              if (typeof (templateParameter.paramAttribute.columnValue_) === 'object') {
                templateParameter.paramAttribute.columnValue = join(templateParameter.paramAttribute.columnValue_, ', ')
              } else {
                templateParameter.paramAttribute.columnValue = templateParameter.paramAttribute.columnValue_
              }
              if (!templateParameter.paramAttribute.columnValue) {
                util.toastr().warning(displayName + ' 조건을 선택해 주세요.')
                return false
              }
              break
            case '@code':
              if (typeof (templateParameter.paramAttribute.codeValue_) === 'object') {
                templateParameter.paramAttribute.codeValue = join(templateParameter.paramAttribute.codeValue_, ', ')
              } else {
                templateParameter.paramAttribute.codeValue = templateParameter.paramAttribute.codeValue_
              }
              if (!templateParameter.paramAttribute.codeValue) {
                util.toastr().warning(displayName + ' 조건을 선택해 주세요.')
                return false
              }
              templateParameter.paramAttribute.selectType = templateParameter.paramAttr.selectType
              break
            case '@int':
              const intValue = common.validNumberCommas(templateParameter.paramAttribute.intValue_ || '')
              if (intValue === false) {
                util.toastr().warning(displayName + ' 조건에 숫자만 입력 해주세요.')
                return
              }
              if (intValue === '') {
                util.toastr().warning(displayName + ' 조건에 값을 입력 해주세요.')
                return
              }
              if (templateParameter.paramAttr.minValue !== '' && intValue < templateParameter.paramAttr.minValue) {
                util.toastr().warning(displayName + ' 조건이 최소값 보다 작습니다.')
                return
              } else if (templateParameter.paramAttr.maxValue !== '' && intValue > templateParameter.paramAttr.maxValue) {
                util.toastr().warning(displayName + ' 조건이 최대값 보다 큼니다.')
                return
              }
              templateParameter.paramAttribute.intValue = intValue
              break
            case '@string':
              if (!templateParameter.paramAttribute.stringValue) {
                util.toastr().warning(displayName + ' 조건에 값을 입력 해주세요.')
                return
              }
              break
            case '@startInt~@endInt'.toLowerCase():
              const startIntValue = common.validNumberCommas(templateParameter.paramAttribute.startIntValue_ || '')
              const endIntValue = common.validNumberCommas(templateParameter.paramAttribute.endIntValue_ || '')
              if (startIntValue === false || endIntValue === false) {
                util.toastr().warning(displayName + ' 조건에 숫자만 입력 해주세요.')
                return
              }
              if (startIntValue === '' || endIntValue === '') {
                util.toastr().warning(displayName + ' 조건에 값을 입력 해주세요.')
                return
              }
              if (templateParameter.paramAttr.minValue !== '' && startIntValue < templateParameter.paramAttr.minValue) {
                util.toastr().warning(displayName + ' 조건 앞숫자 값이 최소값 보다 작습니다.')
                return
              } else if (templateParameter.paramAttr.maxValue !== '' && startIntValue > templateParameter.paramAttr.maxValue) {
                util.toastr().warning(displayName + ' 조건 앞숫자 값이 최대값 보다 큼니다.')
                return
              }
              if (templateParameter.paramAttr.minValue !== '' && endIntValue < templateParameter.paramAttr.minValue) {
                util.toastr().warning(displayName + ' 조건이 뒷숫자 값이 최소값 보다 작습니다.')
                return
              } else if (templateParameter.paramAttr.maxValue !== '' && endIntValue > templateParameter.paramAttr.maxValue) {
                util.toastr().warning(displayName + ' 조건이 뒷숫자 값이 최대값 보다 큼니다.')
                return
              }
              if (startIntValue > endIntValue) {
                util.toastr().warning(displayName + ' 조건 뒷숫자 값이 앞숫자 값보다 큼니다.')
                return
              }
              templateParameter.paramAttribute.startIntValue = startIntValue
              templateParameter.paramAttribute.endIntValue = endIntValue
              break
            default:
          }
          template.paramList[i] = {
            paramType: templateParameter.paramType,
            paranmInquery: templateParameter.paranmInquery,
            orderNum: templateParameter.orderNum,
            paramAttribute: templateParameter.paramAttribute
          }
        }
        console.log(template)
        console.log(JSON.stringify(template))
        /* if (template !== templateParameters) {
          return
        } */
        const spinner = util.spinner(self.spinnerId)
        http.postPromise('/template/queryCheck', template).then(res => {
          spinner.stop()
          if (res.data) {
            if (res.data.result) {
              commit(types.TEMPLATE_PARAMETER_QUERY_CHECK, res.data.result)
            } else {
              util.toastr().error('Unknown Exception')
            }
          } else {
            util.toastr().error('Unknown Exception')
          }
        })
      }
    },
    [types.TEMPLATE_SAVE_4] ({ commit }, self) {
      const isMock = false
      if (isMock === true) {
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
    [types.TEMPLATE_IMAGE_POST] ({ commit }, self) {
      const isMock = false
      if (isMock === true) {
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
    [types.TEMPLATE_IMAGE_DELETE] ({ commit }, self) {
      if (!confirm('정말 삭제하시겠습니까?')) {
        return
      }
      const isMock = false
      if (isMock === true) {
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
    [types.TEMPLATE_DEPLOY] ({ commit }, self) {
      const isMock = false
      if (isMock === true) {
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
    [types.TEMPLATE_DISCARDCHANGE] ({ commit }, self) {
      if (!confirm('지금까지 수정된 내용이 모두 삭제되게 됩니다. 계속 진행하시겠습니까?')) {
        return
      }
      const isMock = false
      if (isMock === true) {
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
      const isMock = false
      if (isMock === true) {
        commit(types.TEMPLATE_ORG, mockTemplateGet.result)
      } else {
        http.getPromise('/template/org/' + templateId).then(res => {
          commit(types.TEMPLATE_ORG, res.data.result)
        })
      }
    }
  }
}
