import fs from 'fs';
import path from 'path';
import genDiff from '../src';

const commonPath = '__tests__/__fixtures__';

const getFileContent = pathToFile => fs.readFileSync(pathToFile, 'utf-8');

const generateTest = (type, firstFileName, secondFileName, expectedData) => {
  test(`Compare ${type} result ${firstFileName} and ${secondFileName} should be equal ${expectedData}`, () => {
    const firstFilePath = path.join(commonPath, firstFileName);
    const secondFilePath = path.join(commonPath, secondFileName);
    expect(genDiff(firstFilePath, secondFilePath, type))
      .toBe(getFileContent(path.join(commonPath, expectedData)));
  });
};

['.json', '.yml', '.ini'].forEach((extension) => {
  generateTest('simple', `before${extension}`, `after${extension}`, 'before-after-result.txt');
  generateTest('simple', `before-nested${extension}`, `after-nested${extension}`, 'before-after-nested-result.txt');
  generateTest('plain', `before${extension}`, `after${extension}`, 'plain-before-after-result.txt');
  generateTest('plain', `before-nested${extension}`, `after-nested${extension}`, 'plain-before-after-nested-result.txt');
});
