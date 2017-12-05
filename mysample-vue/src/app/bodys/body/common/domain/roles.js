export { DBRole, TableRole }

class DBRole {
  constructor ({databaseRoleName, roles, gameDb}) {
    this.databaseRoleName = databaseRoleName
    this.roles = roles.map(i => new TableRole(i))
    this.gameDb = gameDb
  }
}

class TableRole {
  constructor ({tableRoleName, checked, deletable}) {
    this.tableRoleName = tableRoleName
    this.checked = checked
    this.deletable = deletable
  }
}
