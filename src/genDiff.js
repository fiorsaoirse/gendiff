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

  const result = {};

  unatedKeys.map((key) => {
    if (has(firstFormatted, key) && has(secondFormatted, key)) {
      if (firstFormatted[key] === secondFormatted[key]) {
        result[key] = firstFormatted[key];
      } else {
        result[`- ${key}`] = firstFormatted[key];
        result[`+ ${key}`] = secondFormatted[key];
      }
    } else {
      if (has(firstFormatted, key) && !has(secondFormatted, key)) {
        result[`- ${key}`] = firstFormatted[key];
      }
      if (!has(firstFormatted, key) && has(secondFormatted, key)) {
        result[`+ ${key}`] = secondFormatted[key];
      }
    }
  });
  return JSON.stringify(result);
};

export default genDiff;
