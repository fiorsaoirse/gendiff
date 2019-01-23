import fs from 'fs';
import genDiff from '../src';

const pathToBeforeJSON = '__tests__/__fixtures__/before.json';
const pathToAfterJSON = '__tests__/__fixtures__/after.json';
const pathToCompareBeforeAfterResult = '__tests__/__fixtures__/before-after-result.txt';

const pathToBeforeYML = '__tests__/__fixtures__/before.yml';
const pathToAfterYML = '__tests__/__fixtures__/after.yml';

const getFileContent = path => fs.readFileSync(path, 'utf-8');

test('Compare before.json and after.json should be equal to before-after-result.txt', () => {
  expect(genDiff(pathToBeforeJSON, pathToAfterJSON))
    .toBe(getFileContent(pathToCompareBeforeAfterResult));
});


test('Compare before.yml and after.yml should be equal to before-after-result.txt', () => {
  expect(genDiff(pathToBeforeYML, pathToAfterYML))
    .toBe(getFileContent(pathToCompareBeforeAfterResult));
});
