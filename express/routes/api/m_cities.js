import express from 'express';
import { City } from '../../models/mongoose-city';
import { mongooseErrorParser } from '../../helpers/MongooseErrorParser';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const cities = await City.find();
    if (!cities) {
      return res.status(404).json({ status: 404, message: 'Not found' });
    }
    res.json(cities);
  } catch (err) {
    console.log('Error:', err);
    return res.status(500).json({ status: 500, message: 'DB error.' });
  }
});

router.get('/:id', async (req, res) => {
  const cityId = req.params.id;
  try {
    const selected = await City.find({ _id: cityId });
    if (!selected) {
      return res.status(404).json({ status: 404, message: 'City Not found.' });
    }
    res.json(selected);
  } catch (err) {
    console.log('Error:', err);
    return res.status(500).json({ status: 500, message: 'DB error while find one.' });
  }
});

router.delete('/:id', async (req, res) => {
  const cityId = req.params.id;
  try {
    await City.findOneAndRemove({ _id: cityId });
    return res.status(200).json({
      message: 'Successfully deleted',
      id: cityId
    });
  } catch (err) {
    console.log('Error:', err);
    return res.status(500).json({ status: 500, message: 'DB error while delete by id.' });
  }
});

router.post('/', async (req, res) => {
  const { name, country, capital } = req.body;
  try {
    let product = new City({ name, country, capital });
    await product.save();
    res.status(200).json({ status: 200, message: 'Save Successful.' });
  } catch (err) {
    return res.status(500).json({ status: 500, error: mongooseErrorParser(err) });
  }
});

router.put('/:id', async (req, res) => {
  const cityId = req.params.id;
  const { name, country, capital } = req.body;
  try {
    await City.findByIdAndUpdate(
      { _id: cityId },
      { name, country, capital },
      { upsert: true, runValidators: true }
    );
    res.status(200).json({ status: 200, message: 'Update Successful.' });
  } catch (err) {
    return res.status(500).json({ status: 500, error: mongooseErrorParser(err) });
  }
});

export default router;
