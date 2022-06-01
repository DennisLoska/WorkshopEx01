/* eslint-disable import/extensions */
/* eslint-disable no-undef */
const request = require('supertest');
const express = require('express');
const callRouter = require('./call.js');
const callMock = require('../mocks/call.json');
const callsMock = require('../mocks/calls.json');

const api = '/api/v1';
const app = express();
app.use(`${api}/call`, callRouter);

describe('Get call', () => {
    it('should return call by id', async () => {
        const res = await request(app).get(`${api}/call`);
        expect(res.body).toEqual({ oki: 'doki' });
    });
});
