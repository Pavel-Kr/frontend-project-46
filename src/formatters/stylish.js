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

const stringifyDiff = (diff, depth = 0) => {
  const keys = diff.flatMap((data) => {
    switch (data.type) {
      case 'changed':
        return [
          `- ${data.key}: ${stringify(data.from, depth + 1)}`,
          `+ ${data.key}: ${stringify(data.to, depth + 1)}`,
        ];
      case 'nested':
        return `  ${data.key}: ${stringifyDiff(data.children, depth + 1)}`;
      case 'unchanged':
      case 'added':
      case 'deleted':
        return `${outputSign[data.type]} ${data.key}: ${stringify(
          data.value,
          depth + 1,
        )}`;
      default:
        throw new Error(`Invalid diff type: ${data.type}`);
    }
  });
  return convertEntriesToObjectString(keys, depth);
};

const convertToString = (diff) => stringifyDiff(diff);

export default convertToString;
