import express from 'express';
import bodyParser from 'body-parser';
import apiRoutes from './routes/apiRoutes';

const app = express();
const port = 3000;

app.use(bodyParser.json()); // Middleware to parse JSON in request body

// Define your routes
app.use('/api', apiRoutes);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
