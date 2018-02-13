# Change Log

All notable changes to this project will be documented in this file.

This project adheres to [Semantic Versioning](http://semver.org).

## 4.0.1 - 2018-02-13

- Build: add `node@9` to travis CI.
- Chore: minimum required `modernizr` version is now `^3.5.0`.
- Chore: support `webpack` v4.

## 4.0.0 - 2017-08-25

- Changed: configuration loading behaviour. See `README.md`.
- Fixed: avoid problem when `Modernizr` already exists.

## 3.0.1 - 2017-06-20

- Chore: support `webpack` v3.
- Refactor: remove unnecessary legacy `webpack` v1 code.

## 3.0.0 - 2017-02-27

- Fixed: minimum required loader-utils version is now `~1.0.0`.
- Removed: support `webpack` version `1`.

## 2.0.0 - 2017-02-01

- Changed: no longer required to transfer options for `modernizr` using `config` option.
- Changed: to load configuration from file, need specify `useConfigFile` option.
- Chore: no need to use function `encodeURI` for `query string`.

## 1.0.2 - 2017-01-31

- Fixed: updated webpack peer dependency to support `2.2.1`.

## 1.0.1

- Fixed: resolved configuration file only if file passed.

## 1.0.0

- Chore: initial public release.
