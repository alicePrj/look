<template>
  <div class="row title">
    <h5>{{ title }}</h5>
    <div class="close" @click="$emit('close')">X</div>
  </div>
</template>

<script>
  export default {
    props: ['title']
  }
</script>

<style scoped>
  div.row.title {
    padding-left: 2rem;
    padding-top: 1rem;
    padding-bottom: 1rem;
    margin-bottom: 2rem;
    border-bottom: 1px solid #d3d3d3;
    position: relative;
  }

  div.row.title h5 {
    margin-bottom: 0;
    font-weight: 500;
  }

  div.row.title div.close {
    position: absolute;
    right: 2rem;
    top: 1rem;
    font-size: 2rem;
    font-weight: 300;
    cursor: pointer;
  }
</style>
