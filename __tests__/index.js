import fs from "fs";
import modernizrConfigJSONRc from "./fixtures/.modernizrrc.json";
import path from "path";
import pify from "pify";
import tempy from "tempy";
import test from "ava";
import webpack from "webpack";

const loader = path.resolve(__dirname, "../index.js");
const fixturesDir = path.resolve(__dirname, "fixtures");

test("should execute successfully using config file inside `require`", t => {
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
    t.true(stats.compilation.warnings.length === 0, "no compilation warnings");
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

test("should execute successfully using options and alias with empty file", t => {
  const buildDir = tempy.directory();
  const webpackConfig = {
    context: fixturesDir,
    entry: "./index-1.js",
    module: {
      rules: [
        {
          loader,
          options: modernizrConfigJSONRc,
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
        modernizr$: `${path.resolve(__dirname, "fixtures/modernizr.js")}` // eslint-disable-line id-match
      }
    }
  };

  return pify(webpack)(webpackConfig).then(stats => {
    t.true(stats.compilation.warnings.length === 0, "no compilation warnings");
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

test("should execute successfully using options and alias with non-empty file", t => {
  const buildDir = tempy.directory();
  const webpackConfig = {
    context: fixturesDir,
    entry: "./index-1.js",
    module: {
      rules: [
        {
          loader,
          options: modernizrConfigJSONRc,
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
        modernizr$: `${path.resolve(__dirname, "fixtures/.modernizrrc.js")}` // eslint-disable-line id-match
      }
    }
  };

  return pify(webpack)(webpackConfig).then(stats => {
    t.true(stats.compilation.warnings.length === 0, "no compilation warnings");
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

test("should execute successfully using alias with empty file", t => {
  const buildDir = tempy.directory();
  const webpackConfig = {
    context: fixturesDir,
    entry: "./index-1.js",
    module: {
      rules: [
        {
          loader,
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
        modernizr$: `${path.resolve(__dirname, "fixtures/modernizr.js")}` // eslint-disable-line id-match
      }
    }
  };

  return pify(webpack)(webpackConfig).then(stats => {
    t.true(stats.compilation.warnings.length === 0, "no compilation warnings");
    t.true(stats.compilation.errors.length === 0, "no compilation error");

    return pify(fs)
      .readFile(path.join(buildDir, "bundle.js"), "utf8")
      .then(data => {
        t.true(/window\.Modernizr\s=\sModernizr;/.test(data));

        return Promise.resolve();
      });
  });
});

test("should execute successfully using alias as JSON config file", t => {
  const buildDir = tempy.directory();
  const webpackConfig = {
    context: fixturesDir,
    entry: "./index-1.js",
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
    },
    resolve: {
      alias: {
        modernizr$: `${path.resolve(__dirname, "fixtures/.modernizrrc.json")}` // eslint-disable-line id-match
      }
    }
  };

  return pify(webpack)(webpackConfig).then(stats => {
    t.true(stats.compilation.warnings.length === 0, "no compilation warnings");
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

test("should execute successfully using alias as JavaScript config file", t => {
  const buildDir = tempy.directory();
  const webpackConfig = {
    context: fixturesDir,
    entry: "./index-1.js",
    module: {
      rules: [
        {
          loader,
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
        modernizr$: `${path.resolve(__dirname, "fixtures/.modernizrrc.js")}` // eslint-disable-line id-match
      }
    }
  };

  return pify(webpack)(webpackConfig).then(stats => {
    t.true(stats.compilation.warnings.length === 0, "no compilation warnings");
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

test("should throw error on broken JSON config", t => {
  const buildDir = tempy.directory();
  const webpackConfig = {
    context: fixturesDir,
    entry: "./index-1.js",
    module: {
      rules: [
        {
          loader,
          test: /\.modernizrrc-broken\.json$/
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
        modernizr$: `${path.resolve(
          __dirname,
          "fixtures/.modernizrrc-broken.json"
        )}`
      }
    }
  };

  return pify(webpack)(webpackConfig).then(stats => {
    t.true(stats.compilation.warnings.length === 0, "no compilation warnings");
    t.true(stats.compilation.errors.length === 1, "compilation error");

    return Promise.resolve();
  });
});
