/**
 * DirWatcher watches for given path with a given delay and emit a "changed" event
 * if directory contents have been changed
 *
 * @path {String} path to directory
 * @delay {Number} delay
 */

import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import util from 'util';
import EventEmitter from 'events';

fs.readDirAsync = util.promisify(fs.readdir);
fs.statAsync = util.promisify(fs.stat);
fs.readFileAsync = util.promisify(fs.readFile);

export default class DirWatcher extends EventEmitter {
  constructor () {
    super();
    this.files = {};
    this.currentFileNames = [];
    this.dir = null;
  }

  watch (dir, delay) {
    this.dir = dir;
    this.emit('update');
    setInterval(() => {
      this.scanDirectory(this.dir)
        .then(res => {
          this.currentFileNames = res;
        })
        .then(() => {
          return this.checkDeletion();
        })
        .then(() => {
          return this.compare();
        })
        .then(() => {
        })
        .catch(err => console.log(err));
    }, delay);
  }

  scanDirectory (dir) {
    return fs.readDirAsync(dir).then(list => {
      return Promise.all(list.map(file => {
        file = path.join(dir, file);
        return fs.statAsync(file).then(stat => {
          if (stat.isDirectory()) {
            return this.scanDirectory(file);
          } else {
            return file;
          }
        });
      }));
    })
      .then(results => {
        return Array.prototype.concat.apply([], results);;
      })
      .catch(err => {
        console.error(err);
      });
  }

  compare () {
    const fileKeys = Object.keys(this.files);
    if (fileKeys.length === 0) {
      return Promise.all(this.currentFileNames.map(path => {
        return this.addFile(path);
      }));
    } else {
      return Promise.all(this.currentFileNames.map(path => {
        if (!fileKeys.includes(path)) {
          return this.addFile(path);
        } else {
          return fs.readFileAsync(path).then((res) => {
            const newSha1 = this.getSha1(res.toString());
            if (this.files[path] !== newSha1) {
              return this.changeFile(path, newSha1);
            } else {
              return Promise.resolve();
            }
          });
        }
      }));
    }
  }

  checkDeletion () {
    const fileKeys = Object.keys(this.files);
    return Promise.all(
      fileKeys.map(key => {
        if (!this.currentFileNames.includes(key)) {
          this.deleteFile(key);
        } else {
          return Promise.resolve();
        }
      })
    );
  }

  addFile (path) {
    return fs.readFileAsync(path).then(res => {
      this.files[path] = this.getSha1(res.toString());
      this.emit('changed​', path);
      console.log('new', path);
      return path;
    });
  }

  changeFile (path, newHash) {
    this.files[path] = newHash;
    this.emit('changed​', path);
    console.log('changed​', path);
    return Promise.resolve();
  }

  deleteFile (key) {
    delete this.files[key];
    console.log('delete', key);
    return Promise.resolve();
  }

  getSha1 (string) {
    return crypto.createHash('sha1').update(string).digest('hex');
  }
}
