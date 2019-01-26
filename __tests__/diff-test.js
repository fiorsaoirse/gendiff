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
  ['simple', 'plain'].forEach((type) => {
    generateTest(type, `before${extension}`, `after${extension}`, `${type}-before-after-result.txt`);
    generateTest(type, `before-nested${extension}`, `after-nested${extension}`, `${type}-before-after-nested-result.txt`);
  });
}); 

// generateTest('json', `before.json`, `after.yml`, `json-before-after-result.txt`);
// generateTest('json', `before-nested.json`, `after-nested.yml`, `json-before-after-nested-result.txt`);
