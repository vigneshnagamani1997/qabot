const app = require('./app');
const env = require('dotenv');
env.config();
const server = app.listen(process.env.PORT, () => {
  console.log('server is running on port', server.address().port);
});