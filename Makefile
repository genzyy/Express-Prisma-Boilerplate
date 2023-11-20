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
infra-up: ## Run docker images
	docker-compose -f ./docker-compose.yml up -d

.PHONY: infra-down
infra-down: ## Stop docker images
	docker-compose down

.PHONY: run
run: ## Run api in dev environment
	yarn dev

.PHONY: build
build: ## Build project
	yarn build

.PHONY: check-format
check-format: ## Check format using eslint and prettier
	yarn run lint && yarn run prettier

.PHONY: format
format: ## Format project with eslint and prettier
	yarn run lint:fix && yarn run prettier:fix

.PHONY: gen-migration
gen-migration: ## Generate migration file
	yarn run prisma migrate dev --name $(m) --create-only

.PHONY: apply-migration
apply-migration: ## Apply migration file changes to db
	yarn run prisma migrate dev

.PHONY: db-push
db-push:
	yarn run db:push

.PHONY: test
test: ## Run tests
	$(eval include .env.test)
	$(eval export $(sh sed 's/=.*//' .env.test))
	yarn run prisma generate
	yarn run db:push
	yarn run test
