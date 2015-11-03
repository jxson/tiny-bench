const Readable = require('readable-stream/duplex')
const inherits = require('inherits')
const debug = require('debug')('tiny-bench:benchmark')

module.exports = Benchmark

function Benchmark(name, iterations, fn) {
  if (!(this instanceof Benchmark)) return new Benchmark(name, iterations, fn)

  Readable.call(this)
}

inherits(Benchmark, Readable)

Benchmark.prototype._read = function(size) {
  debug('_read: %s', size)
}
