import { City } from '../../../express/models/mongoose-city';
import { mongooseErrorParser } from '../../../express/helpers/MongooseErrorParser';

export const getAllCities = async (req, res) => {
  try {
    const cities = await City.find();
    if (!cities) {
      res.status(404).json({ status: 404, message: 'Not found' });
    }
    res.json(cities);
  } catch (err) {
    console.log('Error:', err);
    res.status(500).json({ status: 500, message: 'DB error.' });
  }
};

export const createNewCity = async (req, res) => {
  const { name, country, capital } = req.swagger.params.city.value;
  try {
    const city = new City({ name, country, capital });
    await city.save();
    res.status(201).json({ status: 201, message: 'Save Successful.' });
  } catch (err) {
    res.status(400).json({ status: 400, error: mongooseErrorParser(err) });
  }
};

export const getCity = async (req, res) => {
  const cityId = req.swagger.params.id.value;
  try {
    const selected = await City.find({ _id: cityId });
    if (!selected || !selected.length) {
      res.status(404).json({ status: 404, message: 'City Not found.' });
    }
    res.json(selected);
  } catch (err) {
    console.log('Error:', err);
    res.status(500).json({ status: 500, message: 'DB error while find one.' });
  }
};

export const updateCity = async (req, res) => {
  const cityId = req.swagger.params.id.value;
  const { name, country, capital } = req.swagger.params.city.value;
  try {
    const query = await City.findOneAndUpdate(
      { _id: cityId },
      { name, country, capital },
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

export const deleteCity = async (req, res) => {
  const cityId = req.swagger.params.id.value;
  try {
    const query = await City.findOneAndDelete({ _id: cityId });
    if (query) {
      res.status(200).json({
        message: 'Successfully deleted',
        id: cityId
      });
    } else {
      res.status(404).json({ status: 404, message: 'Not found.' });
    }
  } catch (err) {
    console.log('Error:', err);
    res.status(500).json({ status: 500, message: 'DB error while delete by id.' });
  }
};
