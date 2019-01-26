import { has, union } from 'lodash';

const hasKey = (key, firstObj, secondObj) => has(firstObj, key) && has(secondObj, key);
const isObjects = (value1, value2) => (value1 instanceof Object) && (value2 instanceof Object);

const typesOfActions = [
  {
    check: (key, obj1, obj2) => hasKey(key, obj1, obj2) && isObjects(obj1[key], obj2[key]),
    process: (key, obj1, obj2, fn) => ({
      key,
      value: fn(obj1[key], obj2[key]),
      state: 'nested',
    }),
  },
  {
    check: (key, obj1, obj2) => hasKey(key, obj1, obj2) && (obj1[key] === obj2[key]),
    process: (key, obj1) => ({
      key,
      value: obj1[key],
      state: 'equal',
    }),
  },
  {
    check: (key, obj1, obj2) => hasKey(key, obj1, obj2) && (obj1[key] !== obj2[key]),
    process: (key, obj1, obj2) => ({
      key,
      valueOld: obj1[key],
      valueNew: obj2[key],
      state: 'changed',
    }),
  },
  {
    check: (key, obj1, obj2) => (has(obj1, key) && !(has(obj2, key))),
    process: (key, obj1) => ({
      key,
      value: obj1[key],
      state: 'deleted',
    }),
  },
  {
    check: (key, obj1, obj2) => (!(has(obj1, key)) && has(obj2, key)),
    process: (key, obj1, obj2) => ({
      key,
      value: obj2[key],
      state: 'added',
    }),
  },
];

const checkAction = (key, obj1, obj2) => typesOfActions.find(({ check }) => check(key, obj1, obj2));

const ast = (obj1, obj2) => {
  const firstKeys = Object.keys(obj1);
  const secondKeys = Object.keys(obj2);
  const unatedKeys = union(firstKeys, secondKeys);

  const AST = unatedKeys.map((key) => {
    const { process } = checkAction(key, obj1, obj2);
    return process(key, obj1, obj2, ast);
  });

  // console.log('AST \n', JSON.stringify(AST));
  return AST;
};

export default ast;
