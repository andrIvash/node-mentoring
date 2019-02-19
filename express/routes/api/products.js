import express from 'express';
import pdb from '../../models';

const router = express.Router();

router.get('/', (req, res) => {
  return pdb.Product.findAll()
    .then(products => res.send(products))
    .catch((err) => {
      console.log('There was an error querying products', JSON.stringify(err));
      return res.send(err);
    });
});

router.get('/:id', (req, res) => {
  const productId = req.params.id;
  return pdb.Product.findById(productId)
    .then(product => {
      if (!product) {
        return res.status(404).json({ status: 404, message: 'Product Not found.' });
      }
      res.send(product);
    })
    .catch((err) => {
      console.log('There was an error querying product', JSON.stringify(err));
      return res.send(err);
    });
});

router.get('/:id/reviews', (req, res) => {
  const productId = req.params.id;
  return pdb.Review.findAll({
    where: {
      product_id: productId
    }
  })
    .then(reviews => {
      if (!reviews) {
        return res.status(404).json({ status: 404, message: 'Reviews for this product Not found.' });
      }
      res.send(reviews);
    })
    .catch((err) => {
      console.log('There was an error querying reviews', JSON.stringify(err));
      return res.send(err);
    });
});

router.post('/', (req, res) => {
  const { name } = req.body;
  if (!name) {
    res.status(404).json({ status: 400, message: 'Missing required parameter - name' });
  } else {
    const newProduct = {
      ...req.body
    };
    return pdb.Product.create(newProduct)
      .then(product => {
        res.header('Location', `http://localhost:3000/api/v1.0/products/${product.id}`);
        res.send(product);
      })
      .catch((err) => {
        console.log('***There was an error creating a Product', JSON.stringify(product))
        return res.status(400).send(err);
      });
  }
});

export default router;
