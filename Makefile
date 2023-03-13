ENV ?= example

setup-env:
	yarn
	cp .env.$(ENV) .env.local

reset:
	rm -rf build
	rm -rf node_modules
	rm -rf coverage
	rm -f .env.*
	git reset --hard

start:
	make setup-env
	yarn start

build-static:
	rm -rf build
	make setup-env
	yarn build

serve-static:
	make build-static
	serve -s build
