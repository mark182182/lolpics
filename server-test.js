'use strict';

const test = require('tape');
const request = require('supertest');
const serverModule = require('./server');

test('/ endpoint should return status 200', (t) => {
  request(serverModule.app)
    .get('/')
    .expect(200)
    .end(function (err, res) {
      if (err) {
        t.error(err);
      }
      t.deepEquals(res.status, 200, 'Should return 200');
    });
  t.end();
});

test('/api/giphy endpoint should return status 200', (t) => {
  request(serverModule.app)
    .get('/api/giphy')
    .expect('Content-Type', /json/)
    .expect(200)
    .end(function (err, res) {
      if (err) {
        t.error(err);
      }
      t.deepEquals(res.status, 200, 'Should return 200');
    });
  t.end();
});

test('/doesnotexist endpoint should return 404', (t) => {
  request(serverModule.app)
    .get('/doesnotexist')
    .expect(404)
    .end(function (err, res) {
      if (err) {
        t.error(err);
      }
      t.deepEquals(res.status, 404, 'Should return 404');
      serverModule.server.close();
    });
  t.end();
});