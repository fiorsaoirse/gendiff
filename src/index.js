import fs from 'fs';
import { has, union } from 'lodash';

const getFileData = path => fs.readFileSync(path, 'utf-8');

const genDiff = (pathToFirstFile, pathToSecondFile) => {
  const firstFile = getFileData(pathToFirstFile);
  const secondFile = getFileData(pathToSecondFile);

  const firstFormatted = JSON.parse(firstFile);
  const secondFormatted = JSON.parse(secondFile);

  const firstKeys = Object.keys(firstFormatted);
  const secondKeys = Object.keys(secondFormatted);
  const unatedKeys = union(firstKeys, secondKeys);

  const result = unatedKeys.reduce((acc, key) => {
    if (has(firstFormatted, key) && has(secondFormatted, key)) {
      if (firstFormatted[key] === secondFormatted[key]) {
        return ({ ...acc, [key]: firstFormatted[key] });
      }
      return ({ ...acc, [`+ ${key}`]: secondFormatted[key], [`- ${key}`]: firstFormatted[key] });
    }
    if (!has(firstFormatted, key) && has(secondFormatted, key)) {
      return ({ ...acc, [`+ ${key}`]: secondFormatted[key] });
    }
    if (has(firstFormatted, key) && !has(secondFormatted, key)) {
      return ({ ...acc, [`- ${key}`]: firstFormatted[key] });
    }
    return ({ ...acc });
  }, {});

  return JSON.stringify(result, null, '\t');
};

export default genDiff;
