import express from 'express';
import { User } from '../../models/mongoose-user';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    if (!users) {
      return res.status(404).json({ status: 404, message: 'Not found' });
    }
    res.json(users);
  } catch (err) {
    return res.status(500).json({ status: 404, message: 'DB error.' });
  }
});

router.delete('/:id', async (req, res) => {
  const userId = req.params.id;
  try {
    await User.findOneAndRemove({ id: userId });
    return res.status(200).json({
      message: 'Successfully deleted',
      id: userId
    });
  } catch (err) {
    console.log('Error:', err);
    return res.status(500).json({ status: 500, message: 'DB error.' });
  }
});

export default router;
