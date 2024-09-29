const convertToString = (diff) => {
  const spacesPerIndent = 4;
  const offsetToLeft = 2;

  const outputSign = {
    unchanged: ' ',
    added: '+',
    deleted: '-',
  };

  const iter = (obj, depth = 0) => {
    if (obj === null) {
      return 'null';
    }
    if (typeof obj !== 'object') {
      return obj;
    }

    const indentation = depth * spacesPerIndent;
    const deeperIndentation = (depth + 1) * spacesPerIndent;
    const keySpaces = ' '.repeat(deeperIndentation - offsetToLeft);
    const bracketSpaces = ' '.repeat(indentation);

    const keys = Object.entries(obj).flatMap(([key, data]) => {
      if (!Object.hasOwn(data, 'status')) {
        return `${keySpaces}  ${key}: ${iter(data, depth + 1)}`;
      }
      switch (data.status) {
        case 'changed':
          return [
            `${keySpaces}- ${key}: ${iter(data.oldValue, depth + 1)}`,
            `${keySpaces}+ ${key}: ${iter(data.newValue, depth + 1)}`,
          ];
        case 'nested':
          return `${keySpaces}  ${key}: ${iter(data.value, depth + 1)}`;
        default:
          return `${keySpaces}${outputSign[data.status]} ${key}: ${iter(data.value, depth + 1)}`;
      }
    });

    const tokens = ['{', ...keys, `${bracketSpaces}}`];

    return tokens.join('\n');
  };

  return iter(diff);
};

export default convertToString;
