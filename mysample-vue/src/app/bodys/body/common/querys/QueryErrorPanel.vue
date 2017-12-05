<template>
  <p class="error-msg"> {{ errorMsg }}</p>
</template>

<script>
  export default {
    props: [ 'errorMsg' ]
  }
</script>

<style scoped>
  .error-msg {
    color: white;
    text-align: left;
    background-color: palevioletred;
    margin-top: 10px;
    padding-left: 10px;
  }
</style>
