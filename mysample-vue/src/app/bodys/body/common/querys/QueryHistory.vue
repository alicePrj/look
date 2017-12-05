<template>
  <div class="container">
    <div class="row" v-if="sortedQueryHistory.length > 0">
      <table @scroll="paging">
        <thead ref="head">
          <tr>
            <th></th>
            <th>Timestamp</th>
            <th style="min-width: 60rem;">Query</th>
            <th>State</th>
            <th>Elapsed Time (s)</th>
            <th v-if="isAdmin">User</th>
            <th>Control</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(queryInfo, idx) in slicedQueryHistory" :key="queryInfo.qid" :class="{background: idx % 2 == 0}">
            <td style="padding-left: 1rem;">{{ idx + 1 }}</td>
            <td>{{ unixtimeToDate(queryInfo.starttime) }}</td>
            <td><code :title="queryInfo.query">{{ reduceStr(queryInfo.query) }}</code></td>
            <td>{{ queryInfo.state }}</td>
            <td>{{ Math.ceil(queryInfo.runtime / 1000) }}</td>
            <td v-if="isAdmin">{{ queryInfo.owner }}</td>
            <td>
              <a v-if="queryInfo.state === 'SUCCEEDED'"
                 href="#"
                 @click.prevent="useQuery(queryInfo.query)">Use Query</a>
              <a v-if="queryInfo.state === 'RUNNING'"
                 class="kill button"
                 :class="{deactivated: killDeactivated}"
                 href="#"
                 @click.prevnet="stopQuery(queryInfo.qkey)">cancel</a>
              <span class="inline-block-center" v-if="queryInfo.state === 'STOP' || queryInfo.state === 'FAILED' || queryInfo.state === 'ADMIN_KILLED' || queryInfo.state === 'KILLED'">{{ queryInfo.errMsg }}<span v-if="isAdmin && queryInfo.state ==='ADMIN_KILLED'"><br>({{ queryInfo.stopper }})</span></span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="row" v-else>
      <h3>No recent queries</h3>
    </div>
  </div>
</template>

<script>
import { queryEventBus } from '@/shared/events/QueryEventBus'
import { mapGetters } from 'vuex'
import { util } from '@/shared/utils/util'

export default {
  props: {
    isAdmin: {
      type: Boolean,
      default () {
        return false
      }
    }
  },
  data () {
    let numOfShowMore = 20
    return {
      strLimit: 200,
      showCnt: numOfShowMore,
      numOfShowMore: numOfShowMore,
      killDeactivated: false
    }
  },
  computed: {
    ...mapGetters(['sortedQueryHistory']),
    slicedQueryHistory () {
      return this.sortedQueryHistory.slice(0, this.showCnt)
    }
  },
  methods: {
    useQuery (query) {
      queryEventBus.inputQueryChanged(query)
    },
    reduceStr (str) {
      if (str.length < this.strLimit) return str
      else return str.slice(0, this.strLimit) + '...'
    },
    paging (event) {
      let target = event.target

      /* Fix header always on top */
      let translate = 'translate(0,' + event.target.scrollTop + 'px)'
      this.$refs.head.style.transform = translate

      if (target.scrollHeight <= target.clientHeight + target.scrollTop) {
        this.showCnt += this.numOfShowMore
      }
    },
    unixtimeToDate (unixtime) {
      return util.unixtimeToDate(unixtime)
    },
    stopQuery (qkey) {
      if (this.killDeactivated) return
      this.$http.postPromise('/stopQuery', { qkey: qkey, isAdmin: this.isAdmin }).then(res => {
        let isSuccess = res.data.result

        if (isSuccess) {
          alert('The query was successfully killed!')
        } else {
          alert('Query cannot be killed. Try again later.')
        }
        this.$router.go({path: this.$router.path})
      })

      this.killDeactivated = true
    }
  },
  created () {
    this.$store.dispatch('loadQueryHistory', this.isAdmin)

    queryEventBus.$on('queryCanceled', () => {
      this.$store.dispatch('loadQueryHistory', this.isAdmin)
    })
  }
}
</script>

<style lang="scss" scoped>
  @import "~@/assets/styles/settings.scss";
  $th-width: percentage(100 / (6 * 100));

  table {
    // width: 100%;
    width: calc(100vw - 22rem);
    display: block;
    max-height: 60rem;
    overflow-x: auto;
    overflow-y: auto;
    font-size: 1.4rem;
  }

  thead {
    background-color: white;
  }

  td, th {
    white-space: nowrap;
    line-height: 2rem;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    text-align: left;
    width: $th-width;
  }

  td:last-child, th:last-child {
    padding-right: 1.5rem;
  }

  input.button {
    height: 0.5rem;
    line-height: 0.5rem;
  }

  code {
    color: rgba(207, 38, 89, 1);
    background-color: #ebecf0;
    border: 1px solid #dcd5dc;
    white-space: normal;
    line-height: 2;
  }

  a.button.kill {
    margin-bottom: 0;
    height: 2.2rem;
    line-height: 2.2rem;
    border-color: orangered;
    background-color: orangered;
  }

  span.inline-block-center {
    display: inline-block;
    text-align: center;
  }
</style>
