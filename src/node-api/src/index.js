const PORT = 2345;

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import multer from 'multer';
import mkdirp from 'mkdirp';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import {
  listCategoriesController,
  postItineraryController,
  postUserController,
  loginController
} from './controllers'

import { makeExpressCallback } from './express-callback';
import { addBatches } from './batches';

import auth from './adapters/authentication';

const app = express();
const apiRoot = '/api/v0';

dotenv.config();

addBatches();
app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:4200',
  credentials: true
}));

app.use(cookieParser());

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    mkdirp.sync('uploads/');
    callback(null, 'uploads/');
  },
  filename: (req, file, callback) => {
    callback(null, req.body.userName + '_' + String(Date.now()) + '_' + file.originalname)
  }
});

const refreshTokens = [];

const authenticateUser = (req, res, next) => {
  const token = req.cookies.access_token || '';
  try {
    if (!token) {
      return res.status(401).json('You need to Login');
    }
    auth.verifyAuthMiddleware(req, res, next, token);
  } catch (err) {
    return res.status(500).json(err.toString());
  }
}

const upload = multer({ storage: storage });

app.get(`${apiRoot}/categories`, authenticateUser, makeExpressCallback(listCategoriesController, refreshTokens));
app.post(`${apiRoot}/itinerary`, authenticateUser, makeExpressCallback(postItineraryController, refreshTokens));
app.post(`${apiRoot}/user`, upload.single('userImage'), makeExpressCallback(postUserController));
app.post(`${apiRoot}/login`, makeExpressCallback(loginController));

app.listen(PORT, () => {
  console.log(`Server Node.js + Express is listening on port ${PORT}`);
});

export default app;
