import { flatten } from 'lodash';

const states = {
  nested: '  ',
  added: '+ ',
  deleted: '- ',
  equal: '  ',
  changed: '+ ,- ',
};

const setSpaces = (depth) => {
  switch (depth) {
    case 1:
      return '  ';
    case 2:
      return '      ';
    case 3:
      return '          ';
    default:
      return '';
  }
};

const getStateSymbol = symbol => states[symbol];

const stringify = (value, depth) => {
  if (value instanceof Object) {
    const valueKeys = Object.keys(value);
    const spaces = setSpaces(depth);
    const spacesOnNextDepth = setSpaces(depth + 1);
    const mapped = `{\n${valueKeys.map(key => `${spacesOnNextDepth}  ${key}: ${value[key]}`)}\n${spaces}  }`;
    return mapped;
  }
  return value;
};

const typesOfValue = [
  {
    check: record => record.children.length,
    process: (record, currentDepth, fn) => {
      const spacesCount = setSpaces(currentDepth);
      const symbol = getStateSymbol(record.state);
      const { key } = record;
      const value = flatten(record.children
        .map(childRecord => fn(childRecord, currentDepth + 1)))
        .join('\n');

      return `${spacesCount}${symbol}${key}: {\n${value}\n${spacesCount}${symbol}}`;
    },
  },
  {
    check: record => record.value !== undefined,
    process: (record, currentDepth) => {
      const spacesCount = setSpaces(currentDepth);
      const symbol = getStateSymbol(record.state);
      const { key } = record;
      const value = stringify(record.value, currentDepth);

      return `${spacesCount}${symbol}${key}: ${value}`;
    },
  },
  {
    check: record => record.valueOld !== undefined && record.valueNew !== undefined,
    process: (record, currentDepth) => {
      const spacesCount = setSpaces(currentDepth);
      const symbol = getStateSymbol(record.state).split(',');
      const [symbolNew, symbolOld] = symbol;
      const { key } = record;
      const valueOld = stringify(record.valueOld, currentDepth);
      const valueNew = stringify(record.valueNew, currentDepth);

      return `${spacesCount}${symbolOld}${key}: ${valueOld}\n${spacesCount}${symbolNew}${key}: ${valueNew}`;
    },
  },
];

const getTypeOfValue = arg => typesOfValue.find(({ check }) => check(arg));

const render = (data) => {
  const iter = (record, currentDepth) => {
    const { process } = getTypeOfValue(record);
    return process(record, currentDepth, iter);
  };

  const result = data.map(currentRecord => iter(currentRecord, 1)).join('\n');
  return `{\n${result}\n}\n`;
};

export default render;
