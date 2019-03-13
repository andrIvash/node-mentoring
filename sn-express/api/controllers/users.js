import { User } from '../../../express/models/mongoose-user';

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    if (!users) {
      res.status(404).json({ status: 404, message: 'Not found' });
    }
    res.json(users);
  } catch (err) {
    console.log('Error:', err);
    res.status(500).json({ status: 500, message: 'DB error.' });
  }
};

export const getUser = async (req, res) => {
  const userId = req.swagger.params.id.value;
  try {
    const selected = await User.find({ _id: userId });
    if (!selected || !selected.length) {
      res.status(404).json({ status: 404, message: 'User Not found.' });
    }
    res.json(selected);
  } catch (err) {
    console.log('Error:', err);
    res.status(500).json({ status: 500, message: 'DB error while find one.' });
  }
};

export const deleteUser = async (req, res) => {
  const userId = req.swagger.params.id.value;
  try {
    const query = await User.findOneAndDelete({ _id: userId });
    if (query) {
      res.status(200).json({
        message: 'Successfully deleted',
        id: userId
      });
    } else {
      res.status(404).json({ status: 404, message: 'Not found.' });
    }
  } catch (err) {
    console.log('Error:', err);
    res.status(500).json({ status: 500, message: 'DB error while delete by id.' });
  }
};
