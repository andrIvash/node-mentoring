import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// User Schema

const schema = new Schema({
  username: {
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
  password: {
    type: String,
    unique: false,
    required: true
  },
  firstName: {
    type: String,
    unique: false,
    required: false
  },
  lastName: {
    type: String,
    unique: false,
    required: false
  },
  phone: {
    type: String,
    unique: false,
    required: false,
    validate: {
      validator: function (v) {
        return /\d{3}-\d{3}-\d{4}/.test(v);
      },
      message: props => `${props.value} is not a valid phone number!`
    }
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  memberSince: {
    type: String,
    unique: false,
    required: false
  }
});

exports.User = mongoose.model('User', schema);
