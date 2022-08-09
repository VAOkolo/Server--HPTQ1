const fs = require('fs');

const request = require('supertest');
const apiServer = require('../../server');


// make these things available to test suites
global.request = request
global.app = apiServer
global.port = process.env.PORT || 4000;
