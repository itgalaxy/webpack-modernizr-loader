import fs from "fs";
import modernizrConfig from "./fixtures/.modernizrrc.json";
import path from "path";
import pify from "pify";
import tempy from "tempy";
import test from "ava";
import webpack from "webpack";

const loader = path.resolve(__dirname, "../index.js");
const fixturesDir = path.resolve(__dirname, "fixtures");

test("should execute successfully without any options`", t => {
  const buildDir = tempy.directory();
  const webpackConfig = {
    context: fixturesDir,
    entry: "./index.js",
    module: {
      rules: [
        {
          loader,
          test: /\.modernizrrc\.json$/
        }
      ]
    },
    output: {
      filename: "bundle.js",
      path: buildDir
    }
  };

  return pify(webpack)(webpackConfig).then(stats => {
    t.true(stats.compilation.errors.length === 0, "no compilation error");

    return pify(fs)
      .readFile(path.join(buildDir, "bundle.js"), "utf8")
      .then(data => {
        t.true(/Modernizr/.test(data));

        return Promise.resolve();
      });
  });
});

test('should execute successfully with JSON config and use `require("./.modernizrrc.json")`', t => {
  const buildDir = tempy.directory();
  const webpackConfig = {
    context: fixturesDir,
    entry: "./index.js",
    module: {
      rules: [
        {
          loader: `${loader}?useConfigFile`,
          test: /\.modernizrrc\.json$/
        }
      ]
    },
    output: {
      filename: "bundle.js",
      path: buildDir
    }
  };

  return pify(webpack)(webpackConfig).then(stats => {
    t.true(stats.compilation.errors.length === 0, "no compilation error");

    return pify(fs)
      .readFile(path.join(buildDir, "bundle.js"), "utf8")
      .then(data => {
        t.true(/addTest\('flexbox/.test(data));
        t.true(/addTest\('promise/.test(data));
        t.true(/addTest\('serviceworker/.test(data));

        return Promise.resolve();
      });
  });
});

test('should execute successfully with JSON config and use `require("modernizr")`', t => {
  const buildDir = tempy.directory();
  const webpackConfig = {
    context: fixturesDir,
    entry: "./index1.js",
    module: {
      rules: [
        {
          loader: `${loader}?useConfigFile`,
          test: /\.modernizrrc\.json$/
        }
      ]
    },
    output: {
      filename: "bundle.js",
      path: buildDir
    },
    resolve: {
      alias: {
        // eslint-disable-next-line id-match
        modernizr$: path.resolve(__dirname, "fixtures/.modernizrrc.json")
      }
    }
  };

  return pify(webpack)(webpackConfig).then(stats => {
    t.true(stats.compilation.errors.length === 0, "no compilation error");

    return pify(fs)
      .readFile(path.join(buildDir, "bundle.js"), "utf8")
      .then(data => {
        t.true(/addTest\('flexbox/.test(data));
        t.true(/addTest\('promise/.test(data));
        t.true(/addTest\('serviceworker/.test(data));

        return Promise.resolve();
      });
  });
});

test('should execute successfully with JS config and use `require("modernizr")`', t => {
  const buildDir = tempy.directory();
  const webpackConfig = {
    context: fixturesDir,
    entry: "./index1.js",
    module: {
      rules: [
        {
          loader: `${loader}?useConfigFile`,
          test: /\.modernizrrc\.js$/
        }
      ]
    },
    output: {
      filename: "bundle.js",
      path: buildDir
    },
    resolve: {
      alias: {
        // eslint-disable-next-line id-match
        modernizr$: path.resolve(__dirname, "fixtures/.modernizrrc.js")
      }
    }
  };

  return pify(webpack)(webpackConfig).then(stats => {
    t.true(stats.compilation.errors.length === 0, "no compilation error");

    return pify(fs)
      .readFile(path.join(buildDir, "bundle.js"), "utf8")
      .then(data => {
        t.true(/addTest\('flexbox/.test(data));
        t.true(/addTest\('promise/.test(data));
        t.true(/addTest\('serviceworker/.test(data));

        return Promise.resolve();
      });
  });
});

test('should execute successfully with JS config and use `require("./.modernizrrc.js")`', t => {
  const buildDir = tempy.directory();
  const webpackConfig = {
    context: fixturesDir,
    entry: "./index2.js",
    module: {
      rules: [
        {
          loader: `${loader}?useConfigFile`,
          test: /\.modernizrrc\.js$/
        }
      ]
    },
    output: {
      filename: "bundle.js",
      path: buildDir
    }
  };

  return pify(webpack)(webpackConfig).then(stats => {
    t.true(stats.compilation.errors.length === 0, "no compilation error");

    return pify(fs)
      .readFile(path.join(buildDir, "bundle.js"), "utf8")
      .then(data => {
        t.true(/addTest\('flexbox/.test(data));
        t.true(/addTest\('promise/.test(data));
        t.true(/addTest\('serviceworker/.test(data));

        return Promise.resolve();
      });
  });
});

test("should supported `config` from `options`", t => {
  const buildDir = tempy.directory();
  const webpackConfig = {
    context: fixturesDir,
    entry: "./index1.js",
    module: {
      rules: [
        {
          loader,
          options: modernizrConfig,
          test: /modernizr\.js$/
        }
      ]
    },
    output: {
      filename: "bundle.js",
      path: buildDir
    },
    resolve: {
      alias: {
        // eslint-disable-next-line id-match
        modernizr$: `${path.resolve(__dirname, "fixtures/modernizr.js")}`
      }
    }
  };

  return pify(webpack)(webpackConfig).then(stats => {
    t.true(stats.compilation.errors.length === 0, "no compilation error");

    return pify(fs)
      .readFile(path.join(buildDir, "bundle.js"), "utf8")
      .then(data => {
        t.true(/addTest\('flexbox/.test(data));
        t.true(/addTest\('promise/.test(data));
        t.true(/addTest\('serviceworker/.test(data));

        return Promise.resolve();
      });
  });
});

test('should supported `config` from "query string"', t => {
  const buildDir = tempy.directory();
  const webpackConfig = {
    context: fixturesDir,
    entry: "./index.js",
    module: {
      rules: [
        {
          loader: `${loader}?${JSON.stringify(modernizrConfig)}`,
          test: /\.modernizrrc\.json$/
        }
      ]
    },
    output: {
      filename: "bundle.js",
      path: buildDir
    }
  };

  return pify(webpack)(webpackConfig).then(stats => {
    t.true(stats.compilation.errors.length === 0, "no compilation error");

    return pify(fs)
      .readFile(path.join(buildDir, "bundle.js"), "utf8")
      .then(data => {
        t.true(/addTest\('flexbox/.test(data));
        t.true(/addTest\('promise/.test(data));
        t.true(/addTest\('serviceworker/.test(data));

        return Promise.resolve();
      });
  });
});
