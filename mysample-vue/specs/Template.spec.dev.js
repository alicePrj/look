import { expect } from 'chai'
import sinon from 'sinon'
import mockTemplateListPost from './__mockData__/template/TemplateListPost'
import mockTemplateGet from './__mockData__/template/TemplateGet'
import { util } from './common/util'

describe('Template', () => {
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

  it('post list', (done) => {
    util.getData('http://growthy-probe-local.game.line-dev.me:8002/v1/template/list')
    .then((res) => {
      const { result } = res.data
      try {
        expect(result.templateList[0].categoryNmEn).to.equal('my 11 Category')
        expect(result.templateList[1].templateNm).to.equal('real data test!!')
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
    }, JSON.stringify(mockTemplateListPost)]), 0)
  })

  it('get', (done) => {
    util.getData('http://growthy-probe-local.game.line-dev.me:8002/v1/template/64')
    .then((res) => {
      const { result } = res.data
      try {
        expect(result.authLevel).to.equal('Admin,Wizard_Admin,LINE_Premium,LINE_Common,Common')
        expect(result.templateDetails[0].templateNm).to.equal('New Template 2nd')
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
    }, JSON.stringify(mockTemplateGet)]), 0)
  })
})
