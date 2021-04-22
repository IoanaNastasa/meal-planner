const jwt = require('jsonwebtoken');

function auth(req, res, next) {
  try {
    const { token } = req.cookies;
    if (!token) {
      res.status(401).json({ errorMessage: 'Unauthorized.' })
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET); // throws error is not verified
    req.userID = verified.userID;
    next();
  } catch (err) {
    console.log(err);
    res.status(401).json({ errorMessage: 'Unauthorized.' })
  }
}

module.exports = auth;