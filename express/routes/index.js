import express from 'express';
import products from './products';
import users from './users';
import auth from './auth';
import passportAuth from './passportAuth';
import verifyToken from '../middlewares/verifyToken';
import verifyPassport from '../middlewares/verifyPassport';

const router = express.Router();

router.use('/products', verifyPassport, products);
router.use('/users', verifyToken, users);
router.use('/auth', auth);
router.use('/auth2', passportAuth);

export default router;
