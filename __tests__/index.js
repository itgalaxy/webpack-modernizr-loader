import fs from 'fs';
import modernizrConfig from './fixtures/.modernizrrc.json';
import path from 'path';
import pify from 'pify';
import test from 'ava';
import tmp from 'tmp';
import webpack from 'webpack';

const loader = path.resolve(__dirname, '../index.js');
const fixturesDir = path.resolve(__dirname, 'fixtures');

tmp.setGracefulCleanup();

test('should execute successfully without any options`', t =>
    pify(tmp.dir, {
        multiArgs: true
    })({
        unsafeCleanup: true
    }).then(result => {
        const [tmpPath, cleanupCallback] = result;
        const webpackConfig = {
            context: fixturesDir,
            entry: './index.js',
            module: {
                rules: [
                    {
                        loader,
                        test: /\.modernizrrc\.json$/
                    }
                ]
            },
            output: {
                filename: 'bundle.js',
                path: `${tmpPath}`
            }
        };

        return pify(webpack)(webpackConfig).then(stats => {
            t.true(
                stats.compilation.errors.length === 0,
                'no compilation error'
            );

            return pify(fs)
                .readFile(path.join(tmpPath, 'bundle.js'), 'utf8')
                .then(data => {
                    t.true(/Modernizr/.test(data));

                    return cleanupCallback();
                });
        });
    }));

test('should execute successfully with JSON config and use `require("./.modernizrrc.json")`', t =>
    pify(tmp.dir, {
        multiArgs: true
    })({
        unsafeCleanup: true
    }).then(result => {
        const [tmpPath, cleanupCallback] = result;
        const webpackConfig = {
            context: fixturesDir,
            entry: './index.js',
            module: {
                rules: [
                    {
                        loader: `${loader}?useConfigFile`,
                        test: /\.modernizrrc\.json$/
                    }
                ]
            },
            output: {
                filename: 'bundle.js',
                path: `${tmpPath}`
            }
        };

        return pify(webpack)(webpackConfig).then(stats => {
            t.true(
                stats.compilation.errors.length === 0,
                'no compilation error'
            );

            return pify(fs)
                .readFile(path.join(tmpPath, 'bundle.js'), 'utf8')
                .then(data => {
                    t.true(/addTest\('flexbox/.test(data));
                    t.true(/addTest\('promise/.test(data));
                    t.true(/addTest\('serviceworker/.test(data));

                    return cleanupCallback();
                });
        });
    }));

test('should execute successfully with JSON config and use `require("modernizr")`', t =>
    pify(tmp.dir, {
        multiArgs: true
    })({
        unsafeCleanup: true
    }).then(result => {
        const [tmpPath, cleanupCallback] = result;
        const webpackConfig = {
            context: fixturesDir,
            entry: './index1.js',
            module: {
                rules: [
                    {
                        loader: `${loader}?useConfigFile`,
                        test: /\.modernizrrc\.json$/
                    }
                ]
            },
            output: {
                filename: 'bundle.js',
                path: `${tmpPath}`
            },
            resolve: {
                alias: {
                    // eslint-disable-next-line id-match
                    modernizr$: `${path.resolve(
                        __dirname,
                        'fixtures/.modernizrrc.json'
                    )}`
                }
            }
        };

        return pify(webpack)(webpackConfig).then(stats => {
            t.true(
                stats.compilation.errors.length === 0,
                'no compilation error'
            );

            return pify(fs)
                .readFile(path.join(tmpPath, 'bundle.js'), 'utf8')
                .then(data => {
                    t.true(/addTest\('flexbox/.test(data));
                    t.true(/addTest\('promise/.test(data));
                    t.true(/addTest\('serviceworker/.test(data));

                    return cleanupCallback();
                });
        });
    }));

test('should execute successfully with JS config and use `require("modernizr")`', t =>
    pify(tmp.dir, {
        multiArgs: true
    })({
        unsafeCleanup: true
    }).then(result => {
        const [tmpPath, cleanupCallback] = result;
        const webpackConfig = {
            context: fixturesDir,
            entry: './index1.js',
            module: {
                rules: [
                    {
                        loader: `${loader}?useConfigFile`,
                        test: /\.modernizrrc\.js$/
                    }
                ]
            },
            output: {
                filename: 'bundle.js',
                path: `${tmpPath}`
            },
            resolve: {
                alias: {
                    // eslint-disable-next-line id-match
                    modernizr$: `${path.resolve(
                        __dirname,
                        'fixtures/.modernizrrc.js'
                    )}`
                }
            }
        };

        return pify(webpack)(webpackConfig).then(stats => {
            t.true(
                stats.compilation.errors.length === 0,
                'no compilation error'
            );

            return pify(fs)
                .readFile(path.join(tmpPath, 'bundle.js'), 'utf8')
                .then(data => {
                    t.true(/addTest\('flexbox/.test(data));
                    t.true(/addTest\('promise/.test(data));
                    t.true(/addTest\('serviceworker/.test(data));

                    return cleanupCallback();
                });
        });
    }));

test('should execute successfully with JS config and use `require("./.modernizrrc.js")`', t =>
    pify(tmp.dir, {
        multiArgs: true
    })({
        unsafeCleanup: true
    }).then(result => {
        const [tmpPath, cleanupCallback] = result;
        const webpackConfig = {
            context: fixturesDir,
            entry: './index2.js',
            module: {
                rules: [
                    {
                        loader: `${loader}?useConfigFile`,
                        test: /\.modernizrrc\.js$/
                    }
                ]
            },
            output: {
                filename: 'bundle.js',
                path: `${tmpPath}`
            }
        };

        return pify(webpack)(webpackConfig).then(stats => {
            t.true(
                stats.compilation.errors.length === 0,
                'no compilation error'
            );

            return pify(fs)
                .readFile(path.join(tmpPath, 'bundle.js'), 'utf8')
                .then(data => {
                    t.true(/addTest\('flexbox/.test(data));
                    t.true(/addTest\('promise/.test(data));
                    t.true(/addTest\('serviceworker/.test(data));

                    return cleanupCallback();
                });
        });
    }));

test('should supported `config` from `options`', t =>
    pify(tmp.dir, {
        multiArgs: true
    })({
        unsafeCleanup: true
    }).then(result => {
        const [tmpPath, cleanupCallback] = result;
        const webpackConfig = {
            context: fixturesDir,
            entry: './index1.js',
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
                filename: 'bundle.js',
                path: `${tmpPath}`
            },
            resolve: {
                alias: {
                    // eslint-disable-next-line id-match
                    modernizr$: `${path.resolve(
                        __dirname,
                        'fixtures/modernizr.js'
                    )}`
                }
            }
        };

        return pify(webpack)(webpackConfig).then(stats => {
            t.true(
                stats.compilation.errors.length === 0,
                'no compilation error'
            );

            return pify(fs)
                .readFile(path.join(tmpPath, 'bundle.js'), 'utf8')
                .then(data => {
                    t.true(/addTest\('flexbox/.test(data));
                    t.true(/addTest\('promise/.test(data));
                    t.true(/addTest\('serviceworker/.test(data));

                    return cleanupCallback();
                });
        });
    }));

test('should supported `config` from "query string"', t =>
    pify(tmp.dir, {
        multiArgs: true
    })({
        unsafeCleanup: true
    }).then(result => {
        const [tmpPath, cleanupCallback] = result;
        const webpackConfig = {
            context: fixturesDir,
            entry: './index.js',
            module: {
                rules: [
                    {
                        loader: `${loader}?${JSON.stringify(modernizrConfig)}`,
                        test: /\.modernizrrc\.json$/
                    }
                ]
            },
            output: {
                filename: 'bundle.js',
                path: `${tmpPath}`
            }
        };

        return pify(webpack)(webpackConfig).then(stats => {
            t.true(
                stats.compilation.errors.length === 0,
                'no compilation error'
            );

            return pify(fs)
                .readFile(path.join(tmpPath, 'bundle.js'), 'utf8')
                .then(data => {
                    t.true(/addTest\('flexbox/.test(data));
                    t.true(/addTest\('promise/.test(data));
                    t.true(/addTest\('serviceworker/.test(data));

                    return cleanupCallback();
                });
        });
    }));
