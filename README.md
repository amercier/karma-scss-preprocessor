karma-scss-preprocessor
=======================

[![Latest Stable Version](https://img.shields.io/npm/v/karma-scss-preprocessor.svg)](https://www.npmjs.com/package/karma-scss-preprocessor)
[![License](https://img.shields.io/npm/l/karma-scss-preprocessor.svg)](https://www.npmjs.com/package/karma-scss-preprocessor)
[![NPM Downloads](https://img.shields.io/npm/dm/karma-scss-preprocessor.svg)](https://www.npmjs.com/package/karma-scss-preprocessor)

[![Build Status](https://img.shields.io/travis/amercier/karma-scss-preprocessor/master.svg)](https://travis-ci.org/amercier/karma-scss-preprocessor)
[![Test Coverage](https://img.shields.io/codecov/c/github/amercier/karma-scss-preprocessor/master.svg)](https://codecov.io/github/amercier/karma-scss-preprocessor?branch=master)
[![dependencies Status](https://david-dm.org/amercier/karma-scss-preprocessor/status.svg)](https://david-dm.org/amercier/karma-scss-preprocessor)
[![devDependencies Status](https://david-dm.org/amercier/karma-scss-preprocessor/dev-status.svg)](https://david-dm.org/amercier/karma-scss-preprocessor?type=dev)
[![peerDependencies Status](https://david-dm.org/amercier/karma-scss-preprocessor/peer-status.svg)](https://david-dm.org/amercier/karma-scss-preprocessor?type=peer)

> Karma preprocessor to compile Sass files on the fly with [node-sass](https://www.npmjs.com/package/node-sass).
> In contrast of [karma-sass-preprocessor](https://www.npmjs.com/package/karma-sass-preprocessor),
> it does not write any intermediate file to the disk, and does not use any
> [Gulp](http://gulpjs.com/) plugin.

Installation
------------

```bash
npm install karma-scss-preprocessor node-sass --save-dev
```

Note: since v2.0, [node-sass](https://www.npmjs.com/package/node-sass) is used
as a [peer dependency](https://docs.npmjs.com/files/package.json#peerdependencies).
That is why you need to install it along with this module.

Configuration
-------------

See [node-sass options](https://www.npmjs.com/package/node-sass) for more
details.

```js
module.exports = function (config) {
  config.set({
    preprocessors: {
      'src/**/*.scss': ['scss']
    },
    scssPreprocessor: {
      options: {
        sourceMap: true,
        includePaths: ['bower_components']
      }
    }
  });
};
```
