SHELL := /bin/bash
PATH := ./node_modules/.bin:$(PATH)
MDCAT:=$(firstword $(shell which mdcat cat 2>/dev/null))

.PHONY: help
help:
	$(MDCAT) MAKE.md


.PHONY: all

all: build

.PHONY: clean

clean:
	rm -fr node_modules
	rm -fr public

.PHONY: server
server:
	multitail \
		-cT ansi  -l \
		"bash -c 'make watch || sleep 1d'" \
		-cT ansi -l \
		"bash -c 'make assets-server || sleep 1d'" \

.PHONY: watch

watch: export NODE_ENV=development
watch: node_modules
	zola serve

.PHONY: assets-server
assets-server: export NODE_ENV=development
assets-server: node_modules
	./build.js js css watch


node_modules: export NODE_ENV=development
node_modules: yarn.lock package.json
	yarn --no-progress --non-interactive


.PHONY: deploy

deploy: build
	netlify deploy --prod

.PHONY: build

build: assets zola-build 

.PHONY: zola-build

zola-build:
	zola build

.PHONY: clean-build

clean-build: clean build

yarn.lock:
	yarn

.PHONY: assets
assets: export NODE_ENV=production
assets: node_modules
	./build.js js css
