const { Router } = require('express');

const router = Router();

/* GET list of currency locations */
router.get(
    '/', async (req, res) => {
        const { id } = req.query;
        return res.status(200).json({ oki: 'doki' });
    }
);

module.exports = router;
