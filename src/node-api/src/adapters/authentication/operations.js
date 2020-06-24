export default function makeAuthOperations({ jwt }) {

  return Object.freeze({
    generateAccessToken,
    getRefreshToken,
    verifyAuthMiddleware,
    verifyRefreshToken
  });

  function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
  }

  function verifyAuthMiddleware(req, res, next, token) {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if(err) {
        res.status(403).json('Token expired');
      }
      req.user = user;
      next();
    })
  }

  function verifyRefreshToken({ token }) {
    return new Promise((resolve, reject) => {
      jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if(err) return reject(err);
        resolve(user);
      });
    });
  }

  function getRefreshToken(user) {
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
  }
}
