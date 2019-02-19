import express from 'express';
import apiRoutes from './api';
import verifyPassport from '../middlewares/verifyPassport';

const router = express.Router();

router.use('/api', apiRoutes);

router.get('/', (req, res) => {
  res.render('index', { });
});

router.get('/private', verifyPassport, (req, res) => {
  res.render('private', { });
});

export default router;
