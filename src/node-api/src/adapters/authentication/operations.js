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
        // if (Date.now() >= user.exp * 1000) {
        //   const refreshToken = req.cookies.refresh_token || "";
        //   if(!refreshToken) return res.sendStatus(401);
        //   if(!db.existsToken(refreshToken)) return res.sendStatus(403);

        //   jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        //     if(err) return res.sendStatus(403);
        //     const accessToken = generateAccessToken({ name: user.name });
        //     res.cookie('access_token', accessToken, { httpOnly: true, secure: false });
        //   });
        // }
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
