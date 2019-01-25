import fs from 'fs';
import path from 'path';
import genDiff from '../src';

const commonPath = '__tests__/__fixtures__';

const getFileContent = path => fs.readFileSync(path, 'utf-8');

const generateTest = (firstFileName, secondFileName, expectedData) => {
  test(`Compare result ${firstFileName} and ${secondFileName} should be equal ${expectedData}`, () => {
    expect(genDiff(path.join(commonPath, firstFileName), path.join(commonPath, secondFileName)))
      .toBe(getFileContent(path.join(commonPath, expectedData)));
  })
}

['.json', '.yml', '.ini'].forEach((extension) => {
    generateTest(`before${extension}`, `after${extension}`, 'before-after-result.txt');
    generateTest(`before-nested${extension}`, `after-nested${extension}`, 'before-after-nested-result.txt');
})