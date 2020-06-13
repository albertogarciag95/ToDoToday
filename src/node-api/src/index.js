const PORT = 2345;

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import multer from 'multer';
import mkdirp from 'mkdirp';

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
app.use(cors());

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    mkdirp.sync('uploads/');
    callback(null, 'uploads/');
  },
  filename: (req, file, callback) => {
    callback(null, req.body.userName + '_' + String(Date.now()) + '_' + file.originalname)
  }
});

const upload = multer({ storage: storage });

app.get(`${apiRoot}/categories`, makeExpressCallback(listCategoriesController));
app.post(`${apiRoot}/itinerary`, makeExpressCallback(postItineraryController));
app.post(`${apiRoot}/user`, upload.single('userImage'), makeExpressCallback(postUserController));

app.listen(PORT, () => {
  console.log(`Server Node.js + Express is listening on port ${PORT}`);
});

export default app;
