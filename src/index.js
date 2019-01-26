import fs from 'fs';
import { extname } from 'path';
import parse from './parsers';
import getAST from './gen-ast';
import render from './renderers';

const getFileData = path => fs.readFileSync(path, 'utf-8');

const genDiff = (pathToFirstFile, pathToSecondFile, type) => {
  const getRender = render(type);

  const firstFileData = getFileData(pathToFirstFile);
  const secondFileData = getFileData(pathToSecondFile);

  const typeOfFirstFile = extname(pathToFirstFile);
  const typeOfSecondFile = extname(pathToSecondFile);

  const parsedFirstFile = parse(typeOfFirstFile)(firstFileData);
  const parsedSecondFile = parse(typeOfSecondFile)(secondFileData);

  const AST = getAST(parsedFirstFile, parsedSecondFile);
  const renderedAST = getRender(AST);

  return renderedAST;
};

export default genDiff;
