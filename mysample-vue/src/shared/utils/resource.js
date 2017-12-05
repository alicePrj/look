import { http } from './httpaxios'

export const resource = {
  columnMapper (res) {
    let result = res.data.result
    return result.map(columnInfo => {
      return {
        name: columnInfo.col_name,
        type: columnInfo.data_type
      }
    })
  },
  loadColumns (db, table) {
    let body = {
      database: db,
      table: table
    }
    return http.postPromise('/columns', body).then(resource.columnMapper)
  },
  loadTempColumns (table) {
    return http.postPromise('/tempColumns', { table: table }).then(resource.columnMapper)
  },
  loadTables (db) {
    let body = {
      database: db
    }
    return http.postPromise('/tables', body).then(res => res.data.result)
  },
  loadTempTables () {
    let body = {
      database: ''
    }
    return http.postPromise('/tempTables', body).then(res => res.data.result)
  }
}
