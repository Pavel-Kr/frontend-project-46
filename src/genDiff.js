import _ from 'lodash';
import fs from 'fs';
import { extname } from 'path';
import parseData from './parseFile.js';
import getFormatter from './formatters/index.js';

const buildDiff = (obj1, obj2) => {
  const keys = _.union(Object.keys(obj1), Object.keys(obj2));
  const diff = keys.map((key) => {
    if (!Object.hasOwn(obj1, key)) {
      return { key, type: 'added', value: obj2[key] };
    }
    if (!Object.hasOwn(obj2, key)) {
      return { key, type: 'deleted', value: obj1[key] };
    }
    const value1 = obj1[key];
    const value2 = obj2[key];
    if (_.isPlainObject(value1) && _.isPlainObject(value2)) {
      return { key, type: 'nested', children: buildDiff(value1, value2) };
    }
    if (_.isEqual(value1, value2)) {
      return { key, type: 'unchanged', value: value1 };
    }
    return {
      key, type: 'changed', value1, value2,
    };
  });

  return _.sortBy(diff, ({ key }) => key);
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
    return formatter(diff);
  } catch (e) {
    return String(e);
  }
};

export default genDiff;
