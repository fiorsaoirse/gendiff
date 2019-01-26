import fs from 'fs';
import { extname } from 'path';
import parse from './parsers';
import ast from './gen-ast';
import render from './renderers/render';

const getFileData = path => fs.readFileSync(path, 'utf-8');

const genDiff = (pathToFirstFile, pathToSecondFile, type) => {
  const getRender = render(type);

  const firstFile = getFileData(pathToFirstFile);
  const secondFile = getFileData(pathToSecondFile);

  const typeOfFirstFile = extname(pathToFirstFile);
  const typeOfSecondFile = extname(pathToSecondFile);

  const firstFormatted = parse(typeOfFirstFile)(firstFile);
  const secondFormatted = parse(typeOfSecondFile)(secondFile);

  const getAST = ast(firstFormatted, secondFormatted);
  const getRenderedAST = getRender(getAST);

  return getRenderedAST;
};

export default genDiff;
