import fs from 'fs';
import { has, union } from 'lodash';
import { extname } from 'path';
import parse from './parsers';

const getFileData = path => fs.readFileSync(path, 'utf-8');

const genDiff = (pathToFirstFile, pathToSecondFile) => {
  const firstFile = getFileData(pathToFirstFile);
  const secondFile = getFileData(pathToSecondFile);

  const typeOfFirstFile = extname(pathToFirstFile);
  const typeOfSecondFile = extname(pathToSecondFile);

  const firstFormatted = parse(typeOfFirstFile)(firstFile);
  const secondFormatted = parse(typeOfSecondFile)(secondFile);

  const firstKeys = Object.keys(firstFormatted);
  const secondKeys = Object.keys(secondFormatted);
  const unatedKeys = union(firstKeys, secondKeys);

  /* const result = unatedKeys.reduce((acc, key) => {
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
  }, {}); */

  const result2 = unatedKeys.map((key) => {
    if (has(firstFormatted, key) && has(secondFormatted, key)) {
      if (firstFormatted[key] === secondFormatted[key]) {
        return `    ${key}: ${firstFormatted[key]}`;
      }
      return [`  + ${key}: ${secondFormatted[key]}`, `  - ${key}: ${firstFormatted[key]}`].join('\n');
    }
    if (!has(firstFormatted, key) && has(secondFormatted, key)) {
      return `  + ${key}: ${secondFormatted[key]}`;
    }
    return `  - ${key}: ${firstFormatted[key]}`;
  });

  // console.log(result2);

  // console.log(`{\n${result2.join('\n')}\n}\n`);

  return `{\n${result2.join('\n')}\n}\n`;
};

export default genDiff;
