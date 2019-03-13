import express from 'express';
import jwt from 'jsonwebtoken';
import config from '../../config';
import bCrypt from 'bcrypt-nodejs';
import { User } from '../../models/mongoose-user';
const router = express.Router();

router.post('/', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.find({ username: username });
    if (!user) {
      return res.status(404).json({ status: 404, message: 'Not found' });
    }
    if (!bCrypt.compareSync(password, user[0].password)) {
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
  } catch (err) {
    console.log('Error:', err);
    return res.status(500).json({ status: 500, message: 'DB error.' });
  }
});

export default router;
