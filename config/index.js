import nconf from 'nconf';
import path from 'path';

module.exports = () => {
  return nconf.argv()
    .env()
    .file({ file: path.join(__dirname, 'config.json') });
};
