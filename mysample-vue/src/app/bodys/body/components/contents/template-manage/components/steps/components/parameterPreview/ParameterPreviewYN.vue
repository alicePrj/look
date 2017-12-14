<template>
  <span>
    <span class="mr-5 pr-5">
      <input type="radio" class="mb-0" title="ynAll" id="ynAll" value="Y,N" v-model="templateParameter.paramAttribute.ynValue">
      <label class="normalLabel" for="ynAll">{{getAllName()}}</label>
    </span>
    <span class="mx-5 px-5">
      <input type="radio" class="mb-0" title="ynY" id="ynY" value="Y" v-model="templateParameter.paramAttribute.ynValue">
      <label class="normalLabel" for="ynY">{{getYName()}}</label>
    </span>
    <span class="ml-5 pl-5">
      <input type="radio" class="mb-0" title="ynN" id="ynN" value="N" v-model="templateParameter.paramAttribute.ynValue">
      <label class="normalLabel" for="ynN">{{getNName()}}</label>
    </span>
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
    getAllName () {
      if (this.lang === 'KR' && this.templateParameter.paramAttr['Y,N'].KR) {
        return this.templateParameter.paramAttr['Y,N'].KR
      } else if (this.lang === 'JP' && this.templateParameter.paramAttr['Y,N'].JP) {
        return this.templateParameter.paramAttr['Y,N'].JP
      } else {
        return this.templateParameter.paramAttr['Y,N'].EN
      }
    },
    getYName () {
      if (this.lang === 'KR' && this.templateParameter.paramAttr['Y'].KR) {
        return this.templateParameter.paramAttr['Y'].KR
      } else if (this.lang === 'JP' && this.templateParameter.paramAttr['Y'].JP) {
        return this.templateParameter.paramAttr['Y'].JP
      } else {
        return this.templateParameter.paramAttr['Y'].EN
      }
    },
    getNName () {
      if (this.lang === 'KR' && this.templateParameter.paramAttr['N'].KR) {
        return this.templateParameter.paramAttr['N'].KR
      } else if (this.lang === 'JP' && this.templateParameter.paramAttr['N'].JP) {
        return this.templateParameter.paramAttr['N'].JP
      } else {
        return this.templateParameter.paramAttr['N'].EN
      }
    }
  },
  mounted () {
    if (!this.templateParameter.paramAttribute.ynValue) {
      document.getElementById('ynAll').click()
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/settings.scss";
</style>
