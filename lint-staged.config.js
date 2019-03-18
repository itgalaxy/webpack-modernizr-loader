"use strict";

module.exports = {
  "*.{js,mjs,jsx}": [
    "prettier --list-different",
    "eslint --report-unused-disable-directives",
    "git add"
  ],
  "*.{md,markdown,mdown,mkdn,mkd,mdwn,mkdown,ron}": [
    "remark -f -q",
    "prettier --list-different",
    "git add"
  ],
  "*.{yml,yaml}": ["prettier --list-different", "git add"]
};
