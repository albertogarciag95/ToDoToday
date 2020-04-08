const PORT = 3000;

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import makeCallback from './express-callback';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}))
app.use(cors());


app.listen(PORT, () => {
  console.log('Server Node.js + Express is listening on port 3000')
});

export default app;

