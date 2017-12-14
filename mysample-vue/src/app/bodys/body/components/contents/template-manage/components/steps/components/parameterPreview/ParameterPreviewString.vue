<template>
  <span>
    <input type="text" class="mb-0" title="stringValue" placeholder="숫자 혹은 문자를 입력해 주세요."
      v-model="templateParameter.paramAttribute.stringValue" :maxlength="templateParameter.paramAttr.maxLength || 1000">
    <span class="ml-3">({{ templateParameter.paramAttribute.stringValue | stringLengthComma }}/{{templateParameter.paramAttr.maxLength_ || '1,000'}} byte)</span>
    <br>
    <span class="ml-3">{{getNoticeName()}}</span>
  </span>
</template>

<script>
export default {
  props: {
    templateParameter: {
      type: Object
    },
    lang: {
      type: String
    }
  },
  methods: {
    getNoticeName () {
      if (this.lang === 'KR' && this.templateParameter.paramAttr.noticeKr) {
        return this.templateParameter.paramAttr.noticeKr
      } else if (this.lang === 'JP' && this.templateParameter.paramAttr.noticeJp) {
        return this.templateParameter.paramAttr.noticeJp
      } else {
        return this.templateParameter.paramAttr.noticeEn
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/settings.scss";

input {
  background-color: $color-initial;
}
</style>
