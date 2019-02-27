import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// Product Schema

const schema = new Schema({
  id: {
    type: Number,
    unique: true,
    required: true
  },
  name: {
    type: String,
    unique: false,
    required: true,
    validate: {
      validator: function (v) {
        return v.length > 3;
      },
      message: props => `${props.value} name length should be more then 3 symbols!`
    }
  },
  brand: {
    type: String,
    unique: false,
    required: false
  },
  price: {
    type: Number,
    unique: false,
    required: false
  },
  color: {
    type: String,
    unique: false,
    required: true
  },
  size: {
    type: String,
    unique: false,
    required: true
  }
});

exports.Product = mongoose.model('Product', schema);
