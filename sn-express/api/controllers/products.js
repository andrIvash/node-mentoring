import { Product } from '../../../express/models/mongoose-product';
import { mongooseErrorParser } from '../../../express/helpers/MongooseErrorParser';

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    if (!products) {
      res.status(404).json({ status: 404, message: 'Not found' });
    }
    res.json(products);
  } catch (err) {
    console.log('Error:', err);
    res.status(500).json({ status: 500, message: 'DB error.' });
  }
};

export const createNewProduct = async (req, res) => {
  const { name, brand, price } = req.swagger.params.product.value;
  try {
    const product = new Product({ name, brand, price });
    await product.save();
    res.status(201).json({ status: 201, message: 'Save Successful.' });
  } catch (err) {
    res.status(400).json({ status: 400, error: mongooseErrorParser(err) });
  }
};

export const getProduct = async (req, res) => {
  const productId = req.swagger.params.id.value;
  try {
    const selected = await Product.find({ _id: productId });
    if (!selected || !selected.length) {
      res.status(404).json({ status: 404, message: 'Product Not found.' });
    }
    res.json(selected);
  } catch (err) {
    console.log('Error:', err);
    res.status(500).json({ status: 500, message: 'DB error while find one.' });
  }
};

export const updateProduct = async (req, res) => {
  const productId = req.swagger.params.id.value;
  const { name, brand, price } = req.swagger.params.product.value;
  try {
    const query = await Product.findOneAndUpdate(
      { _id: productId },
      { name, brand, price },
      { upsert: true, runValidators: true }
    );
    if (query) {
      res.status(200).json({ status: 200, message: 'Update Successful.' });
    } else {
      res.status(404).json({ status: 404, message: 'Not found.' });
    }
  } catch (err) {
    res.status(400).json({ status: 400, error: mongooseErrorParser(err) });
  }
};

export const deleteProduct = async (req, res) => {
  const productId = req.swagger.params.id.value;
  try {
    const query = await Product.findOneAndDelete({ _id: productId });
    if (query) {
      res.status(200).json({
        message: 'Successfully deleted',
        id: productId
      });
    } else {
      res.status(404).json({ status: 404, message: 'Not found.' });
    }
  } catch (err) {
    console.log('Error:', err);
    res.status(500).json({ status: 500, message: 'DB error while delete by id.' });
  }
};
