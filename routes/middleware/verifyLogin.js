const jwt = require('jsonwebtoken');

module.exports = () => (req, res, next) => {
  const tokenHeader = req.headers.authorization;
  if (typeof tokenHeader !== 'undefined') {
    const bearer = tokenHeader.split(' ');
    const token = bearer[1];
    jwt.verify(token, process.env.SECRET, (err, data) => {
      if (err) {
        res.status(403);
        res.json({
          auth: false,
          status: 403,
        });
      } else if (data) {
        next();
      }
    });
  } else {
    res.status(403);
    res.json({
      auth: false,
      status: 403,
    });
  }
};
