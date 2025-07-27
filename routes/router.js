import express from 'express';

let router = express.Router();
router.get('/', (req, res) => {
    console.log('Received a GET request');
    res.status(200).json({ message: 'Received a GET request' })

});

export default router;
