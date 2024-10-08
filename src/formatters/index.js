import stylish from './stylish.js';
import plain from './plain.js';

const getFormatter = (format) => {
  const formatters = {
    stylish,
    plain,
    json: JSON.stringify,
  };
  if (!Object.hasOwn(formatters, format)) {
    throw new Error(`Incorrect format: ${format}`);
  }
  return formatters[format];
};

export default getFormatter;
