import { flatten } from 'lodash';

const states = {
  nested: '  ',
  added: '+ ',
  deleted: '- ',
  equal: '  ',
};

const getStateSymbol = symbol => states[symbol];

const setSpaces = (depth) => {
  switch (depth) {
    case 1:
      return ' ';
    case 2:
      return '  ';
    case 3:
      return '   ';
    default:
      return '';
  }
};

const render = (data) => {
  // console.log('***********');

  // console.log('data \n', data);

  const iter = (record, currentDepth) => {
    console.log('current record ', record);

    const spacesCount = setSpaces(currentDepth);

    const symbol = getStateSymbol(record.state);
    const key = record.key;
    const value = (record.value instanceof Array ? flatten(record.value.map(iter, currentDepth + 1)) : record.value);

    // console.log('k ', key);
    // console.log('v ', value);

    return `${spacesCount}${symbol}${key}: ${value}`;
  };

  const result = data.map(iter, 1);

  console.log('result of render \n', result);
};

export default render;
