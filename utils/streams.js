const fs = require('fs');
const path = require('path');
const util = require('util');
const program = require('commander');
const through2 = require('through2');
const csv = require('csvtojson');
const colors = require('colors');
const Stream = require('stream');
const StreamConcat = require('stream-concat');

fs.readDirAsync = util.promisify(fs.readdir);
fs.statAsync = util.promisify(fs.stat);

const scanDirectory = async (dir) => {
  const allItems = (await fs.readDirAsync(dir)).map(f => path.join(dir, f));
  const files = await Promise.all(allItems.map(async f => (
    (await fs.statAsync(f)).isDirectory() ? scanDirectory(f) : f
  )));
  return files.reduce((a, f) => a.concat(f), []);
};

const reverse = async (inputStream, outputStream) => {
  if (!inputStream || !(inputStream instanceof Stream.Readable)) {
    throw new Error('Error! Program should run with input stream');
  }

  if (!outputStream || !(outputStream instanceof Stream.Writable)) {
    throw new Error('Error! Program should run with output stream');
  }

  return new Promise((resolve, reject) => {
    inputStream
      .on('error', (error) => {
        reject(error.message);
      })
      .on('end', () => {
        resolve(true);
      })
      .pipe(through2(function (buffer, encoding, next) {
        this.push(buffer.toString().split('').reverse().join(''));
        next();
      }))
      .pipe(outputStream);
  });
};

const transform = async (inputStream, outputStream) => {
  if (!inputStream || !(inputStream instanceof Stream.Readable)) {
    throw new Error('Error! Program should run with input stream');
  }

  if (!outputStream || !(outputStream instanceof Stream.Writable)) {
    throw new Error('Error! Program should run with output stream');
  }

  return new Promise((resolve, reject) => {
    inputStream
      .on('error', (error) => {
        reject(error.message);
      })
      .on('end', () => {
        resolve(true);
      })
      .pipe(through2(function (buffer, encoding, next) {
        this.push(buffer.toString().toUpperCase());
        next();
      }))
      .pipe(outputStream);
  });
};

const outputFile = async (filePath, outputStream) => {
  if (!filePath) {
    throw new Error('Error! Program should run with file parameter');
  }

  if (!outputStream || !(outputStream instanceof Stream.Writable)) {
    throw new Error('Error! Program should run with output stream');
  }

  return new Promise((resolve, reject) => {
    const rs = fs.createReadStream(filePath);
    rs
      .on('error', (error) => {
        reject(error.message);
      })
      .on('end', () => {
        resolve(true);
      })
      .pipe(outputStream);
  });
};

const convertFromFile = async (filePath, outputStream) => {
  if (!filePath) {
    throw new Error('Error! Program should run with file parameter');
  }

  if (!outputStream || !(outputStream instanceof Stream.Writable)) {
    throw new Error('Error! Program should run with output stream');
  }

  return new Promise((resolve, reject) => {
    const rs = fs.createReadStream(filePath);
    rs
      .on('error', (error) => {
        reject(error.message);
      })
      .on('end', () => {
        resolve(true);
      })
      .pipe(csv().subscribe(json => json))
      .pipe(outputStream);
  });
};

const convertToFile = async (filePath) => {
  if (!filePath) {
    throw new Error('Error! Program should run with file parameter');
  }

  return new Promise((resolve, reject) => {
    const rs = fs.createReadStream(filePath);
    const newFileName = filePath.replace(/\.[^.]*$/, '.json');
    rs
      .on('error', (error) => {
        reject(error.message);
      });
    csv().fromStream(rs).then(json => {
      const ws = fs.createWriteStream(newFileName);
      ws
        .on('error', (error) => {
          reject(error.message);
        });
      ws.write(JSON.stringify(json), 'utf8');
      ws.end(() => {
        resolve(true);
      });
    });
  });
};

const cssBundler = async (dir) => {
  if (!dir) {
    throw new Error('Error! Program should run with path parameter');
  }
  const commonFileName = 'nodejs-homework.css';
  const files = await scanDirectory(dir);
  let commonFile = null;
  let resultFileList = files.filter(file => {
    const filename = file.split('/');
    if (filename[filename.length - 1] === commonFileName) {
      commonFile = file;
      return false;
    } else {
      return true;
    }
  });
  resultFileList = commonFile ? [...resultFileList, commonFile] : resultFileList;

  return new Promise((resolve, reject) => {
    let fileIndex = 0;
    const nextStream = () => {
      if (fileIndex === resultFileList.length) {
        return null;
      }
      return fs.createReadStream(resultFileList[fileIndex++])
        .on('error', (error) => {
          console.log(colors.red(error.message));
        });
    };

    const resultFileName = path.join(dir, '/bundle.css');
    const ws = fs.createWriteStream(resultFileName)
      .on('error', (error) => {
        reject(error.message);
      })
      .on('close', () => {
        resolve(files);
      });

    const combinedStream = new StreamConcat(nextStream);
    combinedStream.pipe(ws);
  });
};

program
  .version('0.1.0')
  .description('An application for text transformation')
  .option('-a, --action <action>', 'action name')
  .option('-f, --file [file]', '[optional]')
  .option('-p, --path [path]', '[optional]');

program.on('--help', () => {
  console.log(`
    Actions:
      reverse (reverse string data from process.stdin to process.stdout)
      transform
      outputFile
      convertFromFile
      convertToFile
      cssBundler
  `);
  console.log('Examples:');
  console.log('  $ streams --actions reverse');
  console.log('  $ streams --actions transform --file=c.csv');
  console.log('  $ streams --help');
  console.log('  $ streams -h');
  console.log('  $ streams --actions cssBundler --path=css');
});

program.parse(process.argv);
if (!process.argv.slice(2).length) {
  console.log(colors.red('Error! Program should run with at least one parameter'));
  program.help();
}

const run = (program) => {
  switch (program.action) {
    case 'reverse':
      return reverse(process.stdin, process.stdout);
    case 'transform':
      return transform(process.stdin, process.stdout);
    case 'outputFile':
      return outputFile(program.file, process.stdout);
    case 'convertFromFile':
      return convertFromFile(program.file, process.stdout);
    case 'convertToFile':
      return convertToFile(program.file);
    case 'cssBundler':
      return cssBundler(program.path);
    default:
      console.log(colors.red('Error! Wrong action argument'));
      program.help();
  }
};

run(program)
  .then(res => {
    res ? console.log('success') : console.log(colors.red('something went wrong'));
  })
  .catch(err => {
    console.log(colors.red(err));
    program.help();
  });
