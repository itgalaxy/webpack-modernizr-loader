# webpack-modernizr-loader

[![NPM version](https://img.shields.io/npm/v/webpack-modernizr-loader.svg)](https://www.npmjs.org/package/webpack-modernizr-loader)
[![Travis Build Status](https://img.shields.io/travis/itgalaxy/webpack-modernizr-loader/master.svg?label=build)](https://travis-ci.org/itgalaxy/webpack-modernizr-loader)
[![dependencies Status](https://david-dm.org/itgalaxy/webpack-modernizr-loader/status.svg)](https://david-dm.org/itgalaxy/webpack-modernizr-loader)
[![devDependencies Status](https://david-dm.org/itgalaxy/webpack-modernizr-loader/dev-status.svg)](https://david-dm.org/itgalaxy/webpack-modernizr-loader?type=dev)
[![Greenkeeper badge](https://badges.greenkeeper.io/itgalaxy/webpack-modernizr-loader.svg)](https://greenkeeper.io/)

Get your modernizr build bundled with webpack.

## Installation

```shell
$ npm install webpack-modernizr-loader --save-dev
```

## Initialization

You have to create a `.modernizrrc` (or `.modernizrrc.js`) configuration file and put your modernizr stuff in it. 
Like so:

```json
// .modernizrrc or .modernizrrc.json
{
    "options": [
        "setClasses"
    ],
    "feature-detects": [
        "test/css/flexbox",
        "test/es6/promises",
        "test/serviceworker"
    ]
}
```

Or

```js
'use strict';

module.exports = {
    options: [
        "setClasses"
    ],
    "feature-detects": [
        "test/css/flexbox",
        "test/es6/promises",
        "test/serviceworker"
    ]
};
```

Full list of supported **"options"** and their **"description"** can be found in [modernizr](https://github.com/Modernizr/Modernizr).

### Webpack config

[Documentation: Using loaders](http://webpack.github.io/docs/using-loaders.html)

Put the following code to your webpack config file:

```javascript
module.exports = {
    module: {
        loaders: [
            {
                loader: 'webpack-modernizr?useConfigFile',
                test: /\.modernizrrc$/, // or "/\.modernizrrc\.json$/", or "/\.modernizrrc\.js$/"
            }
        ]
    },
    resolve: {
        alias: {
            modernizr$: path.resolve(__dirname, "path/to/.modernizrrc") // or "path/to/.modernizrrc.json", or "path/to/.modernizrrc.js"
        }
    }
}
```

Alternative configurations supported dynamic configuration:

```javascript
const modernizrOptions = {
    options: [
        "setClasses"
    ],
    'feature-detects': [
        'test/css/flexbox',
        'test/es6/promises',
        'test/serviceworker'
    ]
};

module.exports = {
    module: {
        loaders: [
            {
                loader: `webpack-modernizr?${JSON.stringify(modernizrOptions)}`,
                test: /modernizr$/
            }
        ]
    },
    resolve: {
        alias: {
            modernizr$: path.resolve(__dirname, "path/to/empty-file") // You can add comment "Please do not delete this file" in this file
        }
    }
}
```

In `webpack 2` your can use this config:

```javascript
const modernizrOptions = {
    options: [
        "setClasses"
    ],
    'feature-detects': [
        'test/css/flexbox',
        'test/es6/promises',
        'test/serviceworker'
    ]
};

module.exports = {
    module: {
        rules: [
            {
                loader: `webpack-modernizr-loader`,
                options: modernizrOptions,
                test: /modernizr$/
            }
        ]
    },
    resolve: {
        alias: {
            modernizr$: path.resolve(__dirname, "path/to/empty-file") // You can add comment "Please do not delete this file" in this file
        }
    }
}
```

### Usage

Now you are able to import your custom modernizr build as a module throughout your application like so:

```javascript
const modernizr = require('modernizr');
```

```javascript
import 'modernizr';
```

You can used [bundle](https://github.com/webpack/bundle-loader) plugin for async loading:

```javascript
import modernizrLoader from 'bundle?lazy!modernizr';

modernizrLoader(() => {});
```

## Related

-   [Modernizr](https://github.com/Modernizr/Modernizr) - API for this module

## Contribution

Feel free to push your code if you agree with publishing under the MIT license.

## [Changelog](CHANGELOG.md)

## [License](LICENSE)
