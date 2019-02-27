import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// Product Schema

const schema = new Schema({
  id: {
    type: Number,
    unique: true,
    required: true
  },
  product_id: {
    type: Number,
    unique: false,
    required: true
  },
  author: {
    type: String,
    unique: false,
    required: true
  },
  text: {
    type: String,
    unique: false,
    required: true
  }
});

exports.Review = mongoose.model('Review', schema);
