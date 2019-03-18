"use strict";

const MIN_BABEL_VERSION = 7;

module.exports = function preset(api) {
  api.assertVersion(MIN_BABEL_VERSION);

  // Cache the returned value forever and don't call this function again.
  api.cache(true);

  return {
    presets: [
      [
        "@babel/preset-env",
        {
          targets: {
            node: "6.9.0"
          }
        }
      ]
    ]
  };
};
