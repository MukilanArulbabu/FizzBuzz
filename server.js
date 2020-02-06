const express = require('express');
const app = express();
const routes = require('./routes');

const port = process.env.NODE_ENV === 'production' ? process.env.PORT : 8000;

express.Router(routes(app));
app.listen(port, () => console.log(`app running in port ${port}!`));

module.exports = app;
