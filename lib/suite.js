const Duplex = require('readable-stream/duplex')
const inherits = require('inherits')
const debug = require('debug')('tiny-bench:suite')
const extend = require('xtend')
const defaults = {

}

module.exports = Suite

function Suite(options) {
  if (!(this instanceof Suite)) return new Suite(options)
  options = extend(defaults, options)


  Duplex.call(this, options)
}

inherits(Suite, Duplex)

Suite.prototype._read = function(size) {
  debug('_read: %s', size)
}

Suite.prototype._write = function(chunk, encoding, callback) {
  debug('_write: %s, %s', chunk.toString(), encoding)
}
