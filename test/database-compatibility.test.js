const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');

test('database connection does not pass options removed by Mongoose 6+', async () => {
  const context = {
    module: { exports: {} }, process: { env: {} }, console: { log() {} },
    require(name) {
      assert.equal(name, 'mongoose');
      return { async connect(uri, options = {}) {
        for (const removed of ['useNewUrlParser', 'useUnifiedTopology', 'useCreateIndex', 'useFindAndModify']) {
          assert.equal(removed in options, false, `${removed} is unsupported`);
        }
        return { connection: { host: { cyan: { underline: { bold: 'localhost' } } } } };
      } };
    }
  };
  vm.createContext(context);
  vm.runInContext("for (const name of ['cyan', 'underline', 'bold']) Object.defineProperty(String.prototype, name, { get() { return this; } });", context);
  vm.runInContext(fs.readFileSync(path.join(__dirname, '../config/db.js'), 'utf8'), context);
  await context.module.exports();
});
