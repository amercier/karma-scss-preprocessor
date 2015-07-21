karma-scss-preprocessor
=======================

[![npm version](https://img.shields.io/npm/v/karma-scss-preprocessor.svg)](https://www.npmjs.org/package/karma-scss-preprocessor)
[![npm downloads](https://img.shields.io/npm/dm/karma-scss-preprocessor.svg)](https://www.npmjs.org/package/karma-scss-preprocessor)

> Karma preprocessor to compile SCSS on the fly with [node-sass](https://www.npmjs.com/package/node-sass).


Installation
------------

```bash
npm install karma-scss-preprocessor --save-dev
```


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
      sourceMap: true,
      includePaths: [
        'bower_components'
      ]
    }
  });
};
```
