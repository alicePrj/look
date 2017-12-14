<template>
  <span>
    <input type="text" class="mb-0 width50" title="intValue" placeholder="숫자를 입력해 주세요."
      v-model="templateParameter.paramAttribute.intValue_" @keydown="numberOnlyEvent($event)" @keyup="checkNumberCommas(templateParameter.paramAttribute, 'intValue_')">
    <span class="ml-3" v-if="templateParameter.paramAttr.minValue || templateParameter.paramAttr.maxValue">
      (Min {{templateParameter.paramAttr.minValue_}}<span v-if="templateParameter.paramAttr.minValue && templateParameter.paramAttr.maxValue">, </span>Max {{templateParameter.paramAttr.maxValue_}})
    </span>
  </span>
</template>

<script>
import { util } from '@/shared/utils/util'
import { common } from '@/shared/utils/common'

export default {
  props: {
    templateParameter: {
      type: Object
    }
  },
  methods: {
    numberOnlyEvent: util.numberOnlyEvent,
    checkNumberCommas: common.checkNumberCommas
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/settings.scss";

input {
  background-color: $color-initial;
}
</style>
