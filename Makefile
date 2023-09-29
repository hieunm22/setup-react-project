ENV ?= example

setup-env:
	yarn
	cp .env.$(ENV) .env.local
	git checkout HEAD -- yarn.lock

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

package:
	yarn
	yarn start

docker:
	docker build -t qrcode .
	docker run --name qrcode -ditp 6666:80 --restart unless-stopped qrcode
