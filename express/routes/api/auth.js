import express from 'express';
import jwt from 'jsonwebtoken';
import config from '../../config';
import pdb from '../../models';

const router = express.Router();

router.post('/', (req, res) => {
  const { username, password } = req.body;
  pdb.User.findOne({
    where: {
      username: username
    }
  }).then(user => {
    if (!user) {
      return res.status(404).json({ status: 404, message: 'Not found' });
    }
    if (!user.validPassword(password)) {
      return res.status(404).json({ status: 401, message: 'Incorrect password' });
    }
    const token = jwt.sign({ id: { user } }, config().get('secret'), {
      expiresIn: 86400 // expires in 24 hours
    });
    res.json({
      code: 200,
      message: 'OK',
      data: {
        user
      },
      token: token
    });
  }).catch(err => {
    console.log('Error:', err);
  });
});

export default router;
