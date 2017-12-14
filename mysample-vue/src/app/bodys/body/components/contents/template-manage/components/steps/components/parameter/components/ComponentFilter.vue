<template>
  <div class="mb-5">
    <h6 class="mb-0">More Option (Filter) 여부 *</h6>
    <p class="px-5 mb-4 p-description-color">※ User가 선택해야 하는 필수 조건이 아닐 경우에는 More Option으로 지정해 주세요.</p>
    <div class="px-5">
      <toggle-button :value="false" color="#428BCA" style="font-size:1.1rem; text-transform:uppercase" :width="64" :height="30" :sync="true" :labels="true" v-model="templateParameter.paramAttr.moreOption"></toggle-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    templateParameter: {
      type: Object
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/settings.scss";
</style>
