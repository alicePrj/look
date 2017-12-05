<template>
  <div class="popup-container">
    <div class="popup-middle-container">
      <div class="delete-role center-popup viewport-scroll">
        <popup-header title="Delete DB" @close="close()"></popup-header>
        <div class="row box-title">Delete role</div>
        <div class="row box-row">
          <div class="box rounding-corner">
            <ul class="role-list">
              <li>{{ db }}.allview.read</li>
            </ul>
          </div>
        </div>
        <div class="row delete-notice"><div class="margin-auto">Do you want to delete DB and roles?</div></div>
        <div class="row buttons">
          <div class="button-wrap margin-auto">
            <button class="button button-outline" href="#" @click.prevent="close()">Back</button>
            <button class="button" @click.prevent="deleteDB(db)">Submit</button>
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
    props: ['db'],
    methods: {
      deleteDB (dbName) {
        roleResource.deleteDBRole(dbName).then(res => {
          if (res) {
            alert('Role and DB deletion succeeded!')
            this.$emit('dbRoleDeleted')
          } else {
            throw new Error('Deletion failed!')
          }
        }).catch(err => {
          alert(err)
        })
      },
      close () {
        this.$emit('closeDeleteDBRole')
      }
    },
    components: {
      PopupHeader
    }
  }
</script>

<style lang="scss" scoped>
  @import '~@/assets/styles/settings.scss';

  .delete-role {
    width: 60rem;
    background-color: white;
  }

  .row {
    width: 100%;
    margin-left: 0;
    margin-right: 0;
    margin-bottom: 0;
  }

  div.row {
    margin-bottom: 0.5rem;
    padding-left: 2rem;
    padding-right: 2rem;
  }

  div.row.title {
    padding-left: 2rem;
    padding-top: 1rem;
    padding-bottom: 1rem;
    margin-bottom: 2rem;
    border-bottom: 1px solid #d3d3d3;
  }

  div.row.title h5 {
    margin-bottom: 0;
    font-weight: 500;
  }

  /*
      Role boxes
   */

  div.row.box-title {
    font-weight: 500;
  }

  div.row.box-row {
    margin-bottom: 2rem;
  }

  div.row div.box {
    border: 1px solid $border-color-primary;
    padding: 1rem;
    overflow: auto;
    width: 100%;
    max-height: 20rem;
  }

  div.row.box-row div.box ul.role-list {
    margin-bottom: 0;
    text-align: left;
  }

  div.row.box-row div.box ul.role-list li {
    margin: 0;
  }

  /*
      Delete notice
   */

  div.row.delete-notice {
    text-align: center;
    margin-bottom: 2rem;
  }
</style>
