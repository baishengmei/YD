import sinon from 'sinon'
import { expect } from 'chai'
import express from 'express'
import bodyParser from 'body-parser'
import http from 'http'
import Promise from 'bluebird'

delete require.cache[require.resolve('../../src/middlewares/responseTimeLog')]
const logResponseTime = require('../../src/middlewares/responseTimeLog')

const getAccessId = () => Math.random() * 500 | 0 // eslint-disable-line

/* eslint-disable no-await-in-loop */
describe('core', () => {
  describe('HttpServer', () => {
    let HttpServer
    let logStub
    let javaLoggerSpy
    let javaServer
    const port = 18302
    const host = `http://localhost:${port}`

    before((done) => {

      logStub = sinon.stub(logResponseTime, 'default', () => {
        const logger = accessId => req => {} // eslint-disable-line
        return javaLoggerSpy = sinon.spy(logger) // eslint-disable-line
      })

      delete require.cache[require.resolve('../../src/core/HttpServer')]
      HttpServer = require('../../src/core/HttpServer').default

      const app = express()

      app.use(bodyParser.urlencoded({
        extended: true
      }))

      app.use('/p', (req, res) => {
        res.status(200).send({
          error_code: 0,
          data: {
            method: req.method
          }
        })
      })

      app.use('/json', (req, res) => {
        res.status(200).send({
          error_code: 0,
          data: req.headers.accept
        })
      })

      app.use('/notjson', (req, res) => {
        res.status(200).send('nojson')
      })

      app.use('/needLogin', (req, res) => {
        res.status(403).send({
          error_code: 403,
          error_message: 'needLogin'
        })
      })

      app.use('/statusError', (req, res) => {
        res.status(500).send({
          error_code: 500,
          error_message: http.STATUS_CODES[500]
        })
      })

      app.use('/timeout', (req, res) => {
        setTimeout(() => {
          res.status(200).send({
            error_code: 0,
            data: {
              timeout: true
            }
          })
        }, 300)
      })

      app.use('/getError', (req, res) => {
        res.status(200).send({
          error_code: 1,
          error_message: 'custom error'
        })
      })

      app.use('/getError2', (req, res) => {
        res.status(200).send({
          error_code: 0,
          data: 'heihei'
        })
      })

      app.get('/query', (req, res) => {
        res.status(200).send({
          error_code: 0,
          data: req.query
        })
      })

      app.post('/post', (req, res) => {
        res.status(200).send({
          error_code: 0,
          data: req.body
        })
      })

      app.use('/put/2', (req, res) => {
        res.status(200).send({
          error_code: 0,
          data: req.body
        })
      })

      app.use('/patch/3', (req, res) => {
        res.status(200).send({
          error_code: 0,
          data: req.body
        })
      })

      app.get('/test/url/pattern/home', (req, res) => {
        res.status(200).send({
          error_code: 0,
          data: 'ok'
        })
      })

      app.get('/test/requestHeader', (req, res) => {
        const headers = req.rawHeaders.reduce((prev, cur, curIndex, arr) => {
          if ((curIndex & 1) === 0) { // eslint-disable-line
            prev[cur] = arr[curIndex + 1] // eslint-disable-line
          }
          return prev
        }, {})
        res.status(200).send({
          error_code: 0,
          data: headers
        })
      })

      app.get('/stream', (req, res) => {
        res.status(200)
        res.write('hello')
        setTimeout(() => {
          res.end(' world')
        }, 20)
      })

      javaServer = http.createServer(app).listen(port, done)

    })

    after(() => {
      javaServer && javaServer.close()
      logStub.restore()
    })

    /* eslint-disable prefer-template */

    it('log type is java', () => {
      expect(logStub.calledOnce).to.be.true
      expect(logStub.firstCall.args).to.have.lengthOf(1)
      expect(logStub.firstCall.args[0]).to.equal('java')
    })

    describe('get/post/put/patch requests', () => {

      const fourMethods = ['get', 'post', 'put', 'patch']

      it('contains the four type requests which return a Promise', async () => {

        expect(HttpServer).to.include.keys(fourMethods)

        for (const method of fourMethods) { // eslint-disable-line
          expect(HttpServer[method]).to.be.a('function')
          const accessId = getAccessId()
          const m = HttpServer[method](host + '/p', {
            accessId
          })
          expect(m).to.be.instanceof(Promise)
          const res = await m
          expect(res).to.include.keys('method')
          expect(res.method).to.equal(method.toUpperCase())
        }
      })

      it('pass accessId to logger', () => {
        for (const method of fourMethods) { // eslint-disable-line
          const accessId = getAccessId()
          const cnt = javaLoggerSpy.callCount
          HttpServer[method](host + '/p', {
            accessId
          })
          expect(javaLoggerSpy.callCount).to.equal(cnt + 1)
          expect(javaLoggerSpy.args[cnt][0]).to.equal(accessId)
        }
      })

      it('returns json data', async () => {
        for (const method of fourMethods) { // eslint-disable-line
          const accessId = getAccessId()
          const res = await HttpServer[method](host + '/json', {
            accessId
          })
          expect(res).to.match(/json/)
        }

        try {
          const accessId = getAccessId()
          await HttpServer.get(host + '/notjson', {
            accessId
          })
          throw new Error('这里不应该被执行到')
        } catch (e) {
          expect(e.message).to.match(/^Unexpected token/)
        }
      })

      it('returns error message when response is error and status beyond 300', async () => {
        const accessId = getAccessId()
        try {
          await HttpServer.get(host + '/needLogin', {
            accessId
          })
          throw new Error('因为 403 needLogin 这里不应该被执行到')
        } catch (e) {
          expect(e.message).to.equal(http.STATUS_CODES[403])
        }

        try {
          await HttpServer.get(host + '/aw2390', {
            accessId
          })
          throw new Error('因为 404 这里不应该被执行到')
        } catch (e) {
          expect(e.message).to.equal(http.STATUS_CODES[404])
        }
      })

      it('returns error message when timeout', async () => {
        try {
          const accessId = getAccessId()
          await HttpServer.get(host + '/timeout', {
            accessId,
            timeout: 100
          })
          throw new Error('由于网络超时，此处不该被执行')
        } catch (e) {
          expect(e.message).to.match(/timeout .* exceeded/)
        }
      })

      it('returns error message when netowrk is not valid', async () => {
        try {
          const accessId = getAccessId()

          // 这里只能用请求不存在的 url 来模拟网络问题
          await HttpServer.get('http://localhost:18309/awefjoi', {
            accessId
          })
          throw new Error('由于网络错误，此处不应该执行')
        } catch (e) {
          expect(e.message).to.match(/connect/)
        }
      })

      it('returns error message when response is 200 and error_code is not 0', async () => {
        const accessId = getAccessId()

        try {
          await HttpServer.get(host + '/getError', {
            accessId
          })
          throw new Error('此处不应该被执行到')
        } catch (e) {
          expect(e.message).to.equal('custom error')
        }
        try {
          const res = await HttpServer.get(host + '/getError2', {
            accessId
          })
          expect(res).to.equal('heihei')
        } catch (e) {
          throw new Error('此处不应该抛出错误: ' + e.message)
        }
      })

      it('sends query data with get method without cache', async () => {
        const accessId = getAccessId()
        const res = await HttpServer.get(host + '/query?a=1', {
          accessId,
          query: {
            name: 'HttpServer',
            age: '3'
          }
        })
        expect(res).to.have.keys(['a', 'name', 'age', 't'])
        expect(res.a).to.deep.equal('1')
        expect(res.name).to.equal('HttpServer')
        expect(res.age).to.equal('3')
        expect(res.t).to.not.empty
      })

      it('sends form data with post method', async () => {
        const accessId = getAccessId()
        const data = {
          from: 'superagent'
        }
        const res = await HttpServer.post(host + '/post', {
          accessId,
          data
        })
        expect(res).to.deep.equal(data)
      })

      it('sends form data with put method', async () => {
        const accessId = getAccessId()
        const data = {
          id: 2389,
          content: 'from put'
        }
        const res = await HttpServer.put(host + '/put/2', {
          accessId,
          data
        })
        expect(res).to.have.all.keys(Object.keys(data))
        expect(res.id).to.equal(data.id + '')
        expect(res.content).to.equal(data.content)
      })

      it('sends form data with patch method', async () => {
        const accessId = getAccessId()
        const data = {
          content: 'from put'
        }
        const res = await HttpServer.patch(host + '/patch/3', {
          accessId,
          data
        })
        expect(res).to.deep.equal(data)
      })

      it('modifies the request url if the url contains some expected pattern string', async () => {
        const accessId = getAccessId()
        const res = await HttpServer.get(host + '/test/{pattern}/home', {
          accessId,
          pattern: 'url/pattern'
        })
        expect(res).to.equal('ok')
      })

      it('sets request header with sponsorId if sponsorId is in params "user"', async () => {
        const accessId = getAccessId()
        const res = await HttpServer.get(host + '/test/requestHeader', {
          accessId,
          user: {
            sponsorId: 7
          }
        })
        expect(res).to.have.property('sponsorId', '7')
      })

    })

    describe('getStream method to fetch NTES user info stream', () => {

      it('getStream is a function and returns a Promise', async () => {
        expect(HttpServer.getStream).to.be.a('function')

        const m = HttpServer.getStream(host + '/p', {
          accessId: getAccessId()
        })

        expect(m).to.be.instanceof(Promise)
        const res = await m
        expect(res.body).to.have.all.keys(['error_code', 'data'])
        expect(res.body.error_code).to.equal(0)
        expect(res.body.data).to.deep.equal({
          method: 'GET'
        })
      })

      it('passes accessId to logger', () => {
        const n = javaLoggerSpy.callCount
        const accessId = getAccessId()
        HttpServer.getStream(host + '/p', {
          accessId
        })
        expect(javaLoggerSpy.callCount).to.equal(n + 1)
        expect(javaLoggerSpy.args[n][0]).to.equal(accessId)
      })

      it('receive data stream correctly', async () => {
        const res = await HttpServer.getStream(host + '/stream', {
          accessId: getAccessId()
        })
        expect(res.text).to.equal('hello world')
      })

      it('returns error message when timeout', async () => {
        try {
          const accessId = getAccessId()
          await HttpServer.get(host + '/timeout', {
            accessId,
            timeout: 100
          })
          throw new Error('由于网络超时，此处不该被执行')
        } catch (e) {
          expect(e.message).to.match(/timeout .* exceeded/)
        }
      })

      it('reject error if error occurs', async () => {
        try {
          await HttpServer.getStream(host + '/statusError', {
            accessId: getAccessId()
          })
          throw new Error('此处不应该被执行到')
        } catch (e) {
          expect(e.message).to.equal(http.STATUS_CODES[500])
        }
      })
    })

  })
})
