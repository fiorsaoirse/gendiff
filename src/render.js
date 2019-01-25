import { flatten } from 'lodash';

const stringify = (value, depth, spaces) => {
  if (value instanceof Object) {
    const valueKeys = Object.keys(value);
    //console.log('value ', JSON.stringify(value));    
    const mapped = valueKeys.map(key => `  ${key}: ${value[key]}`).join('');
    //console.log('mapped ', mapped);
    //console.log('spaces [', spaces, ']');
    //console.log(`{\n${spaces.repeat(depth)}${mapped}\n${spaces.repeat(depth)}}`);
    return `{\n${spaces.repeat(depth + 1)}${mapped}\n${spaces.repeat(depth + 1)}}`;
  }
  return value;
};

const typesOfNode = [
  {
    check: typeOfNode => typeOfNode === 'nested',
    makeString: (record, currentDepth, fn, spaces) => {
      const { key } = record;
      const value = flatten(record.children.map(currentChild => fn(currentChild, currentDepth + 1)))
                    .join('\n');
      return `${spaces.repeat(currentDepth)}  ${key}: {\n${value}\n${spaces.repeat(currentDepth)}}`
    }
  },
  {
    check: typeOfNode => typeOfNode === 'added',
    makeString: (record, currentDepth, fn, spaces) => {
      const { key } = record;
      const value = stringify(record.value, currentDepth, spaces);
      return `${spaces.repeat(currentDepth)}+ ${key}: ${value}`;
    }
  },
  {
    check: typeOfNode => typeOfNode === 'deleted',
    makeString: (record, currentDepth, fn, spaces) => {
      const { key } = record;
      const value = stringify(record.value, currentDepth, spaces);
      return `${spaces.repeat(currentDepth)}- ${key}: ${value}`;
    }
  },
  {
    check: typeOfNode => typeOfNode === 'equal',
    makeString: (record, currentDepth, fn, spaces) => {
      const { key } = record;
      const value = stringify(record.value, currentDepth, spaces);
      return `${spaces.repeat(currentDepth)}  ${key}: ${value}`;
    }
  },
  {
    check: typeOfNode => typeOfNode === 'changed',
    makeString: (record, currentDepth, fn, spaces) => {
      const { key } = record;
      const valueOld = stringify(record.valueOld, currentDepth, spaces);
      const valueNew = stringify(record.valueNew, currentDepth, spaces);
      return `${spaces.repeat(currentDepth)}- ${key}: ${valueOld}\n${spaces.repeat(currentDepth)}+ ${key}: ${valueNew}`;
    }
  }
];

const checkNode = arg => typesOfNode.find(({ check }) => check(arg));

const render = (data) => {
  const firstLevelSpaces = '  ';
  //console.log(JSON.stringify(data));
  const iter = (record, currentDepth) => {
    const { makeString } = checkNode(record.state);
    return makeString(record, currentDepth, iter, firstLevelSpaces);
  };

  const result = data.map(currentRecord => iter(currentRecord, 1)).join('\n');
  return `{\n${result}\n}\n`;
};

export default render;
