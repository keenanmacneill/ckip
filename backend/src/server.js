const server = require('./app');

const port = 8080;

server.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
