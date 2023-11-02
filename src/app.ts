import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';

import './database';
import Trasferrouter from './routes/Transfer.routes';


const app = express();
app.set('port', 3001);

app.use(bodyParser.json());
app.use(Trasferrouter);

app.use((req: Request, res: Response, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

export default app; 

app.listen(app.get('port'), () => {
    console.log(`Server port ${app.get('port')}`)
}); 