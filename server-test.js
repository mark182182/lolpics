'use strict';

const test = require('tape');
const request = require('supertest');
const serverModule = require('./server');

test('Check if 1 is equal 1', function (t) {
  t.equal(1, 1);
  t.end();
});

test('/api/giphy endpoint', (t) => {
  request(serverModule.app)
    .get('/')
    .expect('Content-Type', /json/)
    .expect(200)
    .end(function (err, res) {
      if (err) {
        t.error(err);
      }
      t.deepEquals(res.body, { received: res.body.url });
      serverModule.server.close();
    });
  t.end();
});