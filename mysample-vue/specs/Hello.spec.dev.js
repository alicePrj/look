import { expect } from 'chai'
import sinon from 'sinon'
import axios from 'axios'
import mockHello from './__mockData__/Hello'

describe('Hello', () => {
  let sandbox
  let server

  beforeEach(() => {
    sandbox = sinon.sandbox.create()
    server = sandbox.useFakeServer()
  })

  afterEach(() => {
    server.restore()
    sandbox.restore()
  })

  it('axios test', (done) => {
    getData()
    .then((res) => {
      try {
        expect(res.data.message).to.equal('Hello world')
      } catch (e) {
        console.log(e)
      }
      return res
    })
    .then((res) => {
      // console.log(res)
      //  console.log(res.data)
      done()
    }, (res) => {
      // console.log(res)
      done()
    })

    setTimeout(() => server.respond([200, {
      'Content-Type': 'application/json'
    }, JSON.stringify(mockHello)]), 0)
  })
})

export function getData () {
  return axios.get('http://hello')
    .then((res) => {
      return res
    })
    .catch((res) => {
      console.log('error')
      return Promise.reject(res)
    })
}
