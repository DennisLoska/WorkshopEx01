const { Router } = require('express');
const util = require('util');
const fs = require('fs');
const logger = require('../utils/logger');

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const router = Router();

// GET endpoint to fetch single call
router.get('/call', async (req, res) => {
    try {
        // extract query parameters
        // your code here...

        // parameter validation
        // your code here...

        // Do not change these two lines!
        // Get call data (think of an actual DB query here)
        const buffer = await readFile(`${process.env.PWD}/data/calls.json`);
        const calls = JSON.parse(buffer.toString('utf8'));

        // general validation of operation + return responses
        // your code here...
    } catch (error) {
        // error handling
        // your code here...
    }
});

// GET endpoint to load all calls from JSON file
router.get('/calls', async (req, res) => {
    try {
        // parameter validation
        // your code here...

        // Do not change these two lines!
        // Get call data (think of an actual DB query here)
        const buffer = await readFile(`${process.env.PWD}/data/calls.json`);
        const calls = JSON.parse(buffer.toString('utf8'));

        // general validation of operation + return responses
        // your code here...
    } catch (error) {
        // error handling
        // your code here...
    }
});

// OUT OF SCOPE / HOMEWORK :D
// POST endpoint to save calls from request body to JSON file
router.post('/calls', async (req, res) => {
    try {
        // TODO: body sanitization
        const data = JSON.stringify(req.body);

        // TODO: refactor to not overwrite whole file, but to only push new call to it
        await writeFile(`${process.env.PWD}/data/calls.json`, data, 'utf8');

        // general validation of operation + return responses
        // your code here...
        // e.g. res.status(200).json(data);
    } catch (error) {
        // TODO: error handling
    }
});

module.exports = router;
