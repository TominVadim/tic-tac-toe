install:
	npm ci
play:
	node bin/tic-tac-toe.js
lint:
	npx eslint
lint-fix:
	npx eslint . --fix