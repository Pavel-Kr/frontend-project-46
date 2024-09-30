import _ from 'lodash';
import parseFile from './parseFile.js';
import getFormatter from './formatters/index.js';

const sortDiff = (diff) => {
  const keyValuePairs = _.toPairs(diff);
  const sorted = _.sortBy(keyValuePairs, ([key]) => key);
  return _.fromPairs(sorted);
};

const getValueDiff = (value, value2, buildDiffCallback) => {
  if (typeof value === 'object' && typeof value2 === 'object') {
    return { status: 'nested', value: buildDiffCallback(value, value2) };
  }
  if (value === value2) {
    return { status: 'unchanged', value };
  }
  return { status: 'changed', oldValue: value, newValue: value2 };
};

const buildDiff = (obj1, obj2) => {
  const diff = Object.entries(obj1).reduce((acc, [key, value]) => {
    if (Object.hasOwn(obj2, key)) {
      acc[key] = getValueDiff(value, obj2[key], buildDiff);
    } else {
      acc[key] = { status: 'deleted', value };
    }
    return acc;
  }, {});

  Object.entries(obj2).reduce((acc, [key, value]) => {
    if (!Object.hasOwn(obj1, key)) {
      acc[key] = { status: 'added', value };
    }
    return acc;
  }, diff);

  const sorted = sortDiff(diff);

  return sorted;
};

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const data1 = parseFile(filepath1);
  const data2 = parseFile(filepath2);
  const diff = buildDiff(data1, data2);
  const formatter = getFormatter(format);
  if (formatter === null) {
    return `Incorrect format: ${format}`;
  }
  return formatter(diff);
};

export default genDiff;
