/**
 * Importer transforms csv file to json
 * @path {String} path to file
 */

import csv from 'csvtojson';
import fs from 'fs';

export default class Importer {
  /**
   * Asyncronous transform
   * @path {String} path to file
   * @return {Promise}
   */
  import (path) {
    return csv().fromFile(path);
  }
  /**
   * Synchronous transform
   * @path {String} path to file
   * @return {JSON}
   */
  importSync (path) {
    const contents = fs.readFileSync(path, 'utf8');
    const result = [];
    const lines = contents.split('\n');
    const headers = lines[0].split(',');
    lines.slice(1, (lines.length - 1)).forEach(line => {
      const tempObj = {};
      const currentLine = line.split(',');
      headers.forEach((header, i) => {
        if (currentLine[i]) {
          tempObj[header] = currentLine[i];
        }
      });
      result.push(tempObj);
    });
    return JSON.stringify(result);
  }
}
