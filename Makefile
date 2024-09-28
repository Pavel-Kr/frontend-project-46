gendiff:
	node bin/gendiff.js

install:
	npm ci

lint:
	npx eslint .

lint-fix:
	npx eslint --fix .

test:
	npm run test

coverage:
	npx jest --coverage

.PHONY: coverage