import moment from 'moment'
import { DBRole } from './roles'

export default class User {
  constructor ({id, userId, userName, email, companyName, role, register, registerName, lastEditor, lastEditorName,
                 editDate, createDate, userKey, companyId, staffId, internalUser, probeUser, allRoles}) {
    this.id = id
    this.userId = userId
    this.userName = userName
    this.email = email
    this.companyName = companyName
    this.role = JSON.parse(role) // converts json string to array
    this.register = register
    this.registerName = registerName
    this.lastEditor = lastEditor
    this.lastEditorName = lastEditorName
    this._createDate = createDate
    this._editDate = editDate
    this.userKey = userKey
    this.companyId = companyId
    this.staffId = staffId
    this.internalUser = internalUser
    this.probeUser = probeUser
    if (allRoles) this.allRoles = allRoles.map(i => new DBRole(i))
  }

  get createDate () {
    return moment(this._createDate).format('YYYY-MM-DD HH:mm:ss')
  }

  get editDate () {
    return moment(this._editDate).format('YYYY-MM-DD HH:mm:ss')
  }
}
