"use strict";

const modernizr = require("modernizr");
const loaderUtils = require("loader-utils");

function wrapOutput(output, asEsModule) {
  // Exposing Modernizr as a module.
  if (asEsModule) {
    return `var hadGlobal='Modernizr' in window;var oldGlobal=window.Modernizr;${output}export default window.Modernizr;if(hadGlobal){window.Modernizr=oldGlobal;}else{delete window.Modernizr;};`;
  }
  return `;(function(window){var hadGlobal='Modernizr' in window;var oldGlobal=window.Modernizr;${output}module.exports=window.Modernizr;if(hadGlobal){window.Modernizr=oldGlobal;}else{delete window.Modernizr;}})(window);`;
}

module.exports = function() {
  const callback = this.async();
  const options = loaderUtils.getOptions(this) || {};
  const esModule = options.esModule;

  delete options.esModule;

  let userConfig = {};

  if (Object.keys(options).length === 0) {
    try {
      // eslint-disable-next-line import/no-dynamic-require, global-require
      userConfig = require(this.resource);
    } catch (error) {
      return callback(error);
    }
  } else {
    userConfig = options;
  }

  const config = Object.assign({}, userConfig);

  return modernizr.build(config, output => callback(null, wrapOutput(output, esModule)));
};
