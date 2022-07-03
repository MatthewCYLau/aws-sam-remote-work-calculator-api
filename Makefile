.PHONY: build-RuntimeDependenciesLayer build-lambda-common
.PHONY: build-getAllCalculationsFunction build-getCalculationByIdFunction build-sendMessageToSqsFunction build-healthCheckFunction build-calculateSavingsFunction build-calculateSavingsAsyncFunction

build-getAllCalculationsFunction:
	$(MAKE) HANDLER=src/handlers/get-all-calculations.ts build-lambda-common
build-getCalculationByIdFunction:
	$(MAKE) HANDLER=src/handlers/get-calculation-by-id.ts build-lambda-common
build-sendMessageToSqsFunction:
	$(MAKE) HANDLER=src/handlers/send-message-sqs.ts build-lambda-common
build-writeItemFunction:
	$(MAKE) HANDLER=src/handlers/write-item.ts build-lambda-common
build-healthCheckFunction:
	$(MAKE) HANDLER=src/handlers/health-check.ts build-lambda-common
build-calculateSavingsFunction:
	$(MAKE) HANDLER=src/handlers/calculate-savings.ts build-lambda-common
build-calculateSavingsAsyncFunction:
	$(MAKE) HANDLER=src/handlers/calculate-savings-async.ts build-lambda-common

build-lambda-common:
	npm install
	rm -rf dist
	echo "{\"extends\": \"./tsconfig.json\", \"include\": [\"${HANDLER}\"] }" > tsconfig-only-handler.json
	npm run build -- --build tsconfig-only-handler.json
	cp -r dist "$(ARTIFACTS_DIR)/"

build-RuntimeDependenciesLayer:
	mkdir -p "$(ARTIFACTS_DIR)/nodejs"
	cp package.json package-lock.json "$(ARTIFACTS_DIR)/nodejs/"
	npm install --production --prefix "$(ARTIFACTS_DIR)/nodejs/"
	rm "$(ARTIFACTS_DIR)/nodejs/package.json" # to avoid rebuilding when changes doesn't relate to dependencies
