<template>
  <div class="popup-container">
    <div class="popup-middle-container">
      <div class="add-db-role center-popup viewport-scroll">
        <popup-header title="Add DB Role" @close="close()"></popup-header>
        <div class="row db-name">
          <div class="column column-20 label">DB Name</div>
          <div class="column column column-input">
            <input name="DB Name" maxlength="100" :class="{'warning-border': errors.has('DB Name')}" type="text" v-model="dbName" v-validate="'required|alpha_dash'"><br>
            <span class="errmsg" v-show="errors.has('DB Name')">{{ errors.first('DB Name') }}</span>
          </div>
        </div>
        <div class="row game-yn">
          <div class="column column-20 label">Game YN</div>
          <div class="column column-40 column-input">
            <input type="radio" name="gameYn" value="true" v-model="isGame"> Game
          </div>
          <div class="column column-input">
            <input type="radio" name="gameYn" value="false" v-model="isGame"> Not Game
          </div>
        </div>
        <div class="row buttons">
          <div class="button-wrap margin-auto">
            <button class="button button-outline" href="#" @click.prevent="close()">Close</button>
            <button class="button" :class="{'deactivated': errors.has('DB Name')}" @click.prevent="createDB(dbName, isGame)">Submit</button>
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
    data () {
      return {
        dbName: '',
        isGame: true
      }
    },
    methods: {
      createDB (dbName, isGame) {
        this.$validator.validate('DB Name', dbName).then(valid => {
          if (valid) {
            if (confirm('Do you want add a new database?')) {
              roleResource.createDBRole(dbName, isGame).then(success => {
                if (success) {
                  this.$emit('dbAdded')
                } else {
                  throw new Error(`Failed to add database(${dbName})`)
                }
              }).catch(err => {
                alert(err.message)
              })
            }
          }
        })
      },
      close () {
        this.$emit('closeAddDBRole')
      }
    },
    components: {
      PopupHeader
    }
  }
</script>

<style lang="scss" scoped>
  @import '~@/assets/styles/settings.scss';

  .add-db-role {
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
      DB Name
   */

  div.row.db-name {
    margin-bottom: 1.5rem;
  }

  div.row.db-name div.column.label {
    line-height: 3.6rem;
  }

  div.row.db-name div.column.column-input input[type=text] {
    width: 70%;
    margin-bottom: 0;
  }

  div.row.db-name div.column.column-input span.errmsg {
    font-size: 1.2rem;
    color: red;
  }

  /*
      Buttons
   */

  div.row.buttons {
    padding-top: 3rem;
    padding-bottom: 3rem;
  }
</style>
