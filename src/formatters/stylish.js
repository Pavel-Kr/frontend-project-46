const spacesPerIndent = 4;
const offsetToLeft = 2;

const outputSign = {
  unchanged: ' ',
  added: '+',
  deleted: '-',
};

const convertEntriesToObjectString = (entries, depth, addOffsetLeft = true) => {
  const offset = addOffsetLeft ? offsetToLeft : 0;
  const indentation = depth * spacesPerIndent;
  const deeperIndentation = (depth + 1) * spacesPerIndent;
  const keySpaces = ' '.repeat(deeperIndentation - offset);
  const bracketSpaces = ' '.repeat(indentation);

  const tokens = entries.map((entry) => `${keySpaces}${entry}`);

  return ['{', ...tokens, `${bracketSpaces}}`].join('\n');
};

const stringify = (obj, depth) => {
  if (obj === null) {
    return 'null';
  }
  if (typeof obj !== 'object') {
    return obj;
  }

  const keys = Object.entries(obj).map(([key, value]) => `${key}: ${stringify(value, depth + 1)}`);
  return convertEntriesToObjectString(keys, depth, false);
};

const stringifyDiff = (obj, depth = 0) => {
  const keys = Object.entries(obj).flatMap(([key, data]) => {
    switch (data.status) {
      case 'changed':
        return [
          `- ${key}: ${stringify(data.oldValue, depth + 1)}`,
          `+ ${key}: ${stringify(data.newValue, depth + 1)}`,
        ];
      case 'nested':
        return `  ${key}: ${stringifyDiff(data.value, depth + 1)}`;
      default:
        return `${outputSign[data.status]} ${key}: ${stringify(
          data.value,
          depth + 1,
        )}`;
    }
  });
  return convertEntriesToObjectString(keys, depth);
};

const convertToString = (diff) => stringifyDiff(diff);

export default convertToString;
