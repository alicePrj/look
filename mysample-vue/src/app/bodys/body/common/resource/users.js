import { http } from '@/shared/utils/httpaxios'

const ITEM_PER_PAGE = 15

export default {
  getUsersByPage (searchKey = '', page = 1) {
    let param = {
      keyword: searchKey,
      page: page,
      size: ITEM_PER_PAGE
    }
    return http.getPromise('/users/list', param).then(res => res.data.result)
  },
  searchUser (email, isInternal) {
    let param = {
      keyword: email,
      isInternal: isInternal
    }
    return http.getPromise('/users/search', param).then(res => res.data.result)
  },
  addUser ({ userKey, email, staffId, companyId, internalUser: isInternal }) {
    const param = {
      userKey: userKey,
      email: email,
      staffId: staffId,
      companyId: companyId,
      isInternal: isInternal
    }

    return http.postPromise('/users/add', param).then(res => res.data.result)
  },
  deleteUser ({id: uid, userKey}) {
    const body = {
      uid: uid,
      userKey: userKey
    }

    return http.postPromise('/users/delete', body).then(res => res.data.result)
  },
  getUserWithRoles (userId) {
    return http.getPromise(`/roles/user/${userId}`).then(res => res.data.result)
  },
  updateUserRoles (userId, addedRoles, removedRoles) {
    return http.postPromise('/roles/update', {
      userId: userId,
      addRoles: addedRoles,
      removeRoles: removedRoles
    }).then(res => res.data.result)
  }
}
