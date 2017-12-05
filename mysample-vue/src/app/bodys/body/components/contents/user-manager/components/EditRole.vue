<template>
  <div class="popup-container">
    <div class="popup-middle-container">
      <div class="edit-role center-popup viewport-scroll">
        <popup-header title="Edit Role" @close="close()"></popup-header>
        <div class="row">
          <div class="column column-20 label">ID</div>
          <div class="column column-input">{{ userWithRoles.userId }}</div>
        </div>
        <div class="row">
          <div class="column column-20 label">Name</div>
          <div class="column column-input">{{ userWithRoles.userName }}</div>
        </div>
        <div class="row">
          <div class="column column-20 label">Company</div>
          <div class="column column-input">{{ userWithRoles.companyName }}</div>
        </div>
        <div class="row">
          <div class="column column-20 label">Last Editor</div>
          <div class="column column-input">{{ userWithRoles.lastEditorName }} ({{ userWithRoles.editDate }})</div>
        </div>
        <hr>
        <!--
          Step 1: Select roles to edit
        -->
        <div class="el-group" v-show="step == 0">
          <div v-if="editUser.internalUser">
            <div class="row role-radio">
              <div class="column column-50"><input type="radio" v-model="category" name="roleSelected" :value="COMMON_USER">Common user (No root role)</div>
              <div class="column column-50"><input type="radio" v-model="category" name="roleSelected" :value="ALL_VIEW">allgame.allview.read</div>
            </div>
            <div class="row role-radio">
              <div class="column column-50"><input type="radio" v-model="category" name="roleSelected" :value="ALL_TBL_ALL">alldb.alltbl.all + tempdb.alltbl.all</div>
              <div class="column column-50"><input type="radio" v-model="category" name="roleSelected" :value="ALL_TBL_READ">alldb.alltbl.read</div>
            </div>
            <hr>
          </div>
          <div class="row search">
            <div class="column column-15 label">Search</div>
            <div class="column column-input">
              <input type="text" v-model="searchKeyword" :disabled="searchDisabled" :class="{'search-disabled': searchDisabled}">
              <div class="search-icon-wrap">
                <icon class="search-icon" name="search" scale="1" @click.native=""></icon>
              </div>
            </div>
          </div>
          <div class="row role-list-wrap">
            <div class="role-list margin-auto rounding-corner" :class="{'search-disabled': searchDisabled}">
              <ul v-if="searchKeyword.length == 0" class="role-group-list">
                <li v-for="dbRole in displayRoles" class="role-group-item arrow-right">
                  <span>{{ dbRole.databaseRoleName }}</span>
                  <ul class="role-name-list">
                    <li v-for="tblRole in dbRole.roles" class="role-name-item">
                      <input type="checkbox" :id="tblRole.tableRoleName" :value="tblRole.tableRoleName" v-model="afterCheckedRoles" :class="{'search-disabled': searchDisabled}" :disabled="searchDisabled">
                      <label :for="tblRole.tableRoleName" class="label-inline">{{ tblRole.tableRoleName }}</label>
                    </li>
                  </ul>
                </li>
              </ul>
              <ul class="found-roles role-name-list" v-else>
                <li v-for="tblRole in foundRoles" class="role-name-item">
                  <input type="checkbox" :id="tblRole.tableRoleName" :value="tblRole.tableRoleName" v-model="afterCheckedRoles" :class="{'search-disabled': searchDisabled}" :disabled="searchDisabled">
                  <label :for="tblRole.tableRoleName" class="label-inline">{{ tblRole.tableRoleName }}</label>
                </li>
              </ul>
            </div>
          </div>
          <div class="row buttons">
            <div class="button-wrap margin-auto">
              <button class="button button-outline" href="#" @click.prevent="close()">Close</button>
              <button class="button" @click.prevent="step = 1">Submit</button>
            </div>
          </div>
        </div>
        <!--
          Step 2: Check and submit
        -->
        <div class="el-group next-step" v-show="step == 1">
          <div class="row label">Selected Role</div>
          <div class="row">
            <div class="role-list margin-auto rounding-corner">
              <ul v-if="selectedRoles.length > 0" class="selected-roles">
                <li v-for="r in selectedRoles">{{ r }}</li>
              </ul>
              <span v-else>No roles have been selected.</span>
            </div>
          </div>
          <div class="row">Do you want grant selected roles to this user?</div>
          <div class="row buttons">
            <div class="button-wrap margin-auto">
              <button class="button button-outline" href="#" @click.prevent="step = 0">Back</button>
              <button class="button" @click.prevent="updateRoles(userWithRoles.userId)">Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import PopupHeader from '@/app/bodys/body/common/PopupHeader.vue'
  import Icon from 'vue-awesome/components/Icon.vue'
  import 'vue-awesome/icons/search'
  import User from '@/app/bodys/body/common/domain/User'
  import userResource from '@/app/bodys/body/common/resource/users'
  import { util } from '@/shared/utils/util'
  import _ from 'lodash'

  export default {
    props: {
      editUser: User
    },
    data () {
      return {
        /* constants */
        COMMON_USER: 'common',
        ALL_VIEW: 'allgame.allview.read',
        ALL_TBL_ALL: 'alldb.alltbl.all',
        ALL_TBL_READ: 'alldb.alltbl.read',
        ALL_SET: new Set(['allgame.allview.read', 'alldb.alltbl.all', 'alldb.alltbl.read']),
        /* constants end */
        category: 'common',
        userWithRoles: {},
        displayRoles: [],
        beforeCheckedRoles: [], // Should not be modified
        afterCheckedRoles: [],
        /*
            step number when edit role
            0 - check role
            1 - submit
        */
        step: 0,
        searchKeyword: ''
      }
    },
    computed: {
      searchDisabled () {
        return this.category !== this.COMMON_USER
      },
      foundRoles () {
        return _.flatMap(this.displayRoles.map(i => i.roles)).filter(i => i.tableRoleName.includes(this.searchKeyword.toLowerCase()))
      },
      selectedRoles () {
        if (this.category === this.COMMON_USER) return this.afterCheckedRoles.filter(i => !this.ALL_SET.has(i))
        else if (this.category === this.ALL_VIEW) return [this.ALL_VIEW]
        else if (this.category === this.ALL_TBL_ALL) return [this.ALL_TBL_ALL]
        else if (this.category === this.ALL_TBL_READ) return [this.ALL_TBL_READ]
        else return []
      }
    },
    methods: {
      extractRolesFromUser (user, tableRolesFilterFn = i => i) {
        return _.flatMap(user.allRoles.map(dbRole => dbRole.roles.filter(tableRolesFilterFn).map(i => i.tableRoleName)))
      },
      updateRoles (userId) {
        let added = []
        let removed = []

        if (this.category === this.COMMON_USER) {
          added = this.afterCheckedRoles.filter(r => !this.beforeCheckedRoles.includes(r))
          removed = this.beforeCheckedRoles.filter(r => !this.afterCheckedRoles.includes(r)).concat(Array.from(this.ALL_SET))
        } else {
          added = this.selectedRoles
          removed = this.extractRolesFromUser(this.userWithRoles, i => i.checked).filter(i => !this.selectedRoles.includes(i))
        }

        userResource.updateUserRoles(userId, added, removed).then(res => {
          if (res) {
            alert('Roles are successfully granted!')
            this.$emit('roleEdited')
          } else {
            throw new Error('Role cannot be updated. Contact administrators.')
          }
        }).catch(err => {
          alert(err)
        })
      },
      close () {
        this.$emit('closeEditRole')
      }
    },
    components: {
      Icon,
      PopupHeader
    },
    created () {
      userResource.getUserWithRoles(this.editUser.userId).then(data => {
        this.userWithRoles = new User(data)
        this.displayRoles = util.deepcopy(this.userWithRoles.allRoles).filter(i => i.databaseRoleName !== 'Root Role')
        this.beforeCheckedRoles = this.extractRolesFromUser(this.userWithRoles, i => i.checked)
        this.afterCheckedRoles = util.deepcopy(this.beforeCheckedRoles)  // copy array

        // It assumes that these three roles are exlcusive to each other
        for (const r of [this.ALL_VIEW, this.ALL_TBL_ALL, this.ALL_TBL_READ]) {
          if (this.userWithRoles.role.includes(r)) {
            this.category = r
            break
          }
        }
      })
    }
  }
</script>

<style lang="scss" scoped>
  @import "~@/assets/styles/settings.scss";

  .edit-role {
    width: 60rem;
    background-color: white;
  }

  .row, .column {
    width: 100%;
    margin-left: 0;
    margin-right: 0;
    margin-bottom: 0;
  }

  div.row {
    margin-bottom: 0.5rem;
  }

  div.column.label, div.column.column-input {
    text-align: left;
  }

  div.column.label {
    margin-left: 1rem;
    font-weight: 500;
  }

  hr {
    margin-top: 0;
    margin-bottom: 1rem;
  }

  /*
    Radio buttons
  */

  div.row.role-radio {
    text-align: left;
    font-size: 1.4rem;
  }

  input[type=radio] {
    margin-left: 1rem;
    margin-right: 1rem;
  }

  /*
      Search
   */
  div.row.search {
    margin-bottom: 1rem;
  }

  div.row.search > .column.label {
    line-height: 3.6rem;
  }

  div.row.search > .column.column-input {
    padding-right: 2rem;
  }

  div.row.search input[type=text] {
    margin-bottom: 0;
  }

  div.row.search div.column.column-input {
    position: relative;
    text-align: right;
  }

  div.row.search div.column.column-input div.search-icon-wrap {
    height: 0;
  }

  div.row.search div.column.column-input div.search-icon-wrap .search-icon {
    position: relative;
    top: -2.8rem;
    right: 1rem;
  }

  /*
      Role List
   */
  div.row.role-list-wrap {
    padding-left: 2rem;
    padding-right: 2rem;
    margin-bottom: 1rem;
  }

  div.role-list {
    border: 1px solid $border-color-primary;
    max-height: 30rem;
    width: 100%;
    overflow: auto;
    text-align: left;
    padding-left: 1rem;
  }

  ul.role-group-list, ul.role-name-list {
    list-style-type: none;
    margin-top: 0.5rem;
    margin-bottom: .5rem;
  }

  ul.role-group-list li.role-group-item {
    margin-bottom: 0;
  }

  ul.role-group-list li.role-group-item span {
    margin-left: 1rem;
  }

  ul.role-name-list {
    margin-top: 0;
    margin-bottom: 0;
    margin-left: 1.5rem;
  }

  ul.role-name-list li.role-name-item {
    margin-bottom: 0;
  }

  input[type=checkbox] {
    margin-bottom: 0;
  }

  /*
      Next Step
   */
  div.el-group.next-step div.row {
    padding-left: 2rem;
    padding-right: 2rem;
  }

  div.el-group.next-step div.row.label {
    font-weight: 500;
  }

  div.el-group.next-step ul.selected-roles {
    margin-top: 1rem;
    margin-bottom: 0;
  }

  /*
    Util
   */
  .search-disabled {
    background-color: #f5f5f5;
  }
</style>
