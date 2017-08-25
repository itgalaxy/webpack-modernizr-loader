"use strict";

const modernizr = require("modernizr");
const loaderUtils = require("loader-utils");

function wrapOutput(output) {
  // Exposing Modernizr as a module.
  return `;(function(window){var hadGlobal = 'Modernizr' in window;var oldGlobal = window.Modernizr;${output};module.exports = window.Modernizr;if (hadGlobal) { window.Modernizr = oldGlobal; }else { delete window.Modernizr; }})(window);`;
}

function isJSON(str) {
  try {
    JSON.parse(str);
    // eslint-disable-next-line no-unused-vars
  } catch (error) {
    return false;
  }

  return true;
}

module.exports = function(resolveConfig) {
  const callback = this.async();
  const options = loaderUtils.getOptions(this);

  let userConfig = null;

  if (options) {
    if (options.useConfigFile) {
      userConfig =
        resolveConfig && isJSON(resolveConfig)
          ? JSON.parse(resolveConfig)
          : this.exec(resolveConfig, this.resource);
    } else {
      userConfig = options;
    }
  } else {
    userConfig = {};
  }

  const config = Object.assign({}, userConfig);

  modernizr.build(config, output => callback(null, wrapOutput(output)));
};
