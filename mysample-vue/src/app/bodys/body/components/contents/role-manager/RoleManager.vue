<template>
  <div class="container">
    <div class="row search">
      <div class="search-panel">
        <label for="search-box" class="float-left">Search</label>
        <span class="search-box-wrap">
          <input type="text" v-model="searchText" placeholder="Enter Role" id="search-box" class="float-left" @keyup.enter="search(searchText)">
          <icon class="search-icon" name="search" scale="1" @click.native="search(searchText)"></icon>
        </span>
      </div>
      <div class="add-buttons">
        <a class="button add-db-role" href="#" @click.prevent="showAddDBRole = true">Add DB Role</a>
        <a class="button add-role" href="#" @click.prevent="showAddRole = true">Add Role</a>
      </div>
    </div>
    <div class="row db-list-row">
      <div v-if="visibleRoles.length == 0" class="no-role-notice">Not registered role.</div>
      <ul class="db-list" v-else>
        <li v-for="dbRole in visibleRoles" class="arrow-right">
          <span class="group-name">{{ dbRole.databaseRoleName }}<span v-if="dbRole.gameDb">&nbsp;ⓖ</span>
            <a v-if="dbRole.roles.length == 0 && dbRole.databaseRoleName !== 'DB.Allview Role' && dbRole.databaseRoleName !== 'Root Role'"
               class="delete"
               @click.prevent="deleteDBRole(dbRole.databaseRoleName)">&nbsp;&nbsp;&nbsp;[ Delete ]</a>
          </span>
          <ul class="role-list">
            <li v-for="tblRole in dbRole.roles">{{ tblRole.tableRoleName }}
              <span v-if="dbRole.gameDb">&nbsp;ⓖ</span>
              <a v-if="tblRole.deletable" class="delete" @click.prevent="deleteRole(dbRole.databaseRoleName, tblRole.tableRoleName, dbRole.gameDb)">&nbsp;&nbsp;&nbsp;[ Delete ]</a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <!-- popups -->
    <add-db-role @dbAdded="afterDBAdded()" @closeAddDBRole="showAddDBRole = false" v-if="showAddDBRole"></add-db-role>
    <add-role :basicDBs="basicDBs"
              @roleAdded="afterRoleAdded()"
              @closeAddRole="showAddRole = false"
              v-if="showAddRole"></add-role>
    <delete-role :role="roleToDelete"
                 @roleDeleted="afterRoleDeleted()"
                 @closeDeleteRole="showDeleteRole = false"
                 v-if="showDeleteRole"></delete-role>
    <delete-db-role :db="dbToDelete"
                    @dbRoleDeleted="afterDBRoleDeleted()"
                    @closeDeleteDBRole="showDeleteDBRole = false"
                    v-if="showDeleteDBRole"></delete-db-role>
  </div>
</template>

<script>
  import Icon from 'vue-awesome/components/Icon.vue'
  import AddDbRole from './components/AddDBRole.vue'
  import AddRole from './components/AddRole.vue'
  import DeleteRole from './components/DeleteRole.vue'
  import DeleteDBRole from './components/DeleteDBRole.vue'
  import roleResource from '@/app/bodys/body/common/resource/roles'
  import { DBRole } from '@/app/bodys/body/common/domain/roles'
  import { util } from '@/shared/utils/util'

  const DB_ALLVIEW_ROLE = 'DB.Allview Role'
  const ROOT_ROLE = 'Root Role'

  export default {
    data () {
      return {
        roles: [],  /* It should not be modified after initialized */
        searchText: '',
        visibleRoles: [],  /* It should be initialized after data is ready */

        roleToDelete: {},   // data for delete role
        dbToDelete: '', // data for delete db role

        /* popup flags */
        showAddDBRole: false,
        showAddRole: false,
        showDeleteRole: false,
        showDeleteDBRole: false
      }
    },
    computed: {
      basicDBs () {
        return this.roles.filter(r => !r.databaseRoleName.includes(DB_ALLVIEW_ROLE) && !r.databaseRoleName.includes(ROOT_ROLE))
      }
    },
    methods: {
      loadRoles () {
        roleResource.getRoles().then(data => {
          this.roles = data.list.map(i => new DBRole(i)).sort(({databaseRoleName: a}, {databaseRoleName: b}) => {
            // Order: {specific db} -> Root Role -> DB.AllView Role
            if (a.includes(DB_ALLVIEW_ROLE)) return 1
            else if (b.includes(DB_ALLVIEW_ROLE)) return -1
            else if (a.includes(ROOT_ROLE)) return 1
            else if (b.includes(ROOT_ROLE)) return -1
            else Array.prototype.sort(a.toUpperCase(), b.toUpperCase())
          })
          this.visibleRoles = util.deepcopy(this.roles)
        })
      },
      search (searchKeyword) {
        searchKeyword = searchKeyword.toLowerCase()
        let visibleRoles = util.deepcopy(this.roles)

        if (searchKeyword.length > 0) {
          visibleRoles = visibleRoles.filter(dbRole => {
            const foundRoles = dbRole.roles.filter(tblRole => tblRole.tableRoleName.includes(searchKeyword))
            dbRole.roles = foundRoles
            return foundRoles.length > 0
          })
        }

        this.visibleRoles = visibleRoles
      },
      afterDBAdded () {
        this.showAddDBRole = false
        this.loadRoles()
      },
      afterRoleAdded () {
        this.showAddRole = false
        this.loadRoles()
      },
      deleteRole (dbName, roleName, isGameDb) {
        this.roleToDelete = {
          dbName: dbName,
          isGameDB: isGameDb,
          roleName: roleName
        }
        this.showDeleteRole = true
      },
      afterRoleDeleted () {
        this.showDeleteRole = false
        this.loadRoles()
      },
      deleteDBRole (dbName) {
        this.dbToDelete = dbName
        this.showDeleteDBRole = true
      },
      afterDBRoleDeleted () {
        this.showDeleteDBRole = false
        this.loadRoles()
      }
    },
    created () {
      this.loadRoles()

      /*
        Prevent outer-scrolling when popup is on
        TODO: Remove redundancy of preventing outer scrolling when popup is show up
       */
      this.$watch(() => {
        return this.showAddDBRole || this.showDeleteRole || this.showAddRole || this.showDeleteDBRole
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
      AddDbRole,
      AddRole,
      DeleteRole,
      'delete-db-role': DeleteDBRole
    }
  }
</script>

<style lang="scss" scoped>
  @import "~@/assets/styles/settings.scss";

  /*
      Search Panel
   */

  .row.search {
    background-color: #f1f1f1;
    border-radius: .4rem;
    padding: 1rem 1rem 1rem 2rem;
  }

  div.search-panel label {
    line-height: 2.4;
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

  .add-role {
    margin-left: 1rem;
    background-color: #cd5c5c;
    border-color: #cd5c5c;
  }

  .add-role:hover, .add-external:focus {
    background-color: #606c76;
    border-color: #606c76;
  }

  /*
    Role List
   */

  div.no-role-notice {
    margin-top: 2rem;
    margin-left: 2rem;
  }

  ul.db-list {
    text-align: left;
    list-style-type: none;
  }

  ul.db-list li span.group-name {
    margin-left: 2rem;
  }

  div.row.db-list-row {
    margin-top: 1rem;
  }

  div.row.db-list-row ul.db-list ul.role-list {
    margin-top: 1rem;
  }

  div.row.db-list-row a.delete {
    cursor: pointer;
  }
</style>
