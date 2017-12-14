import { expect } from 'chai'
import sinon from 'sinon'
import mockCategoryListGet from './__mockData__/category/CategoryListGet'
import mockCategoryGet from './__mockData__/category/CategoryGet'
import { util } from './common/util'

describe('Category', () => {
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

  it('get list', (done) => {
    util.getData('http://growthy-probe-local.game.line-dev.me:8002/v1/category/list')
    .then((res) => {
      const analysis = res.data.result[0]
      const operation = res.data.result[1]
      try {
        expect(analysis.categoryList[0].categoryNmEn).to.equal('my 666 Category')
        expect(operation.categoryList[0].categoryNmEn).to.equal('my 33 Category')
      } catch (e) {
        console.log(e)
      }
      return res
    })
    .then(() => {
      done()
    }, () => {
      done()
    })
    setTimeout(() => server.respond([200, {
      'Content-Type': 'application/json'
    }, JSON.stringify(mockCategoryListGet)]), 0)
  })

  it('get', (done) => {
    util.getData('http://growthy-probe-local.game.line-dev.me:8002/v1/category/6')
    .then((res) => {
      const { result } = res.data
      try {
        expect(result.categoryId).to.equal(6)
        expect(result.categoryNmEn).to.equal('my 666 Category')
      } catch (e) {
        console.log(e)
      }
      return res
    })
    .then(() => {
      done()
    }, () => {
      done()
    })
    setTimeout(() => server.respond([200, {
      'Content-Type': 'application/json'
    }, JSON.stringify(mockCategoryGet)]), 0)
  })
})
