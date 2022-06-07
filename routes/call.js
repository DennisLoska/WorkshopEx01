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
        const { id } = req.query;

        // parameter validation
        if (Number.isNaN(Number.parseInt(id, 10))) {
            return res.status(400).json({
                code: 400,
                error: 'Bad formatting of request parameters'
            });
        }

        // get call data (think of an actual DB query here)
        const buffer = await readFile(`${process.env.PWD}/data/calls.json`);
        const calls = JSON.parse(buffer.toString('utf8'));

        // general validation of operation
        if (Array.isArray(calls)) {
            const call = calls.find((c) => c.id.toString() === id);
            if (call) {
                return res.status(200).json(call);
            }

            // no call found
            return res.status(404).json({ code: 404, error: 'Call not found' });
        }
        return res.status(500).json(
            { code: 500, error: 'Internal server error' }
        );
    } catch (error) {
        logger.error(error);
        return res.status(500).json(
            { code: 500, error: 'Failed to load JSON file' }
        );
    }
});

// GET endpoint to load all calls from JSON file
router.get('/calls', async (req, res) => {
    try {
        if (Object.keys(req.query).length > 0) {
            return res.status(400).json({
                code: 400,
                error: 'Bad formatting of request parameters'
            });
        }

        const buffer = await readFile(`${process.env.PWD}/data/calls.json`);
        const calls = JSON.parse(buffer.toString('utf8'));

        if (Array.isArray(calls) && calls.length === 0) {
            // no call found
            return res.status(404).json({ code: 404, error: 'Calls not found' });
        }

        return res.status(200).json(calls);
    } catch (error) {
        logger.error(error);
        return res.status(500).json({ code: 500, error: 'Failed to load JSON file' });
    }
});

// POST endpoint to save calls from request body to JSON file
router.post('/calls', async (req, res) => {
    try {
        const data = JSON.stringify(req.body);
        await writeFile(`${process.env.PWD}/data/calls.json`, data, 'utf8');
        res.status(200).json(data);
        // TODO: do not overwrite whole file
    } catch (error) {
        logger.error(error);
        res.status(500).json({ code: 500, error: 'Failed to write JSON file' });
    }
});

module.exports = router;
