import { expect } from 'chai'

/* eslint-disable no-underscore-dangle */

describe('core', () => {
  describe('utils', () => {
    describe('formatInteger', () => {
      describe('test in browser environment', () => {

        delete require.cache[require.resolve('../../src/core/utils')];

        const sysFormater = new Intl.NumberFormat('zh-Hans-CN')
        global._Intl = global.Intl
        delete global.Intl

        const formatInteger = require('../../src/core/utils').formatInteger;

        global.Intl = global._Intl
        delete global._Intl

        const assert = n => expect(formatInteger(n)).to.equal(sysFormater.format(n))

        it('format 0', () => {
          assert(0)
        })

        it('format negative number, e.g. -3829', () => {
          assert(-3829)
        })

        it('format positive number greater than 0 and less than 1000, e.g. 912', () => {
          assert(912)
        })

        it('format positive number greater than 1000 and less than 1e6, e.g. 172910', () => {
          assert(172910)
        })

        it('format positive number greater than 1e6 and less than 1e9, e.g. 238128924', () => {
          assert(238128924)
        })

        it('format positive number greater than 1e9, e.g. 238127589624', () => {
          assert(238127589624)
        })
      })

      describe('test in node environment', () => {
        delete require.cache[require.resolve('../../src/core/utils')];
        const formatInteger = require('../../src/core/utils').formatInteger;

        it('format 0', () => {
          expect(formatInteger(0)).to.equal('0')
        })

        it('format negative number, e.g. -4814748', () => {
          expect(formatInteger(-4814748)).to.equal('-4,814,748')
        })

        it('format positive number greater than 0 and less than 1000, e.g. 827', () => {
          expect(formatInteger(827)).to.equal('827')
        })

        it('format positive number greater than 1000 and less than 1e6, e.g. 27392', () => {
          expect(formatInteger(27392)).to.equal('27,392')
        })

        it('format positive number greater than 1e6 and less than 1e9, e.g. 91834643', () => {
          expect(formatInteger(91834643)).to.equal('91,834,643')
        })

        it('format positive number greater than 1e9, e.g. 832153010136', () => {
          expect(formatInteger(832153010136)).to.equal('832,153,010,136')
        })
      })
    })

    describe('emptyFunction', () => {
      const emptyFunction = require('../../src/core/utils').emptyFunction

      it('emptyFunction does nothing', () => {
        emptyFunction(); // just let it run once
      })
    })

    describe('getDebugger', () => {
      describe('test in production environment', () => {
        let utils
        let getDebugger

        before(() => {
          global.__oldDEV__ = global.__DEV__
          global.__DEV__ = false

          delete require.cache[require.resolve('../../src/core/utils')]
          utils = require('../../src/core/utils')
          getDebugger = utils.getDebugger
        })

        after(() => {
          global.__DEV__ = global.__oldDEV__
          delete global.__oldDEV__
        })

        it('expect getDebugger returns a empty function', () => {
          expect(getDebugger('tweio')).to.equal(utils.emptyFunction)
        })
      })

      describe('test in development environment', () => {
        let utils
        let getDebugger

        before(() => {
          global.__oldDEV__ = global.__DEV__
          global.__DEV__ = true

          delete require.cache[require.resolve('../../src/core/utils')]
          utils = require('../../src/core/utils')
          getDebugger = utils.getDebugger
        })

        after(() => {
          global.__DEV__ = global.__oldDEV__
          delete global.__oldDEV__
        })

        it('expect getDebugger returns a non empty function', () => {
          expect(getDebugger('awef')).to.not.equal(utils.emptyFunction)
        })
      })
    })
  })
})
