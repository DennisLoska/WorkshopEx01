/* eslint-disable import/extensions */
const express = require('express');
const expressPino = require('express-pino-logger');
const { serve, setup } = require('swagger-ui-express');
const yaml = require('yamljs');
const logger = require('./utils/logger');

const callRouter = require('./routes/call');

// generate api docs from swagger specs
const swaggerDocument = yaml.load('./specs/swagger-specs.yaml');
swaggerDocument.host = process.env.HOST_IP || 'localhost:5000';
const scheme = process.env.SCHEME || 'http';
swaggerDocument.schemes = [scheme];

const app = express();
const api = '/api/v1';

const expressLogger = expressPino({ logger });

app.use(expressLogger);
app.use(express.json());
app.use(
    express.urlencoded({
        extended: false,
    })
);

app.use(`${api}/`, callRouter);

app.use('/docs', serve, setup(swaggerDocument));

// error handler
// it must have 4 parameters for Express to know that this is an error middleware
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
    logger.error(err);
    // we only return the reason in dev
    return res.status(err.status || 500).json({ error: err.message });
});

process.on('unhandledRejection', (error) => {
    console.error('unhandledRejection', error.message);
});

app.listen(5000, () => {
    console.log(`Example app listening on port ${5000}`);
});
