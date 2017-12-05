import Axios from 'axios'
import { util, utilSpinner } from './util'

export const axios = Axios.create({
  baseURL: '/v1'
})

axios.interceptors.request.use(config => {
  if (util.sessionChecker()) {
    return config
  } else {
    if (confirm('Your session has been expired.\nDo you want to go to login page?')) {
      window.location.href = '/logout'
    } else {
      throw new Error('After session expiration, request cannot be sent.')
    }
  }
})

export const http = {
  defaultErrCb (err) {
    console.error(err)
  },
  oapResponseCb (res, successCb) {
    if (res.data.error) throw new Error(res.data.error.message)
    else successCb(res.data)
  },
  get (url, successCb, errCb = http.defaultErrCb) {
    axios.get(url).then(res => http.oapResponseCb(res, successCb)).catch(errCb)
  },
  post (url, body, successCb, errCb = http.defaultErrCb) {
    axios.post(url, body).then(res => http.oapResponseCb(res, successCb)).catch(errCb)
  },
  getPromise (url, params = {}) {
    let conf = {
      params: params
    }
    return new Promise((resolve, reject) => {
      axios.get(url, conf).then(res => {
        if (res.data.error) {
          util.toastr().error(res.data.error.message)
          if (utilSpinner.spinner) { utilSpinner.spinner.stop() }
          throw new Error(res.data.error.message)
        } else {
          resolve(res)
        }
      }).catch(err => {
        if (reject) {
          reject(err)
        } else {
          http.defaultErrCb(err)
        }
      })
    })
  },
  postPromise (url, body) {
    return new Promise((resolve, reject) => {
      axios.post(url, body).then(res => {
        if (res.data.error) {
          util.toastr().error(res.data.error.message)
          if (utilSpinner.spinner) { utilSpinner.spinner.stop() }
          throw Error(res.data.error.message)
        } else {
          resolve(res)
        }
      }).catch(err => {
        if (reject) {
          reject(err)
        } else {
          http.defaultErrCb(err)
        }
      })
    })
  },
  putPromise (url, body) {
    return new Promise((resolve, reject) => {
      axios.put(url, body).then(res => {
        if (res.data.error) {
          util.toastr().error(res.data.error.message)
          if (utilSpinner.spinner) { utilSpinner.spinner.stop() }
          throw new Error(res.data.error.message)
        } else {
          resolve(res)
        }
      }).catch(err => {
        if (reject) {
          reject(err)
        } else {
          http.defaultErrCb(err)
        }
      })
    })
  },
  deletePromise (url, params) {
    let conf = {
      params: params
    }
    return new Promise((resolve, reject) => {
      axios.delete(url, conf).then(res => {
        if (res.data.error) {
          if (res.data.error.code === 30301) {
            util.toastr().error('Category 하단에 Template이 존재합니다.<br>Template을 삭제하거나 Category 이동 후 삭제해 주세요.')
          } else {
            util.toastr().error(res.data.error.message)
          }
          if (utilSpinner.spinner) { utilSpinner.spinner.stop() }
          throw new Error(res.data.error.message)
        } else {
          resolve(res)
        }
      }).catch(err => {
        if (reject) {
          reject(err)
        } else {
          http.defaultErrCb(err)
        }
      })
    })
  }
}
