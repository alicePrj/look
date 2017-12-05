<template>
  <div class="container">
    <div class="row search">
      <div class="search-panel">
        <label for="search-box" class="float-left" style="line-height: 2.4;">Search</label>
        <span class="search-box-wrap">
          <input type="text" v-model="searchText" placeholder="Enter ID/name/Email" id="search-box" class="float-left" @keyup.enter="search(searchText)">
          <icon class="search-icon" name="search" scale="1" @click.native="search(searchText)"></icon>
        </span>
      </div>
      <div class="add-buttons">
        <a class="button add-staff" href="#" @click.prevent="showAddInternal = true">Add LINE Staff</a>
        <a class="button add-external" href="#" @click.prevent="showAddExternal = true">Add External User</a>
      </div>
    </div>
    <div class="row">
      <table>
        <thead>
          <tr>
            <th>Registered Time</th>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>
              <span>Company<icon v-if="companyFilter !== 'All'" name="filter"></icon></span>
              <select v-model="companyFilter" class="company-filter">
                <option value="All">All</option>
                <option v-for="company in companySet">{{ company }}</option>
              </select>
            </th>
            <th>Role</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in companyFilteredUsers">
            <td>{{ user.createDate }}</td>
            <td>{{ user.userId }}</td>
            <td>{{ user.userName }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.companyName }}</td>
            <td>
              <li class="overflow-ellipsis" style="margin-bottom: 0;" v-for="r in user.role">{{ r }}</li>
            </td>
            <td>
              <a class="button edit-role" href="#" @click.prevent="editRole(user)">Edit Role</a>
              <a class="button delete" href="#" @click.prevent="deleteUser(user)">Delete</a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="row pages-wrap">
      <div class="pages">
        <span
          v-for="i in totalPages"
          @click="jumpToPage(i)"
          :class="{ 'page-number': currentPage != i, 'current-page-number': currentPage == i }">{{ i }}</span>
      </div>
    </div>
    <div v-if="users.length == 0" class="row">
      <div>Not registered user</div>
    </div>
    <!-- popups -->
    <add-internal-user v-if="showAddInternal"
                       @closeAddInternal="showAddInternal = false"
                       @userAdded="popupCheckAccount($event)"></add-internal-user>
    <add-external-user v-if="showAddExternal"
                       @closeAddExternal="showAddExternal = false"
                       @userAdded="popupCheckAccount($event)"></add-external-user>
    <check-account v-if="showCheckAccount"
                   :addedUser="addedUser"
                   @closeCheckAccount="showCheckAccount = false"></check-account>
    <edit-role v-if="showEditRole"
               :editUser="editUser"
               @roleEdited="afterRoleEdited()"
               @closeEditRole="showEditRole = false"></edit-role>
    <del-account v-if="showDelAccount"
                 :delUser="delUser"
                 @closeDelAccount="showDelAccount = false"
                 @userDeleted="afterUserDeleted()"></del-account>
  </div>
</template>

<script>
  import Icon from 'vue-awesome/components/Icon.vue'
  import AddInternalUser from './components/AddInternalUser.vue'
  import AddExternalUser from './components/AddExternalUser.vue'
  import EditRole from './components/EditRole.vue'
  import DelAccount from './components/DeleteAccount.vue'
  import CheckAccount from './components/CheckAccount.vue'
  import 'vue-awesome/icons/search'
  import 'vue-awesome/icons/filter'
  import User from '@/app/bodys/body/common/domain/User'
  import userResource from '@/app/bodys/body/common/resource/users'

  export default {
    data () {
      return {
        users: [],
        // for pagination
        totalPages: 0,
        currentPage: 0,
        itemPerPage: 15,
        // for search
        searchText: '',
        companyFilter: 'All',
        // for popup control
        showAddInternal: false,
        showAddExternal: false,
        showEditRole: false,
        showDelAccount: false,
        showCheckAccount: false,
        // when user is added
        addedUser: {},
        // to delete user
        delUser: {},
        // to edit user
        editUser: {}
      }
    },
    computed: {
      companySet () {
        return Array.from(new Set(this.users.map(data => data.companyName)))
      },
      companyFilteredUsers () {
        if (this.companyFilter === 'All') return this.users
        else return this.users.filter(user => user.companyName === this.companyFilter)
      }
    },
    methods: {
      jumpToPage (pageNum) {
        this.loadUsers(pageNum, () => {
          this.currentPage = pageNum
        })
      },
      search (searchText) {
        userResource.getUsersByPage(searchText.toLowerCase()).then(data => {
          this.totalPages = data.totalPages
          this.currentPage = 1
          this.users = data.list.map(user => new User(user))
        })
      },
      popupCheckAccount (payload) {
        this.showAddInternal = false
        this.showAddExternal = false

        this.addedUser = new User(payload)

        this.showCheckAccount = true
        this.loadUsers()
      },
      loadUsers (page = 1, afterLoaded = () => {}) {
        userResource.getUsersByPage('', page).then(data => {
          this.totalPages = data.totalPages
          this.currentPage = page
          this.users = data.list.map(user => new User(user))
          afterLoaded()
        })
      },
      deleteUser (delUser) {
        this.delUser = delUser

        this.showDelAccount = true
      },
      afterUserDeleted () {
        this.showDelAccount = false
        this.loadUsers()
      },
      editRole (user) {
        this.editUser = user
        this.showEditRole = true
      },
      afterRoleEdited () {
        this.showEditRole = false
        this.loadUsers()
      }
    },
    created () {
      this.loadUsers()

      // TODO: Remove redundancy of preventing outer scrolling when popup is show up
      this.$watch(() => {
        return this.showAddInternal || this.showAddExternal || this.showEditRole || this.showDelAccount || this.showCheckAccount
      }, (newVal, oldVal) => {
        const bodyStyle = document.body.style
        if (newVal) {
          bodyStyle.overflow = 'hidden'
        } else {
          bodyStyle.overflow = 'auto'
        }
      })
    },
    components: {
      Icon,
      AddInternalUser,
      AddExternalUser,
      CheckAccount,
      EditRole,
      DelAccount
    }
  }
</script>

<style lang="scss" scoped>
  @import "~@/assets/styles/settings.scss";

  /*
      Search
   */

  .row.search {
    background-color: #f1f1f1;
    border-radius: .4rem;
    padding: 1rem;
  }

  div.row.search div.search-panel {
    padding-left: 1rem;
  }

  div.row.search div.search-panel label {
    margin-bottom: 0;
  }

  .search-box-wrap {
    padding-left: 2rem;
    display: block;
    overflow: hidden;
  }

  .search-box-wrap input#search-box {
    font-size: 1.2rem;
    width: 30rem;
    margin-bottom: 0;
    background-color: white;
  }

  .search-icon {
    position: absolute;
    top: 2rem;
    margin-left: -3rem;
    cursor: pointer;
  }

  .add-buttons {
    margin-left: 5rem
  }

  .add-buttons a.button {
    margin-top: 0;
    margin-bottom: 0;
  }

  .add-external {
    margin-left: 1rem;
    background-color: #cd5c5c;
    border-color: #cd5c5c;
  }

  .add-external:hover, .add-external:focus {
    background-color: #606c76;
    border-color: #606c76;
  }

  table {
    font-size: 1.2rem;
  }

  .company-filter {
    width: 0;
    height: 2rem;
    padding-left: 0;
    margin-bottom: 0;
  }

  table a.button {
    margin-top: .2rem;
    margin-bottom: .2rem;
  }

  .button.edit-role {
    background-color: #4FABC9;
    border-color: #4FABC9;
  }

  .button.delete {
    background-color: #7E7E7E;
    border-color: #7E7E7E;
  }

  /*
      Paging row
   */

  div.row.pages-wrap {
    margin-bottom: 3rem;
  }

  .pages {
    margin: 0 auto;
  }

  .page-number {
    margin: 0 .6rem;
    padding: .3rem .6rem;
    border: 1px solid #a1a1a1;
    color: #a1a1a1;
    border-radius: .4rem;
  }

  .page-number:hover {
    background-color: #a1a1a1;
    color: white;
    cursor: pointer;
  }

  .current-page-number {
    border: 0;
    margin: 0 1rem;
  }
</style>
