import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// City Schema

const schema = new Schema({
  name: {
    type: String,
    unique: false,
    required: true
  },
  country: {
    type: String,
    unique: false,
    required: true
  },
  capital: {
    type: Boolean,
    unique: false,
    required: true
  },
  location: {
    lat: {
      type: String,
      unique: false,
      required: true
    },
    long: {
      type: String,
      unique: false,
      required: true
    }
  }
});

exports.City = mongoose.model('City', schema);
