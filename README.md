# webpack-modernizr-loader

[![NPM version](https://img.shields.io/npm/v/webpack-modernizr-loader.svg)](https://www.npmjs.org/package/webpack-modernizr-loader)
[![Travis Build Status](https://img.shields.io/travis/itgalaxy/webpack-modernizr-loader/master.svg?label=build)](https://travis-ci.org/itgalaxy/webpack-modernizr-loader)
[![dependencies Status](https://david-dm.org/itgalaxy/webpack-modernizr-loader/status.svg)](https://david-dm.org/itgalaxy/webpack-modernizr-loader)
[![devDependencies Status](https://david-dm.org/itgalaxy/webpack-modernizr-loader/dev-status.svg)](https://david-dm.org/itgalaxy/webpack-modernizr-loader?type=dev)

Get your modernizr build bundled with webpack.

## Installation

```shell
$ npm install webpack-modernizr-loader --save-dev
```

## Usage

[Documentation: Using loaders](http://webpack.github.io/docs/using-loaders.html)

There are three use case.

1. Using loader `options`.

```javascript
const modernizr = require("modernizr");
```

**webpack.config.js**

```javascript
module.exports = {
  module: {
    rules: [
      {
        loader: "webpack-modernizr-loader",
        options: {
          // Full list of supported options can be found in [config-all.json](https://github.com/Modernizr/Modernizr/blob/master/lib/config-all.json).
          options: ["setClasses"],
          "feature-detects": [
            "test/css/flexbox",
            "test/es6/promises",
            "test/serviceworker"
          ]
          // Uncomment this when you use `JSON` format for configuration
          // type: 'javascript/auto'
        },
        test: /empty-alias-file\.js$/
      }
    ]
  },
  resolve: {
    alias: {
      // You can add comment "Please do not delete this file" in this file
      modernizr$: path.resolve(__dirname, "/path/to/empty-alias-file.js")
    }
  }
};
```

2. Using config file through alias (supported **JavaScript** and **JSON** syntax).

```javascript
const modernizr = require("modernizr");
```

**.modernizrrc.js**

```javascript
module.exports = {
  options: ["setClasses"],
  "feature-detects": [
    "test/css/flexbox",
    "test/es6/promises",
    "test/serviceworker"
  ]
};
```

**webpack.config.js**

```javascript
module.exports = {
  module: {
    rules: [
      {
        loader: "webpack-modernizr-loader",
        test: /\.modernizrrc\.js$/
        // Uncomment this when you use `JSON` format for configuration
        // type: 'javascript/auto'
      }
    ]
  },
  resolve: {
    alias: {
      modernizr$: path.resolve(__dirname, "/path/to/.modernizrrc.js")
    }
  }
};
```

3. Using config (supported **JavaScript** and **JSON** syntax) file directly (see below example how it is use).

```javascript
const modernizr = require("modernizr");
```

**webpack.config.js**

```javascript
module.exports = {
  module: {
    rules: [
      {
        loader: "webpack-modernizr-loader",
        test: /\.modernizrrc\.js$/
        // Uncomment this when you use `JSON` format for configuration
        // type: 'javascript/auto'
      }
    ]
  }
};
```

## Related

- [Modernizr](https://github.com/Modernizr/Modernizr) - API for this module

## Contribution

Feel free to push your code if you agree with publishing under the MIT license.

## [Changelog](CHANGELOG.md)

## [License](LICENSE)
