import express from 'express';

const router = express.Router();

router.post('/', (req, res) => {
  req.session.destroy();
  res.status(200).json({ status: 200, message: 'Session has deleted' });
});

export default router;
