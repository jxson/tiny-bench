const debug = require('debug')('tiny-bench')
const thunky = require('thunky')
const suite = require('./lib/suite')
const benchmark = require('./lib/benchmark')
const pump = require('pump')

const through = require('through2')

const setup = thunky(function createHarness(callback) {
  process.nextTick(function next() {
    var stream = suite()
    pump(stream, through.obj(function(obj, enc, cb) {
      cb(null, JSON.stringify(obj) + '\n')
    }), process.stdout)
    callback(stream)
  })
})

module.exports = bench

function bench(name, iterations, fn) {
  debug('setting up: "%s"', name)
  var chunk = benchmark(name, iterations, fn)
  setup(function onsetup(suite) {
    debug('running: "%s"', name)
    suite.write(chunk)
  })
}
