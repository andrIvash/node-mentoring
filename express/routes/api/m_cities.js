import express from 'express';
import { City } from '../../models/mongoose-city';

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
    const selected = await City.find({ id: cityId });
    if (!selected) {
      return res.status(404).json({ status: 404, message: 'City Not found.' });
    }
    res.json(selected);
  } catch (err) {
    console.log('Error:', err);
    return res.status(500).json({ status: 500, message: 'DB error.' });
  }
});

router.delete('/:id', async (req, res) => {
  const cityId = req.params.id;
  try {
    await City.findOneAndRemove({ id: cityId });
    return res.status(200).json({
      message: 'Successfully deleted',
      id: cityId
    });
  } catch (err) {
    console.log('Error:', err);
    return res.status(500).json({ status: 500, message: 'DB error.' });
  }
});

router.post('/', async (req, res) => {
  const { name, country, capital } = req.body;
  if (!name || !country || !capital) {
    res.status(404).json({ status: 400, message: 'Missing required parameters' });
  } else {
    try {
      let product = new City({ name, country, capital });
      await product.save();
      res.status(200).json({ status: 200, message: 'Save Successful.' });
    } catch (err) {
      console.log('Error:', err);
      return res.status(500).json({ status: 500, message: 'Save failed' });
    }
  }
});

router.put('/', async (req, res) => {
  const { name, country, capital } = req.body;
  if (!name || !country || !capital) {
    res.status(404).json({ status: 400, message: 'Missing required parameters' });
  } else {
    try {
      await City.update(
        { name, country, capital },
        { name, country, capital },
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
