<template>
  <div class="popup-container">
    <div class="popup-middle-container">
      <div class="add-role center-popup viewport-scroll">
        <popup-header title="Add Role" @close="close()"></popup-header>
        <!--
          Step 1: Set view name and select databases
        -->
        <div class="el-group" v-if="step == 0">
          <div class="row db-name">
            <div class="column column-20 label">View Name</div>
            <div class="column column column-input">
              <input name="View Name" type="text" :class="{'warning-border': errors.has('View Name')}" v-model="viewName" v-validate="'required|alpha_dash'"><br>
              <span class="errmsg" v-show="errors.has('View Name')">{{ errors.first('View Name') }}</span>
            </div>
          </div>
          <div class="row database">
            <div class="column column-20 label">Database</div>
            <div class="column column column-input">
              <div class="box rounding-corner">
                <div v-for="db in basicDBs">
                  <input type="checkbox" :id="db" v-model="selectedDbs" :value="db">
                  <label :for="db.databaseRoleName" class="label-inline">{{ db.databaseRoleName }}<span v-if="db.gameDb">&nbsp;ⓖ</span></label>
                </div>
              </div>
              <input type="checkbox" id="selectAll" v-model="selectAll" :value="true" @change="toggleSelectAll">
              <label for="selectAll" class="select-label label-inline">Select/Unselect All</label>
            </div>
          </div>
          <div class="row buttons">
            <div class="button-wrap margin-auto">
              <button class="button button-outline" href="#" @click.prevent="close()">Close</button>
              <button class="button" @click="nextstep()" :class="{'deactivated': errors.has('View Name') || selectedDbs.length === 0}">Submit</button>
            </div>
          </div>
        </div>
        <!--
          Step 2: Check selected items and submit
        -->
        <div class="el-group confirm" v-else>
          <div class="row box-title">Privilege Updated Role</div>
          <div class="row priv">
            <div class="box rounding-corner">
              <ul class="role-list">
                <li v-if="gameDBSelected">allgame.allview.read</li>
                <li v-for="db in selectedDbs">{{ db.databaseRoleName }}.allview.read</li>
              </ul>
            </div>
          </div>
          <div class="row box-title">New role</div>
          <div class="row">
            <div class="box rounding-corner">
              <ul class="role-list">
                <li v-for="db in selectedDbs">{{ db.databaseRoleName }}.{{ viewName }}.read</li>
              </ul>
            </div>
          </div>
          <div class="row buttons">
            <div class="button-wrap margin-auto">
              <button class="button button-outline" href="#" @click.prevent="step = 0">Back</button>
              <button class="button" @click.prevent="createRole(viewName, selectedDbs)">Submit</button>
            </div>
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
    props: ['basicDBs'],
    data () {
      return {
        viewName: '',
        selectedDbs: [],
        selectAll: '',
        step: 0
      }
    },
    methods: {
      toggleSelectAll () {
        if (this.selectAll) {
          this.selectedDbs = this.basicDBs
        } else {
          this.selectedDbs = []
        }
      },
      nextstep () {
        this.$validator.validate('View Name', this.viewName).then(valid => {
          if (valid && this.selectedDbs.length > 0) {
            this.step = 1
          }
        })
      },
      createRole (viewName, selectedDbs) {
        const dbNames = selectedDbs.map(i => i.databaseRoleName)

        roleResource.createRoles(viewName, dbNames).then(res => {
          if (res) {
            alert('Role addition and update succeeded!')
            this.$emit('roleAdded')
          }
        }).catch(err => {
          alert(err)
        })
      },
      close () {
        this.$emit('closeAddRole')
      }
    },
    computed: {
      gameDBSelected () {
        return this.selectedDbs.some(i => i.gameDb)
      }
    },
    components: {
      PopupHeader
    }
  }
</script>

<style lang="scss" scoped>
  @import '~@/assets/styles/settings.scss';

  .add-role {
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
    View Name
  */

  div.row.db-name {
    margin-bottom: 2rem;
  }

  div.row.db-name div.column.column-input input[type=text] {
    margin-bottom: 0;
  }

  div.row.db-name div.column.column-input span.errmsg {
    font-size: 1.2rem;
    color: red;
  }

  /*
      Database checkboxes
   */

  div.row.database div.box {
    border: 1px solid $border-color-primary;
    max-height: 25rem;
    padding: 1rem;
    overflow: auto;
  }

  div.row.database div.column.column-input div.box input,
  div.row.database div.column.column-input div.box label {
    margin-top: .3rem;
    margin-bottom: .3rem;
  }

  /*
    Confirmation
  */

  div.el-group.confirm div.row {
    padding-left: 2rem;
    padding-right: 2rem;
  }

  div.el-group.confirm div.row.priv {
    margin-bottom: 3rem;
  }

  div.el-group.confirm div.row.box-title {
    font-weight: 500;
  }

  div.el-group.confirm div.box {
    width: 100%;
    max-height: 15rem;
    overflow: auto;
    border: 1px solid $border-color-primary;
    padding: .5rem .5rem .5rem 1.5rem;
  }

  div.el-group.confirm ul.role-list {
    margin-bottom: 0;
    text-align: left;
  }

  div.el-group.confirm ul.role-list li {
    margin: 0;
    padding-top: .3rem;
    padding-bottom: .3rem;
  }

  /*
      Buttons
   */

  div.row.buttons {
    padding-top: 4rem;
    padding-bottom: 2rem;
  }
</style>
