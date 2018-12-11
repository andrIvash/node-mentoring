import config from './config/config.json';
import { User, Product } from './models';
import DirWatcher from './helpers/dirwatcher';
import Importer from './helpers/importer';

console.log(`Application name: ${config.name}`);

const user = new User();
const product = new Product();

const dirWatcher = new DirWatcher();
const importer = new Importer();

dirWatcher.on('changed​', (path) => {
  // importer.import('./' + path)
  //   .then(res => {
  //     console.log(res);
  //   });
  console.log(importer.importSync(path));
});

dirWatcher.watch('data', 6000);
