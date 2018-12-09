import config from './config/config.json';
import { User, Product } from './models';
import DirWatcher from './helpers/dirwatcher';

console.log(`Application name: ${config.name}`);

const user = new User();
const product = new Product();

const dirWatcher = new DirWatcher();
dirWatcher.watch('data', 6000);
