import express from 'express';
import { Product } from '../../models/mongoose-product';
import { Review } from '../../models/mongoose-review';
import { mongooseErrorParser } from '../../helpers/MongooseErrorParser';

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
    const selected = await Product.find({ _id: productId });
    if (!selected || !selected.length) {
      return res.status(404).json({ status: 404, message: 'Product Not found.' });
    }
    res.json(selected);
  } catch (err) {
    console.log('Error:', err);
    return res.status(500).json({ status: 500, message: 'DB error while find one.' });
  }
});

router.delete('/:id', async (req, res) => {
  const productId = req.params.id;
  try {
    const query = await Product.findOneAndDelete({ _id: productId });
    if (query) {
      return res.status(200).json({
        message: 'Successfully deleted',
        id: productId
      });
    } else {
      return res.status(404).json({ status: 404, message: 'Not found.' });
    }
  } catch (err) {
    console.log('Error:', err);
    return res.status(500).json({ status: 500, message: 'DB error while delete by id.' });
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

  try {
    let product = new Product({ name, brand, price });
    await product.save();
    res.status(200).json({ status: 200, message: 'Save Successful.' });
  } catch (err) {
    return res.status(400).json({ status: 400, error: mongooseErrorParser(err) });
  }
});

router.put('/:id', async (req, res) => {
  const productId = req.params.id;
  const { name, brand, price } = req.body;
  try {
    const query = await Product.findOneAndUpdate(
      { _id: productId },
      { name, brand, price },
      { upsert: true, runValidators: true }
    );
    if (query) {
      return res.status(200).json({ status: 200, message: 'Update Successful.' });
    } else {
      return res.status(404).json({ status: 404, message: 'Not found.' });
    }
  } catch (err) {
    return res.status(400).json({ status: 400, error: mongooseErrorParser(err) });
  }
});

export default router;
