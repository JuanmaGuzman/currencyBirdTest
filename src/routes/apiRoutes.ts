import { Router, Request, Response } from 'express';

const router = Router();

// GET endpoint
router.get('/', (req: Request, res: Response) => {
  try {
    res.status(200).json({ message: 'GET request received successfully!!!' });
  } catch (error) {
    console.error('Error processing GET request:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// POST endpoint
router.post('/create-money-transfer', (req: Request, res: Response) => {
  try {
    // You can access request data using req.body
    const data = req.body;
    // Process data here
    console.log('Received POST data:', data);
    res.status(200).json({ message: 'Data received successfully!!' });
  } catch (error) {
    console.error('Error processing POST data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
