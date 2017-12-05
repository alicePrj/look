<template>
  <div>
    <template v-if="!hidable || showContents">
      <div class="tab-list clearfix">
        <input
          type="submit"
          class="tab button button-clear float-left"
          v-for="(tab, idx) in tabList"
          :class="{selected: idx == selectedTabIdx}"
          @click.prevent="selectedTabIdx = idx"
          :value="tab">
      </div>
      <div>
        <keep-alive>
          <component :is="tabComponents[selectedTabIdx]"></component>
        </keep-alive>
      </div>
    </template>
    <div v-if="hidable" class="hide-wrap">
      <button v-if="!showContents" @click.prevent="toggleContents" class="show button button-outline">Show Result <icon class="caret-down" name="caret-down"></icon></button>
      <template v-else>
        <input @click.prevent="toggleContents" class="hide button button-clear" type="submit" value="Hide Result"><div class="arrow-up"></div>
      </template>
    </div>
  </div>
</template>

<script>
  import RunningQuery from './RunningQuery.vue'
  import QueryResult from './QueryResult.vue'
  import { queryEventBus } from '@/shared/events/QueryEventBus'

  import Icon from 'vue-awesome/components/Icon.vue'
  import 'vue-awesome/icons/caret-down'

  export default {
    props: ['hidable'],
    data () {
      return {
        tabList: ['Query', 'Query Result'],
        selectedTabIdx: 1,
        tabComponents: [
          RunningQuery,
          QueryResult
        ],
        showContents: false
      }
    },
    methods: {
      toggleContents () {
        this.showContents = !this.showContents
      }
    },
    created () {
      queryEventBus.$on('queryStarted', query => { this.selectedTabIdx = 1 })
      queryEventBus.$on('queryResultReceived', () => { this.showContents = true })
    },
    components: {
      RunningQuery,
      QueryResult,
      Icon
    }
  }
</script>

<style lang="scss" scoped>
  @import '~@/assets/styles/settings.scss';
  $border-color: $color-primary;

  .tab-list {
    border-bottom: 1px solid $border-color;
  }
  input.tab.button.button-clear {
    position: relative;
    top: 1px;
    margin-bottom: 0;
  }
  .selected {
    border-radius: 0;
    border: 1px solid $border-color !important;
    border-bottom: 1px solid white !important;

    z-index: 0;
  }
  button.show.button {
    width: 100%;
    margin-top: 2rem;
  }
  .caret-down {
    margin-left: 0.5rem;
    position: relative;
    top: 0.4rem;
  }
  input.hide.button {
    margin-top: 2rem;
    padding-right: 1rem;
    padding-left: 1rem;
  }
</style>
