import { util } from '@/shared/utils/util'

export const common = {
  goCurrentStep (self, template) {
    const step = template.lastStep < 5 ? Number(template.lastStep) + 1 : 5
    self.$router.push({ name: 'template-step' + step, params: { templateId: template.templateId, lang: 'EN', parameter: 'none' } })
  },
  checkNumberCommas (paramAttr, value) {
    if (!paramAttr[value]) {
      return
    }
    const num = util.numberDeleteCommas(paramAttr[value])
    if (paramAttr[value] === '-' || paramAttr[value] === '0' || paramAttr[value] === '') {
    } else if (!num) {
      util.toastr().warning('숫자만 입력 해주세요.')
    } else {
      paramAttr[value] = util.numberWithCommas(num)
    }
  },
  validNumberCommas (value) {
    const num = util.numberDeleteCommas(value)
    if (value === '0') {
      return num
    } else if (value === '') {
      return value
    } else if (!num) {
      return false
    } else {
      return num
    }
  }
}
