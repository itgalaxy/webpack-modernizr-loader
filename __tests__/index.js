import fs from 'fs';
import modernizrConfig from './fixtures/.modernizrrc.json';
import path from 'path';
import temp from 'temp';
import test from 'ava';
import webpack from 'webpack';

temp.track();

test.cb('should execute successfully with JSON config and use `require("./.modernizrrc.json")`', (t) => {
    const tempDir = temp.mkdirSync(); // eslint-disable-line no-sync
    const webpackConfig = {
        context: './fixtures',
        entry: './index.js',
        module: {
            loaders: [
                {
                    loader:
                        `${path.resolve(__dirname, '../index.js')}`,
                    test: /\.modernizrrc\.json$/
                }
            ]
        },
        output: {
            filename: 'bundle.js',
            path: `${tempDir}`
        }
    };

    webpack(webpackConfig, (error, stats) => {
        if (error) {
            throw error;
        }

        t.true(stats.compilation.errors.length === 0, 'no compilation error');

        fs.readFile(`${tempDir}/bundle.js`, 'utf8', (fsError, data) => {
            if (fsError) {
                throw fsError;
            }

            t.true(/addTest\('flexbox/.test(data));
            t.true(/addTest\('promise/.test(data));
            t.true(/addTest\('serviceworker/.test(data));
            t.end();
        });
    });
});

test.cb('should execute successfully with JS config and use `require("./.modernizrrc.js")`', (t) => {
    const tempDir = temp.mkdirSync(); // eslint-disable-line no-sync
    const webpackConfig = {
        context: './fixtures',
        entry: './index2.js',
        module: {
            loaders: [
                {
                    loader:
                        `${path.resolve(__dirname, '../index.js')}`,
                    test: /\.modernizrrc\.js$/
                }
            ]
        },
        output: {
            filename: 'bundle.js',
            path: `${tempDir}`
        }
    };

    webpack(webpackConfig, (error, stats) => {
        if (error) {
            throw error;
        }

        t.true(stats.compilation.errors.length === 0, 'no compilation error');

        fs.readFile(`${tempDir}/bundle.js`, 'utf8', (fsError, data) => {
            if (fsError) {
                throw fsError;
            }

            t.true(/addTest\('flexbox/.test(data));
            t.true(/addTest\('promise/.test(data));
            t.true(/addTest\('serviceworker/.test(data));
            t.end();
        });
    });
});

test.cb('should execute successfully with JSON config and use `require("modernizr")`', (t) => {
    const tempDir = temp.mkdirSync(); // eslint-disable-line no-sync
    const webpackConfig = {
        context: './fixtures',
        entry: './index1.js',
        module: {
            loaders: [
                {
                    loader:
                        `${path.resolve(__dirname, '../index.js')}`,
                    test: /\.modernizrrc\.json$/
                }
            ]
        },
        output: {
            filename: 'bundle.js',
            path: `${tempDir}`
        },
        resolve: {
            alias: {
                modernizr$: `${path.resolve(__dirname, 'fixtures/.modernizrrc.json')}` // eslint-disable-line id-match
            }
        }
    };

    webpack(webpackConfig, (error, stats) => {
        if (error) {
            throw error;
        }

        t.true(stats.compilation.errors.length === 0, 'no compilation error');

        fs.readFile(`${tempDir}/bundle.js`, 'utf8', (fsError, data) => {
            if (fsError) {
                throw fsError;
            }

            t.true(/addTest\('flexbox/.test(data));
            t.true(/addTest\('promise/.test(data));
            t.true(/addTest\('serviceworker/.test(data));
            t.end();
        });
    });
});

test.cb('should execute successfully with JS config and use `require("modernizr")`', (t) => {
    const tempDir = temp.mkdirSync(); // eslint-disable-line no-sync
    const webpackConfig = {
        context: './fixtures',
        entry: './index1.js',
        module: {
            loaders: [
                {
                    loader:
                        `${path.resolve(__dirname, '../index.js')}`,
                    test: /\.modernizrrc\.js$/
                }
            ]
        },
        output: {
            filename: 'bundle.js',
            path: `${tempDir}`
        },
        resolve: {
            alias: {
                modernizr$: `${path.resolve(__dirname, 'fixtures/.modernizrrc.js')}` // eslint-disable-line id-match
            }
        }
    };

    webpack(webpackConfig, (error, stats) => {
        if (error) {
            throw error;
        }

        t.true(stats.compilation.errors.length === 0, 'no compilation error');

        fs.readFile(`${tempDir}/bundle.js`, 'utf8', (fsError, data) => {
            if (fsError) {
                throw fsError;
            }

            t.true(/addTest\('flexbox/.test(data));
            t.true(/addTest\('promise/.test(data));
            t.true(/addTest\('serviceworker/.test(data));
            t.end();
        });
    });
});

test.cb('should execute successfully using "query string" and use `require("modernizr")`', (t) => {
    const tempDir = temp.mkdirSync(); // eslint-disable-line no-sync
    const webpackConfig = {
        context: './fixtures',
        entry: './index1.js',
        module: {
            loaders: [
                {
                    loader:
                        `${path.resolve(__dirname, '../index.js')}?config=${encodeURI(JSON.stringify(
                            modernizrConfig
                        ))}`,
                    test: /modernizr\.js$/
                }
            ]
        },
        output: {
            filename: 'bundle.js',
            path: `${tempDir}`
        },
        resolve: {
            alias: {
                modernizr$: `${path.resolve(__dirname, 'fixtures/modernizr.js')}` // eslint-disable-line id-match
            }
        }
    };

    webpack(webpackConfig, (error, stats) => {
        if (error) {
            throw error;
        }

        t.true(stats.compilation.errors.length === 0, 'no compilation error');

        fs.readFile(`${tempDir}/bundle.js`, 'utf8', (fsError, data) => {
            if (fsError) {
                throw fsError;
            }

            t.true(/addTest\('flexbox/.test(data));
            t.true(/addTest\('promise/.test(data));
            t.true(/addTest\('serviceworker/.test(data));
            t.end();
        });
    });
});

test.cb('should supported "config" using "query string"', (t) => {
    const tempDir = temp.mkdirSync(); // eslint-disable-line no-sync

    const webpackConfig = {
        context: './fixtures',
        entry: './index.js',
        module: {
            loaders: [
                {
                    loader:
                        `${path.resolve(__dirname, '../index.js')}?config=${encodeURI(JSON.stringify(
                            modernizrConfig
                        ))}`,
                    test: /\.modernizrrc\.json$/
                }
            ]
        },
        output: {
            filename: 'bundle.js',
            path: `${tempDir}`
        }
    };

    webpack(webpackConfig, (error, stats) => {
        if (error) {
            throw error;
        }

        t.true(stats.compilation.errors.length === 0, 'no compilation error');

        fs.readFile(`${tempDir}/bundle.js`, 'utf8', (fsError, data) => {
            if (fsError) {
                throw fsError;
            }

            t.true(/addTest\('flexbox/.test(data));
            t.true(/addTest\('promise/.test(data));
            t.true(/addTest\('serviceworker/.test(data));
            t.end();
        });
    });
});
