import fs from 'fs';

const parseFile = (filepath) => {
  const ext = filepath.split('.').at(-1);
  const data = fs.readFileSync(filepath);
  switch (ext) {
    case 'json':
      return JSON.parse(data);
    default:
      throw new Error(`Unsupported file format: ${ext}`);
  }
};

export default parseFile;
