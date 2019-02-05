import jwt from 'jsonwebtoken';
import config from '../config';

const verifyToken = function (req, res, next) {
  const token = req.headers['x-access-token'];
  console.log(token)
  if (!token) {
    return res.status(401).send({ message: 'Not authorized.' });
  }

  jwt.verify(token, config().get('secret'), (err, decoded) => {
    if (err) {
      return res.status(500).send({ message: 'Failed to authenticate token.' });
    }
    req.userId = decoded.id;
    next();
  });
};

export default verifyToken;
