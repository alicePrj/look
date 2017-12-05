<template>
  <div class="mb-5">
    <h6>사용 UI</h6>
    <div class="px-5">
      <img src="~@/assets/images/sample-image/database.png" alt="database" v-if="paramaterType === 'database'">
      <img src="~@/assets/images/sample-image/int.png" alt="int" v-if="paramaterType === 'int'">
      <img src="~@/assets/images/sample-image/string.png" alt="string" v-if="paramaterType === 'string'">
      <img src="~@/assets/images/sample-image/start_int~end_int.png" alt="start_int~end_int" v-if="paramaterType === 'start_int~end_int'">
      <img src="~@/assets/images/sample-image/yn.png" alt="yn" v-if="paramaterType === 'yn'">
      <img src="~@/assets/images/sample-image/inequality.png" alt="inequality" v-if="paramaterType === 'inequality'">
      <img src="~@/assets/images/sample-image/order.png" alt="order" v-if="paramaterType === 'order'">
      <img src="~@/assets/images/sample-image/country.png" alt="country" v-if="paramaterType === 'country'">
      <img src="~@/assets/images/sample-image/os.png" alt="os" v-if="paramaterType === 'os'">
      <img src="~@/assets/images/sample-image/login_type.png" alt="login_type" v-if="paramaterType === 'login_type'">
      <img src="~@/assets/images/sample-image/update_table.png" alt="update_table" v-if="paramaterType === 'update_table'">
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
