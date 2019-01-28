import express from 'express';
import path from 'path';
import lowdb from 'lowdb';
import generate from 'nanoid/non-secure/generate';

const router = express.Router();

// local database
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync(path.join(__dirname, '../db.json'));
const db = lowdb(adapter);

router.get('/', (req, res) => {
  res.send(
    db.get('products')
      .value()
  );
});

router.get('/:id', (req, res) => {
  const productId = req.params.id;
  const singleProduct = db.get('products').find({ id: +productId }).value();
  if (!singleProduct) {
    res.status(404).json({ status: 404, message: 'Product Not found.' });
  } else {
    res.send(singleProduct);
  }
});

router.get('/:id/reviews', (req, res) => {
  const productId = req.params.id;
  const reviews = db.get('reviews').find({ product_id: +productId }).value();
  if (!reviews) {
    res.status(404).json({ status: 404, message: 'Reviews for this product Not found.' });
  }
  res.send(reviews);
});

router.post('/', (req, res) => {
  const { name } = req.body;
  if (!name) {
    res.status(404).json({ status: 400, message: 'Missing required parameter - name' });
  } else {
    const newProduct = {
      id: generate('1234567890', 5),
      ...req.body
    };
    db.get('products')
      .push(newProduct)
      .write();
    res.header('Location', `http://localhost:3000/api/v1.0/products/${newProduct.id}`);
    res.json(newProduct);
  }
});

export default router;
