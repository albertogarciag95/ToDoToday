const PORT = 3000;

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import {
  listCategoriesController,
  postItineraryController
} from './controllers'

import { makeExpressCallback } from './express-callback';

const app = express();
const apiRoot = '/api/v0';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(cors());

app.get(`${apiRoot}/categories`, makeExpressCallback(listCategoriesController));
app.post(`${apiRoot}/itinerary`, makeExpressCallback(postItineraryController));
let xmlParser = require('xml2json');
let xmlString = `<?xml version="1.0" encoding="UTF-8"?>
<TestScenario>
   <TestSuite name="TS_EdgeHome">
      <TestCaseName name="tc_Login">dt_EdgeCaseHome,dt_EdgeCaseRoute</TestCaseName>
      <TestCaseName name="tc_Logout">dt_EdgeCaseRoute</TestCaseName>
   </TestSuite>
   <TestSuite name="TS_EdgePanel">
      <TestCaseName name="tc_AddContract">dt_EdgeCaseHome,dt_EdgeCaseSpectrum</TestCaseName>
   </TestSuite>
      <TestSuite name="TS_EdgeRoute">
      <TestCaseName name="tc_VerifyContract">dt_EdgeCaseRoute</TestCaseName>
      <TestCaseName name="tc_Payment">dt_EdgeCaseRoute</TestCaseName>
   </TestSuite>
   <TestSuite name="TS_EdgeSpectrum">
      <TestCaseName name="tc_ClientFeedback">dt_EdgeCaseSpectrum</TestCaseName>
   </TestSuite>
</TestScenario>`;

const prueba = xmlParser.toJson(xmlString);

console.log(prueba);

app.listen(PORT, () => {
  console.log('Server Node.js + Express is listening on port 3000');
});

export default app;
