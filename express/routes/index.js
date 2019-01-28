import express from 'express';
import products from './products';
import users from './users';

const router = express.Router();

router.use('/products', products);
router.use('/users', users);

export default router;
