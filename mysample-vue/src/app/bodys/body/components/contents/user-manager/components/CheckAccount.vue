<template>
  <div class="popup-container">
    <div class="popup-middle-container">
      <div class="check-account">
        <popup-header title="Check Account" @close="close()"></popup-header>
        <div class="row">
          <div class="column column-20 label">ID</div>
          <div class="column">{{ addedUser.userId }}</div>
        </div>
        <div class="row">
          <div class="column column-20 label">Name</div>
          <div class="column">{{ addedUser.userName }}</div>
        </div>
        <div class="row">
          <div class="column column-20 label">Company</div>
          <div class="column">{{ addedUser.companyName }}</div>
        </div>
        <div class="row">
          <div class="column column-20 label">Registrant</div>
          <div class="column">{{ addedUser.registerName }} ({{ addedUser.createDate }})</div>
        </div>
        <div class="row">
          <div class="column column-20 label">Last Editor</div>
          <div class="column">{{ addedUser.lastEditorName }} ({{ addedUser.editDate }})</div>
        </div>
        <hr>
        <div class="row">
          <span style="margin: 0 auto;">Completed to create account.</span>
        </div>
        <hr>
        <div class="row">
          <button class="close button button-outline" @click.prevent="close()">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import PopupHeader from '@/app/bodys/body/common/PopupHeader.vue'
  import User from '@/app/bodys/body/common/domain/User'

  export default {
    props: {
      addedUser: User
    },
    methods: {
      close () {
        this.$emit('closeCheckAccount')
      }
    },
    components: {
      PopupHeader
    }
  }
</script>

<style lang="scss" scoped>
  @import "~@/assets/styles/settings.scss";


  .check-account {
    margin-left: auto;
    margin-right: auto;
    width: 60rem;
    background-color: white;
    overflow: auto;
    font-size: 1.5rem;
  }

  .row {
    width: 100%;
    margin: 0;
    padding-top: .8rem;
    padding-bottom: .8rem;
    text-align: left;
  }

  .column {
    margin: 0;
    padding-left: 2rem;
  }

  .column.label {
    font-weight: 500;
  }

  hr {
    margin: 1.6rem 0 1.6rem 0;
  }

  hr.below-title {
    margin-top: 0;
  }

  a.button.create-temp-db {
    margin-bottom: 0;
    margin-left: 1rem;

    height: 2.5rem;
    line-height: 2.5rem;
  }

  button.close {
    margin: 0 auto;
  }
</style>
