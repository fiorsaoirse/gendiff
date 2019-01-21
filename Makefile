install: install-deps install-flow-typed

install-flow-typed:
	npx flow-typed install

install-deps:
	npm install

lint:
	npx eslint .

publish:
	npm publish

run:
	npx babel-node -- src/bin/gendiff.js

build:
	rm -rf dist
	npm run build

test:
	npm test

check-types:
	npx flow
