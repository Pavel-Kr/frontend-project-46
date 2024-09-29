import _ from 'lodash';
import getFormatter from './getFormatter.js';

const sortDiff = (diff) => {
  const keyValuePairs = _.toPairs(diff);
  const sorted = _.sortBy(keyValuePairs, ([key]) => key);
  return _.fromPairs(sorted);
};

const buildDiff = (obj1, obj2) => {
  const diff = Object.entries(obj1).reduce((acc, [key, value]) => {
    if (Object.hasOwn(obj2, key)) {
      const value2 = obj2[key];
      if (typeof value === 'object' && typeof value2 === 'object') {
        acc[key] = { status: 'nested', value: buildDiff(value, value2) };
      } else if (value === value2) {
        acc[key] = { status: 'unchanged', value };
      } else {
        acc[key] = { status: 'changed', oldValue: value, newValue: value2 };
      }
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

const genDiff = (obj1, obj2, format = 'stylish') => {
  const diff = buildDiff(obj1, obj2);
  const formatter = getFormatter(format);
  return formatter(diff);
};

export default genDiff;
