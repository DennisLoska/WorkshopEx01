/* eslint-disable import/extensions */
/* eslint-disable no-undef */
const request = require('supertest');
const express = require('express');
const util = require('util');
const fs = require('fs');
const callRouter = require('./call.js');

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

const api = '/api/v1';
const app = express();
app.use(`${api}/`, callRouter);

describe('GET call', () => {
    it('should return a single call by id', async () => {
        const id = 2;
        const res = await request(app).get(`${api}/call?id=${id}`);
        expect(res.body).toEqual({
            id: 2,
            user: {
                sms_number: '+491764777',
                phone_number: '+49035356547',
                name: 'Max Mustermann'
            },
            is_complete: true,
            voicemails: [
                {
                    transcription: 'Ich möchte zu Dr. Müller'
                },
                {
                    transcription: 'Heute oder Morgen'
                }
            ],
            timestamp: '2021-04-22T10:29:19.891Z',
            type: 'appointment'
        });
        expect(res.status).toEqual(200);
    });

    it('should return an error object with status 400 when passing invalid query parameter', async () => {
        const id = 'two';
        const res = await request(app).get(`${api}/call?id=${id}`);
        expect(res.body).toEqual({ code: 400, error: 'Bad formatting of request parameters' });
        expect(res.status).toEqual(400);
    });

    it('should return an error object with status 400 when passing invalid query parameter', async () => {
        const res = await request(app).get(`${api}/call`);
        expect(res.body).toEqual({ code: 400, error: 'Bad formatting of request parameters' });
        expect(res.status).toEqual(400);
    });

    it('should return an error object with status 404 when no call was found', async () => {
        const id = 42;
        const res = await request(app).get(`${api}/call?id=${id}`);
        expect(res.body).toEqual({ code: 404, error: 'Call not found' });
        expect(res.status).toEqual(404);
    });
});

describe('GET calls', () => {
    it('should return all existing calls', async () => {
        const res = await request(app).get(`${api}/calls`);
        expect(res.body).toEqual([
            {
                id: 1,
                is_complete: false,
                timestamp: '2021-04-23T12:29:19.891Z',
                type: 'prescription',
                user: { name: 'Thomas Meyer', phone_number: '+4903078544', sms_number: '+4917647914' },
                voicemails: [{ transcription: ' Rezept' }, { transcription: 'Ibuprofen' }]
            }, {
                id: 2,
                is_complete: true,
                timestamp: '2021-04-22T10:29:19.891Z',
                type: 'appointment',
                user: { name: 'Max Mustermann', phone_number: '+49035356547', sms_number: '+491764777' },
                voicemails: [{ transcription: 'Ich möchte zu Dr. Müller' }, { transcription: 'Heute oder Morgen' }]
            },
            {
                id: 3,
                is_complete: false,
                timestamp: '2021-04-25T14:29:19.891Z',
                type: 'emergency',
                user: { name: 'Thomas Meyer', phone_number: '+490303457754', sms_number: '+491768964' },
                voicemails: [
                    { transcription: 'Ich habe starke Schmerzen' },
                    { transcription: 'Ich habe mir das bein gebrochen aua' }]
            }
        ]);
        expect(res.status).toEqual(200);
    });

    it('should return an error object with status 400 when passing query parameter', async () => {
        const res = await request(app).get(`${api}/calls?bad=query`);
        expect(res.body).toEqual({
            code: 400,
            error: 'Bad formatting of request parameters'
        });
        expect(res.status).toEqual(400);
    });

    it('should return an error object with status 404 when no calls were found', async () => {
        // read calls directly from file (think of DB test data)
        const buffer = await readFile(`${process.env.PWD}/data/calls.json`);
        const calls = JSON.parse(buffer.toString('utf8'));

        // delete calls from file (think of DB test data)
        await writeFile(`${process.env.PWD}/data/calls.json`, '[]', 'utf8');

        const res = await request(app).get(`${api}/calls`);
        expect(res.body).toEqual({
            code: 404,
            error: 'Calls not found'
        });
        expect(res.status).toEqual(404);

        // restore calls again (think of DB test data)
        await writeFile(`${process.env.PWD}/data/calls.json`, JSON.stringify(calls), 'utf8');
    });
});
