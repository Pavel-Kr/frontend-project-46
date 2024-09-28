import _ from 'lodash';

const convertToString = (diff) => {
  const separator = '\n  ';
  const tokens = Object.entries(diff)
    .reduce((acc, [key, data]) => {
      switch (data.status) {
        case 'unchanged':
          acc.push(`  ${key}: ${data.value}`);
          break;
        case 'added':
          acc.push(`+ ${key}: ${data.value}`);
          break;
        case 'deleted':
          acc.push(`- ${key}: ${data.value}`);
          break;
        case 'changed':
          acc.push(`- ${key}: ${data.oldValue}`);
          acc.push(`+ ${key}: ${data.newValue}`);
          break;
        default:
          console.log(`Invalid key status: ${data.status}`);
          break;
      }
      return acc;
    }, []);

  const textDiff = tokens.join(separator);
  return `{${separator}${textDiff}\n}`;
};

const sortDiff = (diff) => {
  const keyValuePairs = _.toPairs(diff);
  const sorted = _.sortBy(keyValuePairs, ([key]) => key);
  return _.fromPairs(sorted);
};

const genDiff = (obj1, obj2) => {
  const diff = Object.entries(obj1).reduce((acc, [key, value]) => {
    if (Object.hasOwn(obj2, key)) {
      const value2 = obj2[key];
      if (value === value2) {
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

  return convertToString(sorted);
};

export default genDiff;
