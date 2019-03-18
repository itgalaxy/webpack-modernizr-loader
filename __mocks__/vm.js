// __mocks__/vm.js
const vm = jest.genMockFromModule("vm");

// r.js calls vm.runInThisContext during initialization
// but when running under jest it does not work as expected.
// This assumes nothing else calls this method during the tests...
vm.runInThisContext = function() {
  // eslint-disable-next-line no-undefined
  return undefined;
};

module.exports = vm;
