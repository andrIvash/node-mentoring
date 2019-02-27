import express from 'express';
import mongoose from 'mongoose';
import { Product } from '../../models/mongoose-product';
import { Review } from '../../models/mongoose-review';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const mg = await mongoose.connect(`mongodb://localhost:27017/local`);
    const products = await Product.find();
    if (!products) {
      return res.status(404).json({ status: 404, message: 'Not found' });
    }
    res.json(products);
    mg.disconnect();
  } catch (err) {
    console.log('Error:', err);
    return res.status(404).json({ status: 404, message: 'Products Not found.' });
  }
});

router.get('/:id', async (req, res) => {
  const productId = req.params.id;
  try {
    const mg = await mongoose.connect(`mongodb://localhost:27017/local`);
    const selected = await Product.find({ id: productId });
    if (!selected) {
      return res.status(404).json({ status: 404, message: 'Product Not found.' });
    }
    res.json(selected);
    mg.disconnect();
  } catch (err) {
    console.log('Error:', err);
    return res.status(404).json({ status: 404, message: 'Product Not found.' });
  }
});

router.get('/:id/reviews', async (req, res) => {
  const productId = req.params.id;
  try {
    const mg = await mongoose.connect(`mongodb://localhost:27017/local`);
    const selected = await Review.find({ product_id: productId });
    if (!selected) {
      return res.status(404).json({ status: 404, message: 'Reviews Not found.' });
    }
    res.json(selected);
    mg.disconnect();
  } catch (err) {
    console.log('Error:', err);
    return res.status(404).json({ status: 404, message: 'Reviews Not found.' });
  }
});

router.post('/', async (req, res) => {
  const { name } = req.body;
  if (!name) {
    res.status(404).json({ status: 400, message: 'Missing required parameter - name' });
  } else {
    try {
      const mg = await mongoose.connect(`mongodb://localhost:27017/local`);
      let product = new Product({ name });
      await product.save();
      mg.disconnect();
    } catch (err) {
      console.log('Error:', err);
    }
  }
});

export default router;
