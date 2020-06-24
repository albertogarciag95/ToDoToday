export function makeExpressCallback (controller) {
  return (req, res) => {
    const httpRequest = {
      body: req.body,
      file: req.file || null,
      query: req.query,
      cookies: req.cookies,
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
        const { accessToken, refreshToken } = httpResponse.body;
        if(refreshToken) {
          res.cookie('refresh_token', refreshToken, { httpOnly: true, secure: false });
          delete httpResponse.body.refreshToken;
        }
        if(accessToken !== undefined) {
          res.cookie('access_token', accessToken, { httpOnly: true, secure: false });
          delete httpResponse.body.accessToken;
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
