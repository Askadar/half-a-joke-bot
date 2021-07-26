MAKEFLAGS += -j2
registry=registry.gitlab.com/zarahia/half-jokes
backend-repo=bot

# Operations
.PHONY: build-app
build-app: build-backend

.PHONY: push-app
push-app: push-backend
# /Operations

# Docker
build-backend:
	docker build -f Dockerfile --tag $(registry)/$(backend-repo) .
push-backend: build-backend
	docker push $(registry)/$(backend-repo)
# /Docker
