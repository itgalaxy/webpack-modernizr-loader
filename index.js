/* eslint-disable strict, import/no-commonjs */

'use strict';

const modernizr = require('modernizr');
const loaderUtils = require('loader-utils');

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
    const options = loaderUtils.getOptions(this);

    let userConfig = null;

    if (options) {
        if (options.useConfigFile) {
            userConfig = resolveConfig && isJSON(resolveConfig)
                ? JSON.parse(resolveConfig)
                : this.exec(resolveConfig, this.resource);
        } else {
            userConfig = options;
        }
    } else {
        userConfig = {};
    }

    const config = Object.assign({}, userConfig);

    modernizr.build(config, (output) => callback(null, wrapOutput(output)));
};
