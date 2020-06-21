export default function makeAuthOperations({ jwt, db }) {

  return Object.freeze({
    generateAccessToken,
    getRefreshToken,
    verifyAuthMiddleware
  });

  function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' }); //10-15m
  }

  function verifyAuthMiddleware(req, res, next, token) {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if(err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    })
  }

  function getRefreshToken(user) {
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
  }
}
