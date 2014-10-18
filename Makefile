T= ../../bin/duo-test -c make -R dot -P 3000

build.js: test/test.js
	@duo $< > build.js

test-browser:
	@$(T) browser

test-phantomjs:
	@$(T) phantomjs

test-saucelabs:
	@$(T) -b ie:10..11 saucelabs

build:
	npm run build

phantomjs:
	duo-test phantomjs   

test: build phantomjs

.PHONY: test test-saucelabs test-phantomjs
