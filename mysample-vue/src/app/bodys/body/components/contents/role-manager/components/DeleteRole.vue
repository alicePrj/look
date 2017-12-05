<template>
  <div class="popup-container">
    <div class="popup-middle-container">
      <div class="delete-role center-popup viewport-scroll">
        <popup-header title="Delete Role" @close="close()"></popup-header>
        <div class="row box-title">Privilege Updated Role</div>
        <div class="row box-row">
          <div class="box rounding-corner">
            <ul class="role-list">
              <li v-if="role.isGameDB">allgame.allview.read</li>
              <li>{{ role.dbName }}.allview.read</li>
            </ul>
          </div>
        </div>
        <div class="row box-title">Delete role</div>
        <div class="row box-row">
          <div class="box rounding-corner">
            <ul class="role-list">
              <li>{{ role.roleName }}</li>
            </ul>
          </div>
        </div>
        <div class="row delete-notice"><div class="margin-auto">Do you want to delete and update roles?</div></div>
        <div class="row buttons">
          <div class="button-wrap margin-auto">
            <button class="button button-outline" href="#" @click.prevent="close()">Back</button>
            <button class="button" @click.prevent="deleteRole(role)">Submit</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import PopupHeader from '@/app/bodys/body/common/PopupHeader.vue'
  import roleResource from '@/app/bodys/body/common/resource/roles'

  export default {
    props: {
      role: Object
    },
    methods: {
      deleteRole (role) {
        roleResource.deleteRole(role.roleName).then(res => {
          if (res) {
            alert('Role deletion and update succeeded!')
            this.$emit('roleDeleted')
          } else {
            throw new Error('Cannot delete or update role.')
          }
        }).catch(err => {
          alert(err)
        })
      },
      close () {
        this.$emit('closeDeleteRole')
      }
    },
    components: {
      PopupHeader
    }
  }
</script>

<style lang="scss" scoped>
  @import '~@/assets/styles/settings.scss';

  li {
    margin-bottom: 0;
  }

  .delete-role {
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
    margin-bottom: .5rem;
  }

  div.column.label, div.column.column-input {
    text-align: left;
  }

  div.column.label {
    line-height: 3.6rem;
  }

  div.column.column-input {
    margin-right: 2rem;
  }

  div.column.label {
    margin-left: 1rem;
    font-weight: 500;
  }

  /*
      Role boxes
   */

  div.row {
    padding-left: 2rem;
    padding-right: 2rem;
  }

  div.row div.box {
    border: 1px solid $border-color-primary;
    padding: 1rem;
    overflow: auto;
    width: 100%;
    max-height: 20rem;
  }

  div.row.box-row {
    margin-bottom: 2rem;
  }

  div.row.box-title {
    font-weight: 500;
  }

  ul.role-list {
    margin-bottom: 0;
    text-align: left;
  }

  /*
      Delete notice
   */

  div.row.delete-notice {
    text-align: center;
    margin-bottom: 2rem;
  }
</style>
