import { http } from '@/shared/utils/httpaxios'
import { resource } from '@/shared/utils/resource'

export const queryModule = {
  state: {
    isAdminUser: false,
    isQueryRunning: false,
    runningQueryKey: localStorage.getItem('runningQueryKey') ? localStorage.getItem('runningQueryKey') : '',
    inputQuery:
`--test query
SELECT * FROM oap_real_hbaccess WHERE dt='20170428' limit 100`,
    lastRunQuery: localStorage.getItem('lastRunQuery') ? localStorage.getItem('lastRunQuery') : 'No query executed',
    queryHistory: [],
    queryResult: localStorage.getItem('queryResult') ? JSON.parse(localStorage.getItem('queryResult')) : {
      /*
        columns: [],
        list: []
       */
    },
    selectedDb: '',
    dbInfo: {
      /*
        dbName: {
          tableName: {
            "showColumns": false(default),
            "columns": [
              {
                "name": columnName,
                "type": columnType
              }
                ...
            ]
          }
          ...
        }
       */
    },
    isTempTabSelected: false,
    tempTableInfo: {}
  },
  mutations: {
    setAdminUser (state, isAdmin) {
      state.isAdminUser = isAdmin
    },
    setQueryRunning (state, isRunning) {
      state.isQueryRunning = isRunning
    },
    setRunningQueryKey (state, qkey) {
      state.runningQueryKey = qkey
    },
    changeInputQuery (state, query) {
      state.inputQuery = query
    },
    updateRunQuery (state, query) {
      state.lastRunQuery = query
    },
    loadQueryHistory (state, queryHistory) {
      state.queryHistory = queryHistory
    },
    setQueryResult (state, result) {
      state.queryResult = result
    },
    databaseChanged (state, db) {
      console.log(state, db)
      state.selectedDb = db
    },
    toggleTempDb (state) {
      state.isTempDb = !state.isTempDb
    },
    setDbInfo (state, dbInfo) {
      state.dbInfo = dbInfo
    },
    setTableInfo (state, {db, tableInfo}) {
      state.dbInfo[db] = tableInfo
    },
    setTempTableInfo (state, tableInfo) {
      state.tempTableInfo = tableInfo
    },
    setColumns (state, {db, table, columns}) {
      state.dbInfo[db][table].columns = columns
    },
    setTempColumns (state, { table, columns }) {
      state.tempTableInfo[table].columns = columns
    },
    setTempTabSelected (state, isTempTabSelected) {
      state.isTempTabSelected = isTempTabSelected
    }
  },
  getters: {
    inputQuery (state) {
      return state.inputQuery
    },
    slicedResult: (state) => (count) => {
      if (count < 0) return state.queryResult
      else return state.queryResult.slice(0, count)
    },
    sortedQueryHistory: (state) => {
      return state.queryHistory.sort((a, b) => b.starttime - a.starttime)
    },
    resultColumns (state) {
      if (!state.queryResult.list) return []
      else if (state.queryResult.columns) return state.queryResult.columns
      else return Object.keys(state.queryResult.list[0])
    },
    dbNames (state) {
      return Object.keys(state.dbInfo)
    }
  },
  actions: {
    databaseChanged ({ commit }, db) {
      commit('databaseChanged', db)
    },
    toggleTempDb ({ dispatch, commit, state }) {
      if (!state.isTempDb) {
        commit('loadDatabases', [])
        commit('databaseChanged', '')
      } else {
        dispatch('loadDatabases')
      }

      commit('toggleTempDb')
    },
    loadDb ({ commit }) {
      http.getPromise('/databases').then(res => {
        let dbNames = res.data.result
        let dbInfo = {}
        dbNames.forEach(dbName => {
          dbInfo[dbName] = {}
        })
        commit('setDbInfo', dbInfo)
        commit('databaseChanged', dbNames[0])
      })
    },
    loadTables ({ commit }, dbName) {
      resource.loadTables(dbName).then(tableNames => {
        let tableInfo = {}
        tableNames.forEach(tableName => {
          tableInfo[tableName] = {
            showColumns: false,
            columns: []
          }
        })
        commit('setTableInfo', {db: dbName, tableInfo: tableInfo})
      })
    },
    loadColumns ({ commit }, { db, table }) {
      resource.loadColumns(db, table).then(columns => {
        let payload = {
          db: db,
          table: table,
          columns: columns
        }
        commit('setColumns', payload)
      })
    },
    loadTempTables ({ commit }) {
      resource.loadTempTables().then(tempTables => {
        let tableInfo = {}
        tempTables.forEach(tableName => {
          tableInfo[tableName] = {
            showColumns: false,
            columns: []
          }
        })
        commit('setTempTableInfo', tableInfo)
      })
    },
    loadTempColumns ({ commit }, { table }) {
      resource.loadTempColumns(table).then(columns => {
        let payload = {
          table: table,
          columns: columns
        }
        commit('setTempColumns', payload)
      })
    },
    loadQueryHistory ({ commit }, isAdmin) {
      http.getPromise('/queryHistory', {isAdmin: isAdmin}).then(res => {
        commit('loadQueryHistory', res.data.result)
      })
    }
  }
}
