import express from 'express';
import { Product } from '../../models/mongoose-product';
import { Review } from '../../models/mongoose-review';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    if (!products) {
      return res.status(404).json({ status: 404, message: 'Not found' });
    }
    res.json(products);
  } catch (err) {
    console.log('Error:', err);
    return res.status(500).json({ status: 500, message: 'DB error.' });
  }
});

router.get('/:id', async (req, res) => {
  const productId = req.params.id;
  try {
    const selected = await Product.find({ id: productId });
    if (!selected) {
      return res.status(404).json({ status: 404, message: 'Product Not found.' });
    }
    res.json(selected);
  } catch (err) {
    console.log('Error:', err);
    return res.status(500).json({ status: 500, message: 'DB error.' });
  }
});

router.delete('/:id', async (req, res) => {
  const productId = req.params.id;
  try {
    await Product.findOneAndRemove({ id: productId });
    return res.status(200).json({
      message: 'Successfully deleted',
      id: productId
    });
  } catch (err) {
    console.log('Error:', err);
    return res.status(500).json({ status: 500, message: 'DB error.' });
  }
});

router.get('/:id/reviews', async (req, res) => {
  const productId = req.params.id;
  try {
    const selected = await Review.find({ product_id: productId });
    if (!selected) {
      return res.status(404).json({ status: 404, message: 'Reviews Not found.' });
    }
    res.json(selected);
  } catch (err) {
    console.log('Error:', err);
    return res.status(500).json({ status: 500, message: 'DB error.' });
  }
});

router.post('/', async (req, res) => {
  const {
    name,
    brand,
    price
  } = req.body;
  if (!name || !brand || !price) {
    res.status(404).json({ status: 400, message: 'Missing required parameters' });
  } else {
    try {
      let product = new Product({ name, brand, price });
      await product.save();
      res.status(200).json({ status: 200, message: 'Save Successful.' });
    } catch (err) {
      console.log('Error:', err);
      return res.status(500).json({ status: 500, message: 'Save failed' });
    }
  }
});

router.put('/', async (req, res) => {
  const { name, brand, price } = req.body;
  if (!name || !brand || !price) {
    res.status(404).json({ status: 400, message: 'Missing required parameter - name' });
  } else {
    try {
      await Product.update(
        { name, brand, price },
        { name, brand, price },
        { upsert: true }
      );
      res.status(200).json({ status: 200, message: 'Update Successful.' });
    } catch (err) {
      console.log('Error:', err);
      return res.status(500).json({ status: 500, message: 'Update failed' });
    }
  }
});

export default router;
