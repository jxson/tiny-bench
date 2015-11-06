const Readable = require('readable-stream/readable')
const inherits = require('inherits')
const debug = require('debug')('tiny-bench:benchmark')
const defaults = {
  objectMode: true,
  highWaterMark: 16
}

module.exports = Benchmark

function Benchmark(name, iterations, fn) {
  if (!(this instanceof Benchmark)) return new Benchmark(name, iterations, fn)

  var benchmark = this

  benchmark.name = name
  benchmark.iterations = iterations
  benchmark.fn = fn

  Readable.call(this, defaults)
}

inherits(Benchmark, Readable)

Benchmark.prototype._read = function(size) {
  debug('_read: %s', size)

  var benchmark = this
  if (benchmark.iterations === 0) {
    benchmark.push(null)
    return
  }

  var stats = {
    name: benchmark.name,
    iteration: benchmark.iterations,
    start: Date.now(),
    end: null
  }

  benchmark.fn(done)

  function done() {
    stats.end = Date.now()
    benchmark.iterations--
    benchmark.push(stats)
  }
}
