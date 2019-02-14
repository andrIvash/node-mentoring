import express from 'express';
import path from 'path';
import lowdb from 'lowdb';

const router = express.Router();

// local database
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync(path.join(__dirname, '../../db.json'));
const db = lowdb(adapter);

router.get('/', (req, res) => {
  res.send(
    db.get('users')
      .value()
  );
});

export default router;
