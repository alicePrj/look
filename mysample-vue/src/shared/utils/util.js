import Cookies from 'js-cookie'
import moment from 'moment'
import { Spinner } from 'spin.js'
import toastr from 'toastr'
import 'toastr/build/toastr.min.css'

export const utilSpinner = {
  spinner: null
}

export const util = {
  sessionChecker () {
    let token = Cookies.get('X-Linegame-UserToken')
    let lgac = Cookies.get('lgac')

    return token && lgac
  },
  /* http://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript */
  generateUUID () {
    let d = new Date().getTime()
    if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
      d += performance.now() // use high-precision timer if available
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
      let r = (d + Math.random() * 16) % 16 | 0
      d = Math.floor(d / 16)
      return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16)
    })
  },
  unixtimeToDate (unixtime) {
    return moment.unix(unixtime / 1000).format('YYYY-MM-DD hh:mm:ss a')
  },
  toastr () {
    return toastr
  },
  spinner (spinnerId) {
    utilSpinner.spinner = new Spinner({scale: 0.75}).spin(document.getElementById(spinnerId))
    return utilSpinner.spinner
  },
  deepcopy (target) {
    return JSON.parse(JSON.stringify(target))
  },
  stringLengthComma (value) {
    if (!value) return 0
    return value.length.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  },
  numberOnlyEvent (e) {
    if ('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.indexOf(e.key) >= 0) {
      e.preventDefault()
      return false
    }
    /* if (e.keyCode > 128) {
      e.preventDefault()
      return false
    } */
  },
  numberWithCommas (value) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  },
  numberDeleteCommas (value) {
    return Number(value.replace(/,/g, ''))
  }/* ,
  numberChangeCommas (value) {
    return util.numberWithCommas(util.numberDeleteCommas(value))
  } */
}

// toastr.options.closeButton = true
toastr.options.hideDuration = 200
