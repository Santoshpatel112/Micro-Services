const http = require('http');
const app = require('./app');

const server = http.createServer(app);
const PORT =3002;
server.listen(PORT, () => {
  console.log(` Captain Services  is running on port ${PORT}`);
});

