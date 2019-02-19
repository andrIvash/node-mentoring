import express from 'express';
import jwt from 'jsonwebtoken';
import path from 'path';
import lowdb from 'lowdb';
import config from '../../config';

const router = express.Router();
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync(path.join(__dirname, '../../db.json'));
const db = lowdb(adapter);

router.post('/', (req, res) => {
  const { username, password } = req.body;
  if (config().get('username') !== username || config().get('password') !== password) {
    res.status(404).json({ status: 404, message: 'Not found' });
  } else {
    const currentUser = db.get('users').find({ id: 1001 }).value();
    const token = jwt.sign({ id: { currentUser } }, config().get('secret'), {
      expiresIn: 86400 // expires in 24 hours
    });
    res.json({
      code: 200,
      message: 'OK',
      data: {
        user: currentUser
      },
      token: token
    });
  }
});

export default router;
