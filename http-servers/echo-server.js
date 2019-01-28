import http from 'http';
import config from '../config';

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  req
    .on('data', data => {
      console.log('Echoing: %s', data.toString());
      res.write(data.toString() + '\n');
    })
    .on('end', () => {
      res.end();
    });
});

server.listen(config().get('port'), () => {
  console.log(`Server running on port: ${config().get('port')}!`);
});
