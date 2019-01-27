import { flattenDeep } from 'lodash';

const stringify = (value, depth, spaces, step) => {
  if (!(value instanceof Object)) {
    return value;
  }
  const valueKeys = Object.keys(value);
  const mappedValue = valueKeys.map(key => `  ${key}: ${value[key]}`);
  const indent = depth * step - 2;
  const indentNext = (depth + 1) * step - 2;
  return `{\n${spaces.repeat(indentNext)}${mappedValue}\n  ${spaces.repeat(indent)}}`;
};

const typesOfNode = {

  nested: (record, currentDepth, fn, spaces, step) => {
    const { key } = record;
    const value = record.value.map(currentChild => fn(currentChild, currentDepth + 1));
    const indent = currentDepth * step - 2;

    return [`${spaces.repeat(indent)}  ${key}: {`, ...value, `  ${spaces.repeat(indent)}}`];
  },
  added: (record, currentDepth, fn, spaces, step) => {
    const { key } = record;
    const value = stringify(record.value, currentDepth, spaces, step);
    const indent = currentDepth * step - 2;
    return `${spaces.repeat(indent)}+ ${key}: ${value}`;
  },
  deleted: (record, currentDepth, fn, spaces, step) => {
    const { key } = record;
    const value = stringify(record.value, currentDepth, spaces, step);
    const indent = currentDepth * step - 2;
    return `${spaces.repeat(indent)}- ${key}: ${value}`;
  },
  equal: (record, currentDepth, fn, spaces, step) => {
    const { key } = record;
    const value = stringify(record.value, currentDepth, spaces, step);
    const indent = currentDepth * step - 2;
    return `${spaces.repeat(indent)}  ${key}: ${value}`;
  },
  changed: (record, currentDepth, fn, spaces, step) => {
    const { key } = record;
    const valueOld = stringify(record.valueOld, currentDepth, spaces, step);
    const valueNew = stringify(record.valueNew, currentDepth, spaces, step);
    const indent = currentDepth * step - 2;
    return [`${spaces.repeat(indent)}- ${key}: ${valueOld}`, `${spaces.repeat(indent)}+ ${key}: ${valueNew}`];
  },
};

const checkNode = arg => typesOfNode[arg];

const render = (data) => {
  const firstLevelSpaces = ' ';
  const stepInSpacesBetweenLevels = 4;
  // console.log(JSON.stringify(data));
  const iter = (record, currentDepth) => {
    const makeString = checkNode(record.type);
    return makeString(record, currentDepth, iter, firstLevelSpaces, stepInSpacesBetweenLevels);
  };

  const result = flattenDeep(data.map(currentRecord => iter(currentRecord, 1))).join('\n');
  return `{\n${result}\n}`;
};

export default render;
