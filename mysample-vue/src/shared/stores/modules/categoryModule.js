import { map, join } from 'lodash'
import { http } from '@/shared/utils/httpaxios'
import { util } from '@/shared/utils/util'
import * as types from '@/shared/stores/types'
import mockCategoryListGet from '@mock/category/CategoryListGet'
import mockCategoryGet from '@mock/category/CategoryGet'

export const categoryModule = {
  state: {
    _useMock: {
      [types.CATEGORY_LIST_GET]: false,
      [types.CATEGORY_GET]: false,
      [types.CATEGORY_SAVE]: false,
      [types.CATEGORY_DELETE]: false,
      [types.CATEGORY_ORDER]: false
    },
    _categoryList: {},
    _category: {}
  },
  mutations: {
    [types.CATEGORY_LIST_GET] (state, categoryList) {
      state._categoryList = categoryList
    },
    [types.CATEGORY_GET] (state, category) {
      state._category = category
    }
  },
  /* getters: {
    [types.CATEGORY_LIST_GET]: (state) => {
      return state._categoryList
    },
    [types.CATEGORY_GET]: (state) => {
      return state._category
    }
  }, */
  actions: {
    [types.CATEGORY_LIST_GET] ({ commit }) {
      const { state } = this._modules.root._children.category
      if (state._useMock[types.CATEGORY_LIST_GET]) {
        commit(types.CATEGORY_LIST_GET, mockCategoryListGet.result)
      } else {
        http.getPromise('/category/list').then(res => {
          commit(types.CATEGORY_LIST_GET, res.data.result)
        })
      }
    },
    [types.CATEGORY_GET] ({ commit }, categoryId) {
      const { state } = this._modules.root._children.category
      if (state._useMock[types.CATEGORY_GET]) {
        commit(types.CATEGORY_GET, mockCategoryGet.result)
      } else {
        http.getPromise('/category/' + categoryId).then(res => {
          commit(types.CATEGORY_GET, res.data.result)
        })
      }
    },
    [types.CATEGORY_SAVE] ({ ommit }, self) {
      const { state } = this._modules.root._children.category
      if (state._useMock[types.CATEGORY_SAVE]) {
        util.toastr().success('저장 배포 되었습니다.')
        self.$router.push({name: 'category-intro'})
      } else {
        const category = { ...self.category }
        if (!category.categoryDetails[0].categoryNm) {
          util.toastr().warning('Category 영문 이름을 입력해 주세요.')
          return
        }
        if (!category.categoryDetails[0].categoryContent) {
          util.toastr().warning('영문 Category Description을 입력해 주세요.')
          return
        }
        category.categoryDetail = category.categoryDetails
        const authLevels = []
        const spinner = util.spinner(self.spinnerId)
        if (self.permissions.Admin) authLevels[authLevels.length] = 'Admin'
        if (self.permissions.Wizard_Admin) authLevels[authLevels.length] = 'Wizard_Admin'
        if (self.permissions.LINE_Premium) authLevels[authLevels.length] = 'LINE_Premium'
        if (self.permissions.LINE_Common) authLevels[authLevels.length] = 'LINE_Common'
        if (self.permissions.Common) authLevels[authLevels.length] = 'Common'
        category.authLevel = join(authLevels, ',')
        http[category.categoryId === 0 ? 'postPromise' : 'putPromise']('/category', category).then(res => {
          spinner.stop()
          if (res.data && res.data.result) {
            util.toastr().success('저장 배포 되었습니다.')
            self.$router.push({name: 'category-intro'})
            self.$store.dispatch(types.CATEGORY_LIST_GET)
          } else {
            util.toastr().error('Unknown Exception')
          }
        })
      }
    },
    [types.CATEGORY_DELETE] ({ ommit }, self) {
      const { state } = this._modules.root._children.category
      if (state._useMock[types.CATEGORY_DELETE]) {
        util.toastr().success('삭제 되었습니다.')
        self.$router.push({name: 'category-intro'})
      } else {
        const spinner = util.spinner(self.spinnerId)
        http.deletePromise('/category/' + self.$route.params.categoryId).then(res => {
          spinner.stop()
          if (res.data) {
            if (res.data.result) {
              util.toastr().success('삭제 되었습니다.')
              self.$router.push({name: 'category-intro'})
              self.$store.dispatch(types.CATEGORY_LIST_GET)
            } else {
              util.toastr().error('Unknown Exception')
            }
          } else {
            util.toastr().error('Unknown Exception')
          }
        })
      }
    },
    [types.CATEGORY_ORDER] ({ ommit }, self) {
      const { state } = this._modules.root._children.category
      if (state._useMock[types.CATEGORY_ORDER]) {
        util.toastr().success('수정 배포 되었습니다.')
      } else {
        const newOrder = []
        map(self.orders, (order, key) => {
          newOrder[key] = {
            firstCategoryId: self.ordersFirstCategoryId,
            categoryId: order.categoryId,
            orderNum: key + 1
          }
        })
        const spinner = util.spinner(self.spinnerId)
        http.putPromise('/category/order', newOrder).then(res => {
          spinner.stop()
          if (res.data) {
            if (res.data.result) {
              util.toastr().success('수정 배포 되었습니다.')
              self.$store.dispatch(types.CATEGORY_LIST_GET)
            } else {
              util.toastr().error('Unknown Exception')
            }
          } else {
            util.toastr().error('Unknown Exception')
          }
        })
      }
    }
  }
}
