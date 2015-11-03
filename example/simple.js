var bench = require('../')
var assert = require('assert')

bench('for loop', 2000, function(done) {
  var original = [ 1, 2, 3, 4 ]
  var clone = []
  var length = array.length;
  for (var i = 0; i < length; i++) {
    clone.push(original[i])
  }

  done()
})

bench('forEach', 2000, function(done) {
  var original = [ 1, 2, 3, 4 ]
  var clone = []
  original.forEach(function(item) {
    clone.push(item)
  })

  done()
})
