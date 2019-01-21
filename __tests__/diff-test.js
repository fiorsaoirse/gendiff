import genDiff from '../src/genDiff';
import fs from 'fs';

const pathToBeforeJSON = '__tests__/__fixtures__/before.json';
const pathToAfterJSON = '__tests__/__fixtures__/after.json';
const pathToCompareBeforeAfterResult = '__tests__/__fixtures__/before-after-result.txt';
const getFileContent = path => fs.readFileSync(path, 'utf-8');

test('Compare before.json and after.json should be equal to before-after-result.txt', () => {
	expect(genDiff(pathToBeforeJSON, pathToAfterJSON)).toBe(getFileContent(pathToCompareBeforeAfterResult));
});