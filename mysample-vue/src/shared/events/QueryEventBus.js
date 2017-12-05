import Vue from 'vue'

export const queryEventBus = new Vue({
  methods: {
    globalClick (event) {
      /*
        Utility event to detect click anywhere
       */
      this.$emit('globalClick', event)
    },
    queryStarted (query) {
      this.$emit('queryStarted', query)
    },
    queryResultReceived (data) {
      this.$emit('queryResultReceived', data)
    },
    inputQueryChanged (query) {
      this.$emit('inputQueryChanged', query)
    },
    queryCanceled () {
      this.$emit('queryCanceled')
    }
  }
})
