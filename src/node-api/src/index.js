const PORT = 2345;

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import multer from 'multer';
import mkdirp from 'mkdirp';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import fs from 'fs';

import {
  listCategoriesController,
  postItineraryController,
  postUserController,
  loginController,
  tokenController
} from './controllers'

import { makeExpressCallback } from './express-callback';
import { addBatches } from './batches';

import auth from './adapters/authentication';
import { AppError } from './errors/AppError';

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
    fs.readdir('uploads', function (err, files) {
      if (err) return callback(err);
      try {
        files.forEach(fileUploaded => {
          if(fileUploaded.includes(req.body.userName)) {
            throw new AppError('Image cannot be uploaded; user already exists', 400);
          }
        });
        const fileName = req.body.userName + '_' + String(Date.now()) + '_' + file.originalname;
        callback(null, fileName);
      } catch(err) {
        console.log(err);
        callback(err);
      }
    });
  }
});

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

app.get(`${apiRoot}/categories`, authenticateUser, makeExpressCallback(listCategoriesController));
app.post(`${apiRoot}/itinerary`, authenticateUser, makeExpressCallback(postItineraryController));
app.post(`${apiRoot}/user`, upload.single('userImage'), makeExpressCallback(postUserController));
app.post(`${apiRoot}/login`, makeExpressCallback(loginController));
app.post(`${apiRoot}/token`, authenticateUser, makeExpressCallback(tokenController));

app.listen(PORT, () => {
  console.log(`Server Node.js + Express is listening on port ${PORT}`);
});

export default app;
