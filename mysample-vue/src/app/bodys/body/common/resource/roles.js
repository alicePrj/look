import { http } from '@/shared/utils/httpaxios'

export default {
  getRoles () {
    return http.getPromise('/roles/list').then(res => res.data.result)
  },
  createDBRole (database, isGameDB) {
    return http.postPromise('/roles/db/create', {
      database: database,
      isGameDB: isGameDB
    }).then(res => res.data.result)
  },
  createRoles (viewName, dbList) {
    return http.postPromise('/roles/create', {
      viewName: viewName,
      databaseList: dbList
    }).then(res => res.data.result)
  },
  deleteRole (roleName) {
    return http.postPromise('/roles/delete', {
      roleName: roleName
    }).then(res => res.data.result)
  },
  deleteDBRole (dbName) {
    return http.postPromise('/roles/db/delete', {
      database: dbName
    }).then(res => res.data.result)
  }
}
