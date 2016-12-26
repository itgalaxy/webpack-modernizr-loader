/* eslint-disable strict, import/no-commonjs */

'use strict';

const modernizr = require('modernizr');
const querystring = require('querystring');

function wrapOutput(output) {
    // Exposing Modernizr as a module.
    return '(function (root, factory) {'
        + "'use strict';"
        + "if (typeof define === 'function' && define.amd) {"
        + 'define([], factory);'
        + "} else if (typeof exports === 'object'"
        + "&& typeof module !== 'undefined'"
        + "&& typeof require === 'function'"
        + ') {'
        + 'module.exports = factory();'
        + '} else {'
        + 'factory();'
        + '}'
        + '})(this, function () {'
        + `'use strict';${output};`
        + '});';
}

function isJSON(str) {
    try {
        JSON.parse(str);
    } catch (error) { // eslint-disable-line no-unused-vars
        return false;
    }

    return true;
}

module.exports = function (resolveConfig) {
    if (typeof this.cacheable === 'function') {
        this.cacheable();
    }

    const callback = this.async();

    let externalConfig = null;

    if (this.query.length > 0) {
        let parsedQuery = {};

        if (this.query.length > 0) {
            parsedQuery = querystring.parse(this.query.slice(1, this.query.length));
        }

        if (parsedQuery.config) {
            externalConfig = JSON.parse(parsedQuery.config);
        }
    } else if (resolveConfig) {
        externalConfig = isJSON(resolveConfig)
            ? JSON.parse(resolveConfig)
            : this.exec(resolveConfig, this.resource);
    }

    const config = Object.assign({}, externalConfig);

    modernizr.build(config, (output) => callback(null, wrapOutput(output)));
};
