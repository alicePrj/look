<template>
  <div>
    <textarea id="queryeditor"></textarea>
    <error-panel v-if="errorMsg" :errorMsg="errorMsg"></error-panel>
    <div>
      <a ref="runBtn" href="#" class="button run" @click.prevent="executeQuery" v-if="!isQueryRunning">Run</a>
      <a ref="runBtn" href="#" class="button cancel" :class="{ deactivated: cancelDeactivated }" @click.prevent="cancelQuery" v-else>Cancel</a>
    </div>
  </div>
</template>

<script>
import CodeMirror from 'codemirror'
import Axios from 'axios'
import { axios } from '@/shared/utils/httpaxios'
require('codemirror/mode/sql/sql')
require('codemirror/lib/codemirror.css')
require('promise.prototype.finally').shim()

import { queryEventBus } from '@/shared/events/QueryEventBus'
import QueryErrorPanel from './QueryErrorPanel.vue'
import { mapState, mapMutations } from 'vuex'

import { util } from '@/shared/utils/util'
import md5 from 'blueimp-md5'

export default {
  props: ['redirectOnRun'],
  data () {
    return {
      runningQuery: '',
      editor: null,
      errorMsg: null,
      cancelDeactivated: false,
      cancelSource: null
    }
  },
  computed: {
    // ...mapState(['isQueryRunning', 'runningQueryKey', 'selectedDb', 'isTempTabSelected']),
    ...mapState({
      isQueryRunning: state => state.query.isQueryRunning,
      runningQueryKey: state => state.query.runningQueryKey,
      selectedDb: state => state.query.selectedDb,
      isTempTabSelected: state => state.query.isTempTabSelected
    }),
    query () {
      return this.$store.getters.inputQuery
    },
    selectedQuery () {
      if (!this.editor) return ''
      else {
        if (this.editor.somethingSelected()) return this.editor.getSelection()
        else return this.query
      }
    }
  },
  methods: {
    ...mapMutations(['setQueryRunning', 'setRunningQueryKey']),
    createEditor () {
      let queryTextArea = document.getElementById('queryeditor')
      this.editor = CodeMirror.fromTextArea(queryTextArea, {
        lineNumbers: true,
        mode: 'text/x-hive',
        autofocus: true,
        lineWrapping: true
      })
      // Set initial query text on editor
      this.editor.setValue(this.query)
      this.editor.setCursor(this.query.length)

      this.editor.on('changes', this.queryChanged)

      // Map 'tab' key to move focus on 'run' button
      let vm = this
      this.editor.setOption('extraKeys', {
        Tab: cm => vm.$refs.runBtn.focus()
      })
    },
    queryChanged (cm, aChanges) {
      this.$store.commit('changeInputQuery', cm.getValue())
    },
    executeQuery () {
      this.runningQuery = this.selectedQuery
      let runningQueryKey = md5(util.generateUUID() + Date.now().toString())
      this.setRunningQueryKey(runningQueryKey)
      localStorage.setItem('runningQueryKey', runningQueryKey)

      this.$store.commit('updateRunQuery', this.runningQuery)
      localStorage.setItem('lastRunQuery', this.runningQuery)

      this.$store.commit('setQueryResult', {})
      localStorage.removeItem('queryResult')

      let db = this.isTempTabSelected ? '@mytemp' : this.selectedDb

      let CancelToken = Axios.CancelToken
      let source = CancelToken.source()
      this.cancelSource = source

      axios.post('/query', {
        sql: this.runningQuery,
        database: db,
        qkey: this.runningQueryKey
      }, { cancelToken: source.token }).then(res => {
        if (res.data.error) {
          throw Error(res.data.error.message)
        } else {
          let result = res.data.result
          this.$store.commit('setQueryResult', result)
          queryEventBus.queryResultReceived()
          localStorage.setItem('queryResult', JSON.stringify(result))
          this.errorMsg = null
        }
      }).catch(err => {
        let errMsg = err.message
        if (Axios.isCancel(err)) {
          errMsg = 'Query Canceled'
        }

        this.errorMsg = errMsg
      }).finally(() => {
        this.setQueryRunning(false)
        this.$refs.runBtn.blur()
      })

      this.errorMsg = null
      this.setQueryRunning(true)
      if (this.redirectOnRun) this.$router.push(this.redirectOnRun)
    },
    cancelQuery () {
      if (this.cancleDeactivated) {
        return
      }

      let token = this.cancelSource ? this.cancelSource.token : null
      axios.post('/stopQuery', { qkey: this.runningQueryKey }, { cancelToken: token }).then(res => {
        // fire and forget
      })

      this.cancelDeactivated = true
      setTimeout(() => {
        this.cancelDeactivated = false
        this.cancelSource.cancel(this.runningQuery)

        queryEventBus.queryCanceled()
      }, 1000)
    }
  },
  mounted () {
    this.createEditor()
    let vm = this
    queryEventBus.$on('inputQueryChanged', query => {
      vm.$nextTick(() => { vm.editor.setValue(query) })
    })
  },
  components: {
    errorPanel: QueryErrorPanel
  }
}
</script>

<style>
.CodeMirror {
  width: 100%;
  border: 1px solid lightgray;
  text-align: left;
  cursor: text;
}
</style>

<style lang="scss" scoped>
@import "~@/assets/styles/settings.scss";

.button {
  margin-top: 30px;
  font-size: 1.5rem;
}
.cancel {
  margin-top: 30px;
  background-color: red;
  border-color: red;
}
</style>
