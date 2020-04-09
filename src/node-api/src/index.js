const PORT = 3000;

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import { listCategoriesController } from './controllers'

import { makeExpressCallback } from './express-callback';

const app = express();
const apiRoot = '/api/v0';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(cors());

app.get(`${apiRoot}/categories`, makeExpressCallback(listCategoriesController));

app.listen(PORT, () => {
  console.log('Server Node.js + Express is listening on port 3000');
});

export default app;
