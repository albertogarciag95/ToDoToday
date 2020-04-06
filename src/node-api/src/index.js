const PORT = 3000;

import express from 'express';
import bodyParser from 'body-parser';

import makeCallback from './express-callback';

const app = express();

app.use(bodyParser.json());
app.use(bodyparser.urlencoded({ extended: false}))
app.use(cors());

// app.post(`${apiRoot}/comments`, makeCallback(postComment))
// app.delete(`${apiRoot}/comments/:id`, makeCallback(deleteComment))
// app.delete(`${apiRoot}/comments`, makeCallback(deleteComment))
// app.patch(`${apiRoot}/comments/:id`, makeCallback(patchComment))
// app.patch(`${apiRoot}/comments`, makeCallback(patchComment))
// app.get(`${apiRoot}/comments`, makeCallback(getComments))
// app.use(makeCallback(notFound));


// listen for requests
app.listen(PORT, () => {
  console.log('Server Node.js + Express is listening on port 3000')
});


export default app;

