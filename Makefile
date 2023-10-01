# Build configuration
# -------------------

APP_NAME = `grep -m1 name package.json | awk -F: '{ print $$2 }' | sed 's/[ ",]//g'`
APP_VERSION = `grep -m1 version package.json | awk -F: '{ print $$2 }' | sed 's/[ ",]//g'`
GIT_REVISION = `git rev-parse HEAD`

PRETTIER_FILES_PATTERN = '{src,scripts}/**/*.{js,ts}' '**/*.md'
SCRIPTS_PATTERN = 'src/**/*.ts'

.PHONY: header
header:
	@echo "\033[34mEnvironment\033[0m"
	@echo "\033[34m---------------------------------------------------------------\033[0m"
	@printf "\033[33m%-23s\033[0m" "APP_NAME"
	@printf "\033[35m%s\033[0m" $(APP_NAME)
	@echo ""
	@printf "\033[33m%-23s\033[0m" "APP_VERSION"
	@printf "\033[35m%s\033[0m" $(APP_VERSION)
	@echo "\n"

.PHONY: targets
targets:
	@echo "\033[34mTargets\033[0m"
	@echo "\033[34m---------------------------------------------------------------\033[0m"
	@perl -nle'print $& if m{^[a-zA-Z_-]+:.*?## .*$$}' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-22s\033[0m %s\n", $$1, $$2}'

.PHONY: dependencies
dependencies: ## Install dependencies required by the application
	yarn install

.PHONY: infra-up
infra-up:
	docker-compose -f ./docker-compose.yml up -d

.PHONY: infra-down
infra-down:
	docker-compose down

.PHONY: run
run:
	yarn dev

.PHONY: build
build:
	yarn build

.PHONY: check-format
check-format:
	yarn run lint && yarn run prettier

.PHONY: format
format:
	yarn run lint:fix && yarn run prettier:fix

.PHONY: db-generate
db-generate:
	yarn run prisma generate

.PHONY: db-push
db-push:
	yarn run db:push