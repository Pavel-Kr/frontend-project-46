import _ from 'lodash';
import fs from 'fs';
import { extname } from 'path';
import parseData from './parseFile.js';
import getFormatter from './formatters/index.js';

const sortDiff = (diff) => _.sortBy(diff, ({ key }) => key);

const getValueDiff = (value, value2, buildDiffCallback) => {
  if (typeof value === 'object' && typeof value2 === 'object') {
    return { type: 'nested', children: buildDiffCallback(value, value2) };
  }
  if (value === value2) {
    return { type: 'unchanged', value };
  }
  return { type: 'changed', from: value, to: value2 };
};

const buildDiff = (obj1, obj2) => {
  const keys = _.union(Object.keys(obj1), Object.keys(obj2));
  const diff = keys.map((key) => {
    if (Object.hasOwn(obj1, key) && Object.hasOwn(obj2, key)) {
      return { key, ...getValueDiff(obj1[key], obj2[key], buildDiff) };
    } if (!Object.hasOwn(obj2, key)) {
      return { key, type: 'deleted', value: obj1[key] };
    }
    return { key, type: 'added', value: obj2[key] };
  });

  const sorted = sortDiff(diff);

  return sorted;
};

const parseFile = (filepath) => {
  const ext = extname(filepath).slice(1);
  const data = String(fs.readFileSync(filepath));
  return parseData(data, ext);
};

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  try {
    const data1 = parseFile(filepath1);
    const data2 = parseFile(filepath2);
    const diff = buildDiff(data1, data2);
    const formatter = getFormatter(format);
    if (formatter === null) {
      throw new Error(`Incorrect format: ${format}`);
    }
    return formatter(diff);
  } catch (e) {
    return String(e);
  }
};

export default genDiff;
