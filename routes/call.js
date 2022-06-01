const { Router } = require('express');
const util = require('util');
const fs = require('fs');

const logger = require('../utils/logger');

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

const router = Router();

router.get(
    '/call', async (req, res) => {
        try {
            const { id } = req.query;
            console.log(id);
            const buffer = await readFile(`${process.env.PWD}/data/calls.json`);
            const calls = JSON.parse(buffer.toString('utf8'));
            const call = calls.find((c) => c.id === id);
            res.status(200).json(call);
        } catch (error) {
            logger.error(error);
            res.status(500).json({ code: 500, error: 'Failed to load JSON file' });
        }
    }
);

// GET endpoint to load calls from JSON file
router.get('/calls', async (req, res) => {
    try {
        const buffer = await readFile(`${process.env.PWD}/data/calls.json`);
        const json = JSON.parse(buffer.toString('utf8'));
        res.status(200).json(json);
    } catch (error) {
        logger.error(error);
        res.status(500).json({ code: 500, error: 'Failed to load JSON file' });
    }
});

// POST endpoint to save calls from request body to JSON file
router.post('/calls', async (req, res) => {
    try {
        const data = JSON.stringify(req.body);
        await writeFile(`${process.env.PWD}/data/calls.json`, data, 'utf8');
        res.status(200).json(data);
        // TODO#. do not overwrite whole file
    } catch (error) {
        logger.error(error);
        res.status(500).json({ code: 500, error: 'Failed to write JSON file' });
    }
});

module.exports = router;
