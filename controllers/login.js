const jwt = require('jsonwebtoken');

const failure = (res) => res.json({ auth: false });

exports.auth = (req, res) => {
  try {
    const userName = (req.body && req.body.userName) || '';
    const password = (req.body && req.body.password) || '';
    if (userName.toLowerCase() === process.env.USER || password === process.env.PASSWORD) {
      const user = {
        id: 1,
        userName,
        password,
      };
      jwt.sign({ user }, process.env.SECRET, (err, token) => {
        if (err) throw new Error('JWT sign error');
        res.json({
          auth: true,
          token,
        });
      });
    } else {
      res.status(403);
      failure(res);
    }
  } catch (err) {
    throw new Error('unexpected error occured');
  }
};
