import stylish from './formatters/stylish.js';

const getFormatter = (format) => {
  const formatters = {
    stylish,
  };
  return formatters[format];
};

export default getFormatter;
