const stringifyValue = (value) => {
  if (value === null) {
    return 'null';
  }
  if (typeof value === 'object' || Array.isArray(value)) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return String(value);
};

const stringifyDiff = (diff, ancestry) => {
  const tokens = Object.entries(diff).map(([key, data]) => {
    const newAncestry = `${ancestry}${key}`;
    switch (data.status) {
      case 'added':
        return `Property '${newAncestry}' was added with value: ${stringifyValue(data.value)}`;
      case 'deleted':
        return `Property '${newAncestry}' was removed`;
      case 'changed':
        return `Property '${newAncestry}' was updated. From ${
          stringifyValue(data.oldValue)
        } to ${stringifyValue(data.newValue)}`;
      case 'nested':
        return stringifyDiff(data.value, `${newAncestry}.`);
      default:
        return '';
    }
  }).filter((token) => token.length > 0);
  return tokens.join('\n');
};

const convertToString = (diff) => stringifyDiff(diff, '');

export default convertToString;
