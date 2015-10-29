# tiny-bench

STATUS: Experimental

A` tap-like module for running benchmarks.

    var bench = require('tiny-bench')

    bench('name of your benchmark', function(done) {
      // Your code to benmark here.
      done() // call done once your code is done, this is useful for async code.
    })

Your benchmarks can then be simply run with node:

    node my-bencmarks.js

Benchmarks are run synchronously, that is subsequent calls to the `bench`
function will not execute until the previous one has finished.

## Pipeline

## API

## Development

## License

ISC License (ISC)
