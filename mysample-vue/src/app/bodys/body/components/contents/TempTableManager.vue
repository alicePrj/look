<template>
  <div>
    <query-panel></query-panel>
    <query-status :hidable="true"></query-status>
    <hr>
    <table class="template temp-manager">
      <thead>
        <tr>
          <th></th>
          <th :style="{width: (100 / 7) + '%'}">Creation Time</th>
          <th :style="{width: (100 / 7) + '%'}">Valid Time</th>
          <th :style="{width: (100 / 7) + '%'}">Table Size</th>
          <th :style="{width: (100 / 7) + '%'}">
            <span class="state-text">State <icon v-if="filterState !== 'All'" name="filter"></icon> </span>
            <select v-model="filterState" class="state-filter" name="" id="">
              <option value="All">All</option>
              <option v-for="state in stateSet">{{ state }}</option>
            </select>
          </th>
          <th :style="{width: (100 / 7) + '%'}">Table Name</th>
          <th :style="{width: (100 / 7) + '%'}">Creator</th>
          <th :style="{width: (100 / 7) + '%'}">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(data, idx) in filteredData" :class="{ background: idx % 2 == 0 }">
          <td>{{ idx }}</td>
          <td>{{ unixtimeToDate(data.createtime) }}</td>
          <td><span v-if="data.deletetime">{{ unixtimeToDate(data.deletetime) }}</span></td>
          <td></td>
          <td class="nowrap"><span class="inline-block-center">{{ data.state }}<span v-if="data.state === 'User Delete' || data.state === 'Admin Delete'"><br>({{ data.deleter }})</span></span></td>
          <td>{{ data.tbname }}</td>
          <td>{{ data.queryHistory.owner }}</td>
          <td><a v-if="endsWith(data.state)" href="#" @click.prevent="deleteTempTable(data.tbname, data.id)">Delete</a></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import QueryPanel from '@/app/bodys/body/common/querys/QueryPanel'
  import QueryStatus from '@/app/bodys/body/common/querys/QueryStatus'
  import { util } from '@/shared/utils/util'

  import Icon from 'vue-awesome/components/Icon.vue'
  import 'vue-awesome/icons/filter'

  export default {
    data () {
      return {
        filterState: 'All',
        columns: [
          'Creation Time',
          'Valid Time',
          'Table Size',
          'State',
          'Table Name',
          'Creator',
          'Action'
        ],
        result: []
      }
    },
    methods: {
      unixtimeToDate (unixtime) {
        return util.unixtimeToDate(unixtime)
      },
      deleteTempTable (tableName, historyId) {
        if (confirm(`Do you really want to delete table ${tableName}?`)) {
          let param = {
            id: historyId,
            type: 'ADMIN_DELETE'
          }
          this.$http.deletePromise('/userTable', param).then(res => {
            let isSuccess = res.data.result
            if (isSuccess) {
              alert(`Table ${tableName} is deleted!`)
            } else {
              return Error('Deletion Failed!\n')
            }
            this.$router.go({path: this.$router.path})
          }).catch(err => {
            alert(err)
          })
        }
      },
      endsWith (str) {
        return !str.toLowerCase().endsWith('delete')
      }
    },
    computed: {
      stateSet () {
        return Array.from(new Set(this.result.map(data => data.state)))
      },
      filteredData () {
        if (this.filterState === 'All') return this.result
        else return this.result.filter(data => data.state === this.filterState)
      }
    },
    components: {
      QueryPanel,
      QueryStatus,
      Icon
    },
    created () {
      this.$http.getPromise('/userTableHistory').then(res => {
        let result = res.data.result
        result.sort((a, b) => b.createtime - a.createtime)
        this.result = res.data.result
      })
    }
  }
</script>

<style lang="scss" scoped>
  @import "~@/assets/styles/settings.scss";

  .background {
    background-color: #f4f5f6;
  }

  th:first-child, td:first-child {
    padding-left: 1rem;
  }

  .nowrap {
    white-space: nowrap;
  }

  .state-text {
    margin-right: 1rem;
  }
  .state-filter {
    width: 0;
    height: 2rem;
    padding-left: 0;
    margin-bottom: 0;
  }

  span.inline-block-center {
    display: inline-block;
    text-align: center;
  }
</style>
