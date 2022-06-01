/* eslint-disable import/extensions */
/* eslint-disable no-undef */
const request = require('supertest');
const express = require('express');
const callRouter = require('./call.js');
const callMock = require('../mocks/call.json');
const callsMock = require('../mocks/calls.json');

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
    });
    // TODO: add test cases
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
    });
    // TODO: add test cases
});
