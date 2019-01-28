import http from 'http';
import config from '../config';

const product = {
  id: 1,
  name: 'Supreme T-Shirt',
  brand: 'Supreme',
  price: 99.99,
  options: [
    { color: 'blue' },
    { size: 'XL' }
  ]
};

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-type': 'application/json' });
  res.write(JSON.stringify(product));
  res.end();
});

server.listen(config().get('port'), () => {
  console.log(`Server running on port: ${config().get('port')}!`);
});
