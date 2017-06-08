import { expect } from 'chai'
import express from 'express'
import bodyParser from 'body-parser'
import http from 'http'
import Promise from 'bluebird'
import HttpClient from '../../src/core/HttpClient'

/* eslint-disable no-await-in-loop */
describe('core', () => {
  describe('HttpClient', () => {

    let server
    const port = 10111
    const host = `http://localhost:${port}`
    const testMethods = ['get', 'post']

    before((done) => {
      const app = express()

      app.use(bodyParser.urlencoded({
        extended: true,
      }))

      app.use('/p', (req, res) => {
        res.status(200).send({
          method: req.method,
          s: 'got it',
        })
      })

      app.use('/json', (req, res) => {
        res.status(200).send({
          json: true,
        })
      })

      app.use('/notjson', (req, res) => {
        res.status(200).send('nojson')
      })

      app.use('/needLogin', (req, res) => {
        res.status(403).send('needLogin')
      })

      app.use('/forbid', (req, res) => {
        res.status(403).send('u have no access to this url')
      })

      app.use('/statusError', (req, res) => {
        res.status(500).send(http.STATUS_CODES[500])
      })

      app.use('/timeout', (req, res) => {
        setTimeout(() => {
          res.status(200).send({
            timeout: true,
          })
        }, 300)
      })

      app.use('/getError', (req, res) => {
        res.status(200).send({
          errcode: 1,
          errmsg: 'custom error',
        })
      })

      app.use('/getError2', (req, res) => {
        res.status(200).send({
          errcode: 0,
          errmsg: 'heihei',
        })
      })

      app.use('/query', (req, res) => {
        res.status(200).send({
          params: req.query,
        })
      })

      app.use('/post', (req, res) => {
        res.status(200).send({
          post: req.body,
        })
      })

      server = http.createServer(app).listen(port, done)

    })

    after(() => {
      server && server.close()
    })

    /* eslint-disable prefer-template */
    it('contains only two requests (  get/post ) which return a Promise', async () => {

      expect(HttpClient).to.have.all.keys(testMethods)

      for (const method of testMethods) { // eslint-disable-line
        expect(HttpClient[method]).to.be.a('function')
        const m = HttpClient[method](host + '/p')
        expect(m).to.be.instanceof(Promise)
        const res = await m
        expect(res).to.include.keys('method')
        expect(res.method).to.equal(method.toUpperCase())
      }
    })

    it('returns json data', async () => {
      for (const method of testMethods) {  // eslint-disable-line
        const res = await HttpClient[method](host + '/json')
        expect(res).to.be.an('object')
          .and.to.deep.equal({
            json: true,
          })
      }
      try {
        await HttpClient.get(host + '/notjson')
        throw new Error('这里不应该被执行到')
      } catch (e) {
        expect(e).to.match(/^Unexpected token/)
      }
    })

    it('returns error message when response is 403 error', async () => {
      try {
        await HttpClient.get(host + '/needLogin')
        throw new Error('因为 403 needLogin 这里不应该被执行到')
      } catch (e) {
        expect(e).to.match(/重新登录/)
      }
      try {
        await HttpClient.get(host + '/forbid')
        throw new Error('因为 403 这里不应该被执行到')
      } catch (e) {
        expect(e).to.equal('u have no access to this url')
      }
    })

    it('returns error message when response is error except 403', async () => {
      try {
        await HttpClient.get(host + '/aw2390')
        throw new Error('因为 404 这里不应该被执行到')
      } catch (e) {
        expect(e).to.equal(http.STATUS_CODES[404])
      }
    })

    it('returns error message when timeout', async () => {
      try {
        await HttpClient.get(host + '/timeout', { timeout: 100 })
        throw new Error('由于网络超时，此处不该被执行')
      } catch (e) {
        expect(e).to.equal('请求超时')
      }
    })

    it('returns error message when netowrk is not valid', async () => {
      try {
        // 这里只能用请求不存在的 url 来模拟网络问题
        await HttpClient.get('http://localhost:18309/awefjoi')
        throw new Error('由于网络错误，此处不应该执行')
      } catch (e) {
        expect(e).to.equal('网络错误')
      }
    })

    it('returns error message when response is 200 and errcode is not 0', async () => {
      try {
        await HttpClient.get(host + '/getError')
        throw new Error('此处不应该被执行到')
      } catch (e) {
        expect(e).to.equal('custom error')
      }
      try {
        const res = await HttpClient.get(host + '/getError2')
        expect(res).to.deep.equal({
          errcode: 0,
          errmsg: 'heihei',
        })
      } catch (e) {
        throw new Error('此处不应该抛出错误: ' + e.message)
      }
    })

    it('sends query data with get method without cache', async () => {
      const res = await HttpClient.get(host + '/query?a=1', {
        data: {
          name: 'HttpClient',
          age: '3',
        },
      })
      expect(res).to.have.all.keys('params')
      expect(res.params).to.have.keys(['a', 'name', 'age', 't'])
      expect(res.params.a).to.deep.equal('1')
      expect(res.params.name).to.equal('HttpClient')
      expect(res.params.age).to.equal('3')
      expect(res.params.t).to.not.empty
    })

    it('sends form data with post method', async () => {
      const data = {
        method: 'post',
        type: 'form',
      }
      const res = await HttpClient.post(host + '/post', {
        data,
      })
      expect(res).to.have.all.keys('post')
      expect(res.post).to.have.all.keys(['method', 'type'])
      expect(res.post).to.deep.equal(data)
    })

  })

});
