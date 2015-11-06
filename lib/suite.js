const eos = require('end-of-stream');
const Transform = require('readable-stream/transform')
const Duplex = require('readable-stream/duplex')
const inherits = require('inherits')
const Benchmark = require('./benchmark')
const debug = require('debug')('tiny-bench:suite')
const extend = require('xtend')
const pump = require('pump')
const defaults = {
  objectMode: true,
  highWaterMark: 16
}

module.exports = Suite

function Suite(options) {
  if (!(this instanceof Suite)) return new Suite(options)
  options = extend(defaults, options, { objectMode: true })

  var suite = this;

  Transform.call(this, options)
}

inherits(Suite, Transform)

Suite.prototype._transform = function(benchmark, enc, callback) {
  var suite = this
  if (!(benchmark instanceof Benchmark)) {
    var err = new Error('Stream only handles Benchmark instances.')
    return callback(err)
  }

  debug('_transform: "%s"', benchmark.name)

  eos(benchmark, callback)

  benchmark.on('data', function onreport(report) {
    if (! report) {
      return
    }

    var pushed = suite.push(report)
    if (! pushed) {
      benchmark.pause()
    }
  })
}
