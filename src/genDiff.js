import fs from 'fs';
import { has } from 'lodash/fp';
import { extname } from 'path';
import parse from './parsers';

const getFileData = path => fs.readFileSync(path, 'utf-8');

const genDiff = (pathToFirstFile, pathToSecondFile) => {
  const firstFile = getFileData(pathToFirstFile);
  const secondFile = getFileData(pathToSecondFile);

  const typeOfFirstFile = extname(pathToFirstFile);
  const typeOfSecondFile = extname(pathToSecondFile);

  console.log(`first file is ${typeOfFirstFile} and second file is ${typeOfSecondFile}`);

  const firstFormatted = parse(typeOfFirstFile)(firstFile);
  console.log('ff ', firstFormatted);

  const secondFormatted = parse(typeOfSecondFile)(secondFile);
  console.log('sf ', secondFormatted);

  const firstKeys = Object.keys(firstFormatted);
  const compareFirstResult = firstKeys.reduce((acc, currentKey) => {
    if (!has(secondFormatted, currentKey)) {
      acc[`- ${currentKey}`] = firstFormatted[currentKey];
    } else if (firstFormatted[currentKey] === secondFormatted[currentKey]) {
      acc[currentKey] = firstFormatted[currentKey];
    } else {
      acc[`- ${currentKey}`] = firstFormatted[currentKey];
      acc[`+ ${currentKey}`] = secondFormatted[currentKey];
    }
    return acc;
  }, {});

  const secondKeys = Object.keys(secondFormatted);
  const result = secondKeys.reduce((acc, currentKey) => {
    if (!has(firstFormatted, currentKey)) {
      acc[`+ ${currentKey}`] = secondFormatted[currentKey];
    }
    return acc;
  }, compareFirstResult);

  return JSON.stringify(result);
};

export default genDiff;
