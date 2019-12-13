const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const { userId } = decodedToken;
    if (req.body.userId && req.body.userId !== userId) {
      res.status(401).json({
        message: 'invalid user ID',
      });
    } else {
      next();
    }
  } catch (err) {
    res.status(500).json({
      message: 'Invalid request! at auth',
    });
  }
};
