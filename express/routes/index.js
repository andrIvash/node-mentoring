import express from 'express';
import products from './products';
import users from './users';
import auth from './auth';
import verifyToken from '../middlewares/verifyToken';

const router = express.Router();

router.use('/products', verifyToken, products);
router.use('/users', verifyToken, users);
router.use('/auth', auth);

export default router;
