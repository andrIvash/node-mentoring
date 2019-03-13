import mongoose from 'mongoose';
import lastModifiedDatePlugin from '../helpers/LastModifiedDatePlugin';
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
      required: false
    },
    long: {
      type: String,
      unique: false,
      required: false
    }
  },
});

schema.plugin(lastModifiedDatePlugin);

exports.City = mongoose.model('City', schema);
