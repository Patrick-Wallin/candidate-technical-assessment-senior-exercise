import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import allRoutes from './handlers/allRoutes';

const app: express.Application = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', function (req: Request, res: Response) {
  res.send("Welcome to Gaggle's API!");
});

allRoutes(app);

export default app;
