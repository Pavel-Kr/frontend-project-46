import fs from 'fs';
import YAML from 'yaml';

const parseFile = (filepath) => {
  const ext = filepath.split('.').at(-1);
  const data = String(fs.readFileSync(filepath));
  switch (ext) {
    case 'json':
      return JSON.parse(data);
    case 'yml':
    case 'yaml':
      return YAML.parse(data);
    default:
      throw new Error(`Unsupported file format: ${ext}`);
  }
};

export default parseFile;
