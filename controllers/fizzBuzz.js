const cache = require('../utils/cache');

module.exports.test = () => (req, res) => {
  try {
    const { count } = req.params;
    if (cache[count]) {
      const data = (Object.values(cache).slice(0, count));
      return res.json({ auth: true, data });
    }
    for (let i = 1; i <= count; i++) {
      if (!cache[i]) {
        if ((i % 3 === 0) && (i % 5 === 0)) {
          cache[i] = 'FizzBuzz';
        } else if (i % 3 === 0) {
          cache[i] = 'Fizz';
        } else if (i % 5 === 0) {
          cache[i] = 'Buzz';
        } else {
          cache[i] = i;
        }
      }
    }
    const data = (Object.values(cache).slice(0, count));
    res.json({ auth: true, data });
  } catch (err) {
    throw new Error('unexpected error occured in fizzBuzz');
  }
};
