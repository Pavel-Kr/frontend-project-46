import YAML from 'yaml';

const parseData = (data, format) => {
  switch (format) {
    case 'json':
      return JSON.parse(data);
    case 'yml':
    case 'yaml':
      return YAML.parse(data);
    default:
      throw new Error(`Unsupported format: ${format}`);
  }
};

export default parseData;
