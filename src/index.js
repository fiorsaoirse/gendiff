import fs from 'fs';
import { extname } from 'path';
import parse from './parsers';
import ast from './gen-ast';
import render from './render';

const getFileData = path => fs.readFileSync(path, 'utf-8');

const genDiff = (pathToFirstFile, pathToSecondFile) => {
  const firstFile = getFileData(pathToFirstFile);
  const secondFile = getFileData(pathToSecondFile);

  const typeOfFirstFile = extname(pathToFirstFile);
  const typeOfSecondFile = extname(pathToSecondFile);

  const firstFormatted = parse(typeOfFirstFile)(firstFile);
  console.log('ff ', firstFormatted);
  const secondFormatted = parse(typeOfSecondFile)(secondFile);
  console.log('sf ', secondFormatted);

  const resultAst = ast(firstFormatted, secondFormatted);
  // const renderedAst = render(resultAst);

  return 'foobaz';
};

export default genDiff;
