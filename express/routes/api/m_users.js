import express from 'express';
import mongoose from 'mongoose';
import { User } from '../../models/mongoose-user';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const mg = await mongoose.connect(`mongodb://localhost:27017/local`);
    const users = await User.find();
    if (!users) {
      return res.status(404).json({ status: 404, message: 'Not found' });
    }
    res.json(users);
    mg.disconnect();
  } catch (err) {
    console.log('Error:', err);
  }
});

export default router;
