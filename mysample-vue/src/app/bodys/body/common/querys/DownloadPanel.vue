<template>
  <div class="container">
    <div class="row">
      <div class="column column-90 info">
        <icon class="warning" name="exclamation-circle"></icon>
        <span class="msg">In Result View, max 1,000 rows can be displayed. Please download to get all the results.</span>
      </div>
      <div class="column column-10">
        <button class="button button-outline" @click.prevent="saveCsv">CSV</button>
      </div>
    </div>
  </div>
</template>

<script>
import Icon from 'vue-awesome/components/Icon.vue'
import { mapState } from 'vuex'
import 'vue-awesome/icons/exclamation-circle'

export default {
  computed: {
    // ...mapState(['runningQueryKey'])
    ...mapState({
      runningQueryKey: state => state.query.runningQueryKey
    })
  },
  methods: {
    saveCsv () {
      window.location.href = `/v1/download/${this.runningQueryKey}`
    }
  },
  components: {
    Icon
  }
}
</script>

<style lang="scss" scoped>
.container {
  max-width: 100%;
  margin: 0;
  padding: 0;
  text-align: right;
}

.row {
  line-height: 1.8rem;
  flex-direction: inherit;
}

.button {
  font-size: 1rem;
  width: 5rem;
  padding: 0;
  height: 2rem;
  line-height: 1.8rem;
}

.info {
  text-align: left;
  font-size: 1.4rem;
}

.warning {
  color: gray;
  position: relative;
  top: 0.3rem;
}

.msg {
  margin-left: 0.5rem;
  color: gray;
}

.fa-icon {
  width: auto;
}
</style>
