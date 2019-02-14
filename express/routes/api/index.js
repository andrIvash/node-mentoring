import express from 'express';
import products from './products';
import users from './users';
import auth from './auth';
import passportAuth from './passportAuth';
import deleteSession from './deleteSession';
import verifyToken from '../../middlewares/verifyToken';
import verifyPassport from '../../middlewares/verifyPassport';

const router = express.Router();

router.get('/', (req, res) => {
  return res.status(400).json({ status: 400, message: 'Wrong query' });
});
router.use('/products', verifyPassport, products);
router.use('/users', verifyToken, users);
router.use('/auth', auth);
router.use('/auth2', passportAuth);
router.use('/del', deleteSession);

export default router;
