import fs from "fs";
import path from "path";
import pify from "pify";
import tempy from "tempy";
import webpack from "webpack";
import modernizrConfigJSONRc from "./fixtures/.modernizrrc.json";

const loader = path.resolve(__dirname, "../index.js");
const fixturesDir = path.resolve(__dirname, "fixtures");

// Workaround https://github.com/facebook/jest/issues/1914
jest.mock("vm");
jest.mock("modernizr", () => ({
  build: (config, callback) =>
    callback(
      "(function(window, document, undefined){windows.Modernizr = 'Mocked value';})(window, document);"
    )
}));

describe("loader", () => {
  it("should execute successfully using config file inside `require`", () => {
    const buildDir = tempy.directory();
    const webpackConfig = {
      mode: "development",
      context: fixturesDir,
      entry: "./index.js",
      module: {
        rules: [
          {
            loader,
            test: /\.modernizrrc\.json$/,
            type: "javascript/auto"
          }
        ]
      },
      output: {
        filename: "bundle.js",
        path: buildDir
      }
    };

    return pify(webpack)(webpackConfig).then(stats => {
      expect(stats.compilation.warnings).toHaveLength(0);
      expect(stats.compilation.errors).toHaveLength(0);

      return pify(fs)
        .readFile(path.join(buildDir, "bundle.js"), "utf8")
        .then(data => {
          expect(data).toEqual(expect.stringContaining("windows.Modernizr"));

          return Promise.resolve();
        });
    });
  });

  it("should execute successfully using options and alias with empty file", () => {
    const buildDir = tempy.directory();
    const webpackConfig = {
      mode: "development",
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
      expect(stats.compilation.warnings).toHaveLength(0);
      expect(stats.compilation.errors).toHaveLength(0);

      return pify(fs)
        .readFile(path.join(buildDir, "bundle.js"), "utf8")
        .then(data => {
          expect(data).toEqual(expect.stringContaining("windows.Modernizr"));

          return Promise.resolve();
        });
    });
  });

  it("should execute successfully using options and alias with non-empty file", () => {
    const buildDir = tempy.directory();
    const webpackConfig = {
      mode: "development",
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
      expect(stats.compilation.warnings).toHaveLength(0);
      expect(stats.compilation.errors).toHaveLength(0);

      return pify(fs)
        .readFile(path.join(buildDir, "bundle.js"), "utf8")
        .then(data => {
          expect(data).toEqual(expect.stringContaining("windows.Modernizr"));

          return Promise.resolve();
        });
    });
  });

  it("should execute successfully using alias with empty file", () => {
    const buildDir = tempy.directory();
    const webpackConfig = {
      mode: "development",
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
      expect(stats.compilation.warnings).toHaveLength(0);
      expect(stats.compilation.errors).toHaveLength(0);

      return pify(fs)
        .readFile(path.join(buildDir, "bundle.js"), "utf8")
        .then(data => {
          expect(data).toEqual(expect.stringContaining("windows.Modernizr"));

          return Promise.resolve();
        });
    });
  });

  it("should execute successfully using alias as JSON config file", () => {
    const buildDir = tempy.directory();
    const webpackConfig = {
      mode: "development",
      context: fixturesDir,
      entry: "./index-1.js",
      module: {
        rules: [
          {
            loader,
            test: /\.modernizrrc\.json$/,
            type: "javascript/auto"
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
      expect(stats.compilation.warnings).toHaveLength(0);
      expect(stats.compilation.errors).toHaveLength(0);

      return pify(fs)
        .readFile(path.join(buildDir, "bundle.js"), "utf8")
        .then(data => {
          expect(data).toEqual(expect.stringContaining("windows.Modernizr"));

          return Promise.resolve();
        });
    });
  });

  it("should executes successfully using alias as JavaScript config file", () => {
    const buildDir = tempy.directory();
    const webpackConfig = {
      mode: "development",
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
      expect(stats.compilation.warnings).toHaveLength(0);
      expect(stats.compilation.errors).toHaveLength(0);

      return pify(fs)
        .readFile(path.join(buildDir, "bundle.js"), "utf8")
        .then(data => {
          expect(data).toEqual(expect.stringContaining("windows.Modernizr"));

          return Promise.resolve();
        });
    });
  });

  it("should throws error on broken JSON config", () => {
    const buildDir = tempy.directory();
    const webpackConfig = {
      mode: "development",
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
      expect(stats.compilation.warnings).toHaveLength(0);
      expect(stats.compilation.errors).toHaveLength(1);

      return Promise.resolve();
    });
  });
});
