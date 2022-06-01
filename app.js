/* eslint-disable import/extensions */
import express from 'express';
import expressPino from 'express-pino-logger';
import { serve, setup } from 'swagger-ui-express';
import yaml from 'yamljs';
import logger from './utils/logger.js';
import callRouter from './routes/call.js';

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

app.use(`${api}/call`, callRouter);

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

export default app;
