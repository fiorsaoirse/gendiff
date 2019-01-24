import { has, union } from 'lodash';

/* const checkDifferance = (key, arg1, arg2) => {
  if ((arg1 instanceof Object) && (arg2 instanceof Object)) {
    return {
      key,
      value: ast(arg1, arg2),
      state: 'nested',
    };
  }
  if (arg1 === arg2) {
    return {
      key,
      value: arg1,
      state: 'equal',
    };
  }
  return {
    key,
    valueOld: arg1,
    valueNew: arg2,
    state: 'changed',
  };
}; */

const types = [
  {
    check: (key, arg1, arg2) => (arg1 instanceof Object) && (arg2 instanceof Object),
    process: (key, arg1, arg2) => ({
      key,
      value: ast(arg1, arg2),
      state: 'nested',
    }),
  },
  {
    check: (key, arg1, arg2) => arg1 === arg2,
    process: (key, arg1) => ({
      key,
      value: arg1,
      state: 'equal',
    }),
  },
  {
    check: (key, arg1, arg2) => arg1 !== arg2,
    process: (key, arg1, arg2) => ({
      key,
      valueOld: arg1,
      valueNew: arg2,
      state: 'changed',
    }),
  },
];

const checkDifferance = (key, arg1, arg2) => types.find(({ check }) => check(key, arg1, arg2));

const ast = (obj1, obj2) => {
  const firstKeys = Object.keys(obj1);
  const secondKeys = Object.keys(obj2);
  const unatedKeys = union(firstKeys, secondKeys);

  // console.log(`unatedKeys: [${unatedKeys}]`);

  const AST = unatedKeys.reduce((acc, key) => {
    if (has(obj1, key) && has(obj2, key)) {
      /* Если есть одинаковые ключи, надо проверить их значения.
      Этим значением может быть как объект, так и примитив.
      В случае, если оба значения - объекты, надо вызвать ast
      С этими значениями в качестве аргументов.
      В ином случае надо просто сравнить значения. */

      const { process } = checkDifferance(key, obj1[key], obj2[key]);
      const resultOfProcess = process(key, obj1[key], obj2[key]);

      return [...acc, resultOfProcess];
    }
    if (!has(obj1, key) && has(obj2, key)) {
      // Если такого ключа нет в первом объекте, но есть во втором - помечаем его "добавленным"
      // детей не проверяем т.к. дети тоже автоматически "добавлены"
      return [...acc, { key, value: obj2[key], state: 'added' }];
    }
    // Если такого ключа нет во втором объекте, но есть в первом - помечаем его "удаленным"
    return [...acc, { key, value: obj1[key], state: 'deleted' }];
  }, []);

  // console.log(AST);
  return AST;
};

export default ast;
