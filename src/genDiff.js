import fs from 'fs';
import { has } from 'lodash';

const getFileData = path => fs.readFileSync(path, 'utf-8');

const genDiff = (pathToJSON1, pathToJSON2) => {
	const firstFile = getFileData(pathToJSON1);
	const secondFile = getFileData(pathToJSON2);
	const firstFormatted = JSON.parse(firstFile);
	const secondFormatted = JSON.parse(secondFile);
	const firstKeys = Object.keys(firstFormatted);
	const compareFirstResult = firstKeys.reduce((acc, currentKey) => {
		if (!has(secondFormatted, currentKey)) {
			acc[`- ${currentKey}`] = firstFormatted[currentKey];
		} 
		else {
			if (firstFormatted[currentKey] === secondFormatted[currentKey]) {
				acc[currentKey] = firstFormatted[currentKey];
			} else {
				acc[`- ${currentKey}`] = firstFormatted[currentKey];
				acc[`+ ${currentKey}`] = secondFormatted[currentKey];
			}
		}
		return acc;
	}, {});

	const secondKeys = Object.keys(secondFormatted);
	const result = secondKeys.reduce((acc, currentKey) => {
		if (!has(firstFormatted, currentKey)) {
			acc[`+ ${currentKey}`] = secondFormatted[currentKey];
		};
		return acc;
	}, compareFirstResult)

	return JSON.stringify(result);
};

export default genDiff;