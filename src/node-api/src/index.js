const PORT = 2345;

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import multer from 'multer';
const upload = multer({ dest: 'uploads/' });

import {
  listCategoriesController,
  postItineraryController,
  postUserController
} from './controllers'

import { makeExpressCallback } from './express-callback';
import { addBatches } from './batches';

const app = express();
const apiRoot = '/api/v0';

addBatches();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(cors());

app.get(`${apiRoot}/categories`, makeExpressCallback(listCategoriesController));
app.post(`${apiRoot}/itinerary`, makeExpressCallback(postItineraryController));
app.post(`${apiRoot}/user`, upload.single('image'), makeExpressCallback(postUserController));

app.listen(PORT, () => {
  console.log(`Server Node.js + Express is listening on port ${PORT}`);
});

export default app;
