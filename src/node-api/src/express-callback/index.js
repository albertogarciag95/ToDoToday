export function makeExpressCallback (controller) {
  return (req, res, next) => {
    const httpRequest = {
      body: req.body,
      file: req.file || null,
      query: req.query,
      params: req.params,
      ip: req.ip,
      method: req.method,
      path: req.path,
      headers: {
        'Content-Type': req.get('Content-Type'),
        Referer: req.get('referer'),
        'User-Agent': req.get('User-Agent')
      }
    }
    controller(httpRequest)
      .then(httpResponse => {
        if(httpResponse.headers) {
          res.set(httpResponse.headers);
        }
        res.type('json');
        res.status(httpResponse.statusCode).send(httpResponse.body);
      })
      .catch(e => {
        console.log("ERROR", e);
        res.status(500).send('An unkown error occurred.')
      });
  }
}
