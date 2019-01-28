import fs from 'fs';
import path from 'path';
import http from 'http';
import config from '../config';

const title = 'Hello world';

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  const rs = fs.createReadStream(path.join(__dirname, 'index.html'));
  rs
    .on('error', (error) => {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.write(error.message);
      res.end();
    })
    .on('data', data => {
      data = data.toString().replace('{message}', title);
      res.write(data);
    })
    .on('end', () => {
      res.end();
    });
});

server.listen(config().get('port'), () => {
  console.log(`Server running on port: ${config().get('port')}!`);
});
