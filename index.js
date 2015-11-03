const debug = require('debug')('tiny-bench')
const thunky = require('thunky')
const suite = require('./lib/suite')
const benchmark = require('./lib/benchmark')
const pump = require('pump')

const lazy = thunky(function createHarness(callback) {
  callback(suite())
})

module.exports = bench

function bench(name, iterations, fn) {
  debug('setting up: "%s"', name)
  // The length of the arguments expected defined by bench.
  var length = this.length
  var args = new Array(length)
  for (var i = 0; i < length; i++) { args.push(arguments[i]) }
  var source = benchmark.apply(null, args)

  process.nextTick(function next() {
    lazy(harness)
  })

  function harness(suite) {
    debug('running: "%s"', name)
    pump(source, suite)
  }
}
