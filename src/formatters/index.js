import stylish from './stylish.js';
import plain from './plain.js';

const getFormatter = (format) => {
  const formatters = {
    stylish,
    plain,
    json: JSON.stringify,
  };
  return formatters[format] ?? null;
};

export default getFormatter;
