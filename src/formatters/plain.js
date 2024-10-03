const stringify = (value) => {
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
  const tokens = diff.map((data) => {
    const newAncestry = `${ancestry}${data.key}`;
    switch (data.type) {
      case 'added':
        return `Property '${newAncestry}' was added with value: ${stringify(data.value)}`;
      case 'deleted':
        return `Property '${newAncestry}' was removed`;
      case 'changed':
        return `Property '${newAncestry}' was updated. From ${
          stringify(data.from)
        } to ${stringify(data.to)}`;
      case 'nested':
        return stringifyDiff(data.children, `${newAncestry}.`);
      case 'unchanged':
        return null;
      default:
        throw new Error(`Invalid diff type: ${data.type}`);
    }
  }).filter((token) => token !== null);
  return tokens.join('\n');
};

const convertToString = (diff) => stringifyDiff(diff, '');

export default convertToString;
