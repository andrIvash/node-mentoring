import http from 'http';
import config from '../config';

const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url !== '/favicon.ico') {
    res.writeHead(200, { 'Content-type': 'text/plan' });
    res.write('Hello world');
    res.end();
  }
});

server.listen(config().get('port'), () => {
  console.log(`Server running on port: ${config().get('port')}!`);
});
