const { test } = require('node:test');
const assert = require('node:assert/strict');
process.env.GEOCODER_PROVIDER = 'openstreetmap';
process.env.JWT_SECRET = 'local-test-secret-not-a-production-credential';
process.env.JWT_EXPIRE = '1h';
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Mural = require('../models/Mural');
const MuralPost = require('../models/MuralPost');

test('user tokens round-trip and unsigned tokens are rejected', () => {
  const user = new User({ name: 'Test', email: 'test@example.com', password: 'test-password' });
  const claims = jwt.verify(user.getSignedJwtToken(), process.env.JWT_SECRET);
  assert.equal(claims.id, user.id);
  assert.throws(() => jwt.verify(jwt.sign({ id: user.id }, '', { algorithm: 'none' }), process.env.JWT_SECRET));
});

test('document deletion removes associated posts before the mural', async (t) => {
  const mural = new Mural({ name: 'Test mural', address: 'Test address' });
  const operations = [];
  t.mock.method(MuralPost.collection, 'deleteMany', async (filter) => {
    assert.equal(String(filter.mural), mural.id);
    operations.push('posts');
    return { deletedCount: 2 };
  });
  t.mock.method(Mural.collection, 'deleteOne', async (filter) => {
    assert.equal(String(filter._id), mural.id);
    operations.push('mural');
    return { deletedCount: 1 };
  });
  await mural.deleteOne();
  assert.deepEqual(operations, ['posts', 'mural']);
});

test('all API routers load with upgraded upload and database dependencies', () => {
  for (const route of ['auth', 'users', 'murals', 'mural-posts', 'restaurants', 'restaurant-posts']) {
    assert.equal(typeof require('../routes/' + route), 'function');
  }
});
