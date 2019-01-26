import { flatten } from 'lodash';

const checkValue = (value) => {
  if (value instanceof Object) {
    return '[complex value]';
  }
  /* if (typeof (value) === 'string') {
    return `'${value}'`;
  } */
  return value;
};

const deleteEqualRecord = record => record !== 'Property is equal';

const getKey = (previousKey, currentKey) => (previousKey ? `${previousKey}.${currentKey}` : currentKey);

const typesOfNode = {

  nested: (record, previousKey, fn) => {
    const key = getKey(previousKey, record.key);
    const children = flatten(record.value.map(currentRecord => fn(currentRecord, key)));
    return children;
  },
  added: (record, previousKey) => {
    const key = getKey(previousKey, record.key);
    const value = checkValue(record.value);
    return `Property '${key}' was added with value: ${value}`;
  },
  deleted: (record, previousKey) => {
    const key = getKey(previousKey, record.key);
    return `Property '${key}' was removed`;
  },
  equal: () => 'Property is equal',
  changed: (record, previousKey) => {
    const key = getKey(previousKey, record.key);
    const valueOld = checkValue(record.valueOld);
    const valueNew = checkValue(record.valueNew);
    return `Property '${key}' was updated. From ${valueOld} to ${valueNew}`;
  },
};

const getTypeOfNode = arg => typesOfNode[arg];

const plain = (data) => {
  const iter = (record, previousKey) => {
    const makeString = getTypeOfNode(record.type);
    return makeString(record, previousKey, iter);
  };
  const result = flatten(data.map(record => iter(record)))
    .filter(deleteEqualRecord)
    .join('\n');
  return `${result}`;
};

export default plain;
