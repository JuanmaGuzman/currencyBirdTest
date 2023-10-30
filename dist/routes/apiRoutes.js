"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
// GET endpoint
router.get('/', (req, res) => {
    try {
        res.status(200).json({ message: 'GET request received successfully' });
    }
    catch (error) {
        console.error('Error processing GET request:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
// POST endpoint
router.post('/create-money-transfer', (req, res) => {
    try {
        // You can access request data using req.body
        const data = req.body;
        // Process data here
        console.log('Received POST data:', data);
        res.status(200).json({ message: 'Data received successfully' });
    }
    catch (error) {
        console.error('Error processing POST data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.default = router;
