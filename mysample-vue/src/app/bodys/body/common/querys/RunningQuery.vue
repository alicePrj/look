<template>
  <pre><code>{{ query }}</code></pre>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      lastRunQuery: state => state.query.lastRunQuery
    }),
    query () {
      return this.lastRunQuery
    }
  }
}
</script>

<style scoped>
code {
  text-align: left;
  padding-top: 5rem;
  padding-bottom: 5rem;
  padding-left: 5rem;
}
</style>
