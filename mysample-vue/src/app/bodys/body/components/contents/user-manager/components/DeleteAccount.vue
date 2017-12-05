<template>
  <div class="popup-container">
    <div class="popup-middle-container">
      <div class="del-account center-popup viewport-scroll">
        <popup-header title="Del Account" @close="close()"></popup-header>
        <div class="row">
          <div class="column column-20 label">ID</div>
          <div class="column column-input">{{ delUser.userId }}</div>
        </div>
        <div class="row">
          <div class="column column-20 label">Name</div>
          <div class="column column-input">{{ delUser.userName }}</div>
        </div>
        <div class="row">
          <div class="column column-20 label">Company</div>
          <div class="column column-input">{{ delUser.companyName }}</div>
        </div>
        <div class="row">
          <div class="column column-20 label">Register</div>
          <div class="column column-input">{{ delUser.register }} ({{ delUser.createDate }})</div>
        </div>
        <div class="row">
          <div class="column column-20 label">Last Editor</div>
          <div class="column column-input">{{ delUser.lastEditor }} ({{ delUser.editDate }})</div>
        </div>
        <hr>
        <div class="row password-notice">Enter service password to delete this account.</div>
        <div class="row password">
          <div class="column column-15 label">Password</div>
          <div class="column column-input"><input type="password" v-model="password" maxlength="100" inputmode="verbatim"></div>
        </div>
        <hr>
        <div class="row buttons">
          <div class="button-wrap margin-auto">
            <button class="button button-outline" href="#" @click.prevent="close()">Close</button>
            <button class="button" @click="deleteAccount(delUser)">Submit</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import userResource from '@/app/bodys/body/common/resource/users'
  import PopupHeader from '@/app/bodys/body/common/PopupHeader.vue'
  const Sha256 = require('sha.js').sha256

  export default {
    props: ['delUser'],
    data () {
      return {
        password: '',
        passMatch: 'f367cb9aea06c8effcf7b8d101d2af501e4c594b7f0551a5985f4ca6dbd2aadb'
      }
    },
    methods: {
      deleteAccount (delUser) {
        if (!this.password) {
          alert('Please enter password.')
          return
        }

        const passhash = new Sha256().update(this.password).digest('hex')
        if (this.passMatch !== passhash) {
          alert('Incorrect password. Please check again.')
          return
        }

        if (confirm('Do you want delete this account?')) {
          userResource.deleteUser(delUser)
            .then(res => this.$emit('userDeleted'))
            .catch(err => {
              console.log(err)
              alert('Cannot delete this account.')
            })
        }
      },
      close () {
        this.$emit('closeDelAccount')
      }
    },
    components: {
      PopupHeader
    }
  }
</script>

<style lang="scss" scoped>
  @import '~@/assets/styles/settings.scss';

  .del-account {
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

  /*
      Password
   */

  div.row.password-notice {
    padding-left: 2rem;
    margin-bottom: 1rem;
    font-weight: 500;
  }

  div.row.password div.column.label{
    line-height: 3.8rem;
  }

  div.row.password div.column.column-input{
    padding-right: 2rem;
  }

  div.row.password input[type=password] {
    margin-bottom: 0;
  }
</style>
