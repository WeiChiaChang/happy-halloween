# express-autoprefixer


[![NPM version](https://badge.fury.io/js/express-autoprefixer.svg)](http://badge.fury.io/js/express-autoprefixer)
[![Build Status](https://travis-ci.org/gustavnikolaj/express-autoprefixer.svg?branch=master)](https://travis-ci.org/gustavnikolaj/express-autoprefixer)
[![Dependency Status](https://david-dm.org/gustavnikolaj/express-autoprefixer.png)](https://david-dm.org/gustavnikolaj/express-autoprefixer)

Middleware that prefixes css on-the-fly. Intended to be used in a
development setting with the `express.static` middleware, but should
work with any middleware further down the stack, even an http proxy.

The response will be rewritten under these circumstances:

* If the response is served with a `Content-Type` of `text/css`.

autoprefixer plays nice with conditional GET. If the original response
has an ETag, autoprefixer will add to it so the ETag of the compiled
response never clashes with the original ETag. That prevents the
middleware issuing the original response from being confused into
sending a false positive `304 Not Modified` if autoprefixer is turned
off or removed from the stack later.

## Important note regarding node 0.10

Major versions of autoprefixer higher than 5 will not support node 0.10, as they
rely on features not supported in that version. If you are still using node 0.10
you should stick to autoprefixer in the 5-series, and use express-autoprefixer
from the major version 4 range.

Major version 5 and later of express-autoprefixer will use autoprefixer version
6, and will hence no longer support node 0.10.

## Installation

Make sure you have node.js and npm installed, then run:

    npm install express-autoprefixer

## Example usage

```javascript
var express = require('express'),
    autoprefixer = require('express-autoprefixer'),
    root = '/path/to/my/static/files';

express.createServer()
    .use(autoprefixer({ browsers: 'last 2 versions', cascade: false }))
    .use(express.static(root))
    .listen(1337);
```

## License

3-clause BSD license -- see the `LICENSE` file for details.

## Credit

This module is heavily based on the work of Andreas Lind Petersen
([@papandreou](https://github.com/papandreou)) in his module
[express-compiless](https://github.com/papandreou/express-compiless).
