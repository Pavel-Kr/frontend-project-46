import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const getFormatter = (format) => {
  const formatters = {
    stylish,
    plain,
    json,
  };
  return formatters[format] ?? null;
};

export default getFormatter;
