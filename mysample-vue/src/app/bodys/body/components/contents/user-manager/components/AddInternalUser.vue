<template>
  <div class="popup-container">
    <div class="popup-middle-container">
      <div class="add-internal center-popup viewport-scroll">
        <popup-header title="Add LINE Staff" @close="close()"></popup-header>
        <div class="row search">
          <div class="column column-20 label">Search</div>
          <div class="column column-input">
            <input type="text" v-model="searchKey" @keyup.enter="search(searchKey)">
            <div class="search-icon-wrap">
              <icon class="search-icon" name="search" scale="1" @click.native="search(searchKey)"></icon>
            </div>
            <div class="error-msg" v-if="errorMsg">{{ errorMsg }}</div>
          </div>
        </div>
        <hr>
        <div class="row">
          <div class="column column-20 label">Userkey</div>
          <div class="column column-input"><input type="text" v-model="foundUser.userKey" readonly></div>
        </div>
        <div class="row">
          <div class="column column-20 label">Staff ID</div>
          <div class="column column-input"><input type="text" v-model="foundUser.staffId" readonly></div>
        </div>
        <div class="row">
          <div class="column column-20 label">Name</div>
          <div class="column column-input"><input type="text" v-model="foundUser.userName" readonly></div>
        </div>
        <div class="row">
          <div class="column column-20 label">Email</div>
          <div class="column column-input"><input type="text" v-model="foundUser.email" readonly></div>
        </div>
        <div class="row">
          <div class="column column-20 label">Company</div>
          <div class="column column-input"><input type="text" v-model="foundUser.companyName" readonly></div>
        </div>
        <div class="row">
          <div class="column column-20 label">Company ID</div>
          <div class="column column-input"><input type="text" v-model="foundUser.companyId" readonly></div>
        </div>
        <div class="row">
          <div class="column column-20 label">Status</div>
          <div class="column column-input"><input type="text" v-model="foundUser.status" readonly></div>
        </div>
        <hr>
        <div class="row buttons">
          <div class="button-wrap">
            <button class="button button-outline" @click="close()">Close</button>
            <button class="button" :class="{ deactivated: !addActivated }" href="#" @click.prevent="addInternalUser()">Add</button>
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
  import userResource from '@/app/bodys/body/common/resource/users'

  export default {
    data () {
      return {
        showCheckAccount: false,
        searchKey: '',
        foundUser: {},
        errorMsg: ''
      }
    },
    computed: {
      addActivated () {
        if (!this.foundUser) return false
        else return this.foundUser.status === 'Active' && !this.foundUser.probeUser
      }
    },
    methods: {
      init () {
        this.foundUser = {}
        this.errorMsg = ''
      },
      search (searchKey) {
        this.init()

        if (!searchKey) return

        userResource.searchUser(searchKey, true).then(user => {
          this.foundUser = user
          if (user.probeUser) throw new Error('Already Added in Growthy Probe')
          else if (user.status !== 'Active') throw new Error('Only Active status can be added.')
        }).catch(err => {
          if (err.message.includes('955')) {
            this.errorMsg = 'No userkey in GUM'
          } else {
            this.errorMsg = err.message
          }
        })
      },
      addInternalUser () {
        if (this.addActivated) {
          userResource.addUser(this.foundUser)
            .then(addedUser => {
              this.$emit('userAdded', addedUser)
            })
            .catch(err => alert(err.message))
        }
      },
      close () {
        this.$emit('closeAddInternal')
      }
    },
    components: {
      PopupHeader,
      Icon
    }
  }
</script>

<style lang="scss" scoped>
  @import "~@/assets/styles/settings.scss";
  /*
      For popup styling
   */

  .add-internal {
    width: 60rem;
    border: 1px solid #d3d3d3;
    background-color: white;
    font-size: 1.5rem;
  }

  .row, .column {
    width: 100%;
    margin-left: 0;
    margin-right: 0;
  }

  div.row {
    margin-bottom: .5rem;
  }

  /*
      Search
   */

  div.row.search {
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
    top: -4.3rem;
    right: 1rem;
    cursor: pointer;
  }

  div.row.search div.error-msg {
    text-align: left;
    color: rgba(207, 38, 89, 1);
    padding-left: 2rem;
    font-weight: 500;
  }

  hr {
    margin: 1rem 2rem 2rem 2rem;
    border-top: 1px dotted #d3d3d3;
  }

  div.column {
    text-align: center;
  }

  div.column.label {
    margin-left: 1.5rem;
    line-height: 3.8rem;
    text-align: left;
    font-weight: 500;
  }

  div.column.column-input {
    margin-right: 1.5rem;
  }

  input[type=text] {
    width: 100%;
  }

  input[readonly] {
    background-color: #f1f1f1;
  }

  /*
      Buttons
   */

  div.row.buttons div.button-wrap {
    margin: 0 auto;
  }
</style>
