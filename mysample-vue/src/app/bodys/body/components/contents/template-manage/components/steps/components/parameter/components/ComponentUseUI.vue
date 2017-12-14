<template>
  <div class="mb-5">
    <h6>사용 UI</h6>
    <div class="px-5">
      <img src="~@/assets/images/sample-image/database.png" alt="database" v-if="paramaterType === 'database'">
      <img src="~@/assets/images/sample-image/int.png" alt="int" v-if="paramaterType === 'int'">
      <img src="~@/assets/images/sample-image/string.png" alt="string" v-if="paramaterType === 'string'">
      <img src="~@/assets/images/sample-image/startInt~endInt.png" alt="startInt~endInt" v-if="paramaterType === 'startInt~endInt'">
      <img src="~@/assets/images/sample-image/yn.png" alt="yn" v-if="paramaterType === 'yn'">
      <img src="~@/assets/images/sample-image/inequality.png" alt="inequality" v-if="paramaterType === 'inequality'">
      <img src="~@/assets/images/sample-image/order.png" alt="order" v-if="paramaterType === 'order'">
      <img src="~@/assets/images/sample-image/country.png" alt="country" v-if="paramaterType === 'country'">
      <img src="~@/assets/images/sample-image/os.png" alt="os" v-if="paramaterType === 'os'">
      <img src="~@/assets/images/sample-image/loginType.png" alt="loginType" v-if="paramaterType === 'loginType'">
      <img src="~@/assets/images/sample-image/uploadTable.png" alt="uploadTable" v-if="paramaterType === 'uploadTable'">
      <img src="~@/assets/images/sample-image/comment.png" alt="comment" v-if="paramaterType === 'comment'">
      <img src="~@/assets/images/sample-image/optionComment.png" alt="optionComment" v-if="paramaterType === 'optionComment'">
    </div>
  </div>
</template>

<script>
export default {
  props: {
    paramaterType: {
      type: String
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/settings.scss";
</style>
