import fs from 'fs';
import genDiff from '../src';

const pathToBeforeJSON = '__tests__/__fixtures__/before.json';
const pathToAfterJSON = '__tests__/__fixtures__/after.json';
const pathToCompareBeforeAfterResult = '__tests__/__fixtures__/before-after-result.txt';

const pathToBeforeYML = '__tests__/__fixtures__/before.yml';
const pathToAfterYML = '__tests__/__fixtures__/after.yml';

const pathToBeforeINI = '__tests__/__fixtures__/before.ini';
const pathToAfterINI = '__tests__/__fixtures__/after.ini';

const pathToBeforeNesetdJSON = '__tests__/__fixtures__/before-nested.json';
const pathToAfterNesetdJSON = '__tests__/__fixtures__/after-nested.json';

const pathToBeforeNesetdYML = '__tests__/__fixtures__/before-nested.yml';
const pathToAfterNesetdYML = '__tests__/__fixtures__/after-nested.yml';

const pathToBeforeNesetdINI = '__tests__/__fixtures__/before-nested.ini';
const pathToAfterNesetdINI = '__tests__/__fixtures__/after-nested.ini';
const pathToCompareBeforeAfterNesetdResult = '__tests__/__fixtures__/before-after-nested-result.txt';

const getFileContent = path => fs.readFileSync(path, 'utf-8');

/* test('Compare before.json and after.json should be equal to before-after-result.txt', () => {
  expect(genDiff(pathToBeforeJSON, pathToAfterJSON))
    .toBe(getFileContent(pathToCompareBeforeAfterResult));
});

test('Compare before.yml and after.yml should be equal to before-after-result.txt', () => {
  expect(genDiff(pathToBeforeYML, pathToAfterYML))
    .toBe(getFileContent(pathToCompareBeforeAfterResult));
});

test('Compare before.ini and after.ini should be equal to before-after-result.txt', () => {
  expect(genDiff(pathToBeforeINI, pathToAfterINI))
    .toBe(getFileContent(pathToCompareBeforeAfterResult));
}); */

test('Compare before-inserted.json and after-inserted.json should be equal to before-after-inserted-result.txt', () => {
  expect(genDiff(pathToBeforeNesetdJSON, pathToAfterNesetdJSON))
    .toBe(getFileContent(pathToCompareBeforeAfterNesetdResult));
});
