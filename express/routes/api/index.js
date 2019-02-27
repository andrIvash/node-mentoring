import express from 'express';
import mUsers from './m_users';
import mProducts from './m_products';
import mAuth from './m_auth';
import deleteSession from './deleteSession';
import verifyToken from '../../middlewares/verifyToken';

const router = express.Router();

router.get('/', (req, res) => {
  return res.status(400).json({ status: 400, message: 'Wrong query' });
});

router.use('/del', deleteSession);

router.use('/v2/auth', mAuth);
router.use('/v2/products', verifyToken, mProducts);
router.use('/v2/users', verifyToken, mUsers);

export default router;
