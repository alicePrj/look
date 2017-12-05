<template>
  <div class="container">
    <div v-if="isQueryRunning">
      <h4 class="placeholder">Query Running.... <icon class="spinner" name="spinner" spin></icon></h4>
    </div>
    <div v-else>
      <div class="column" v-if="result.length > 0" style="margin-top: 1.5rem;">
        <div class="row">
          <download-panel v-if="!isDMLResult"></download-panel>
        </div>
        <div class="row">
          <div ref="bound" class="column">
            <table @scroll="scrollEvent">
              <thead ref="head" style="width: 100%;">
              <tr>
                <th></th>
                <th :style="{ width: (100 / resultColumns.length) + '%' }" v-for="column in resultColumns">{{ column }}</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(item, idx) in slicedResult" :class="{background: idx % 2 == 0}">
                <td>{{ idx }}</td>
                <td v-for="column in resultColumns">{{ item[column] }}</td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="row" v-else>
        <h4 class="placeholder">No result to show.</h4>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import DownloadPanel from './DownloadPanel.vue'
import Icon from 'vue-awesome/components/Icon.vue'
import 'vue-awesome/icons/spinner'

export default {
  data () {
    let numOfShowMore = 50
    return {
      numOfShowMore: numOfShowMore,
      showCnt: numOfShowMore
    }
  },
  computed: {
    // ...mapState(['isQueryRunning', 'queryResult']),
    ...mapState({
      isQueryRunning: state => state.query.isQueryRunning,
      queryResult: state => state.query.queryResult
    }),
    ...mapGetters(['resultColumns']),
    result () {
      return this.queryResult.list ? this.queryResult.list : []
    },
    slicedResult () {
      return this.result.slice(0, this.showCnt)
    },
    isDMLResult () {
      /*
        [{ "result" : "success" }]
        This format is settlement between server and client when the query was DML
      */
      return this.queryResult.list && this.queryResult.list[0].result === 'success'
    }
  },
  watch: {
    result (newResult) {
      this.showCnt = this.numOfShowMore
    }
  },
  methods: {
    scrollEvent (event) {
      let target = event.target

      /* Fix header always on top */
      let translate = 'translate(0,' + event.target.scrollTop + 'px)'
      this.$refs.head.style.transform = translate

      if (target.scrollHeight <= target.clientHeight + target.scrollTop) {
        this.showCnt += this.numOfShowMore
      }
    }
  },
  components: {
    DownloadPanel,
    Icon
  }
}
</script>

<style lang="scss" scoped>
.container {
  padding-left: 0;
  padding-right: 0;
}

.spinner {
  position: relative;
  top: 0.3rem;
}

table {
  font-size: 1.2rem;
  display: block;
  table-layout: fixed;
  min-width: 100%;
  max-height: 60rem;
  overflow-x: auto;
  overflow-y: auto;
}

thead {
  /* Disable transparency for fixed header */
  background-color: white;
}

th, td {
  line-height: 0.05;
  padding-left: 0;
}

td {
  white-space: nowrap;
}

td:first-child {
  padding-left: 1rem;
}

td:last-child {
  padding-right: 1rem;
}

.background {
  background-color: #f5f6f7;
}

.placeholder {
  margin: 0 auto;
  margin-top: 5rem;
}
</style>
