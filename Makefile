gendiff:
	node bin/gendiff.js

install:
	npm ci

lint:
	npx eslint .

lint-fix:
	npx eslint --fix .