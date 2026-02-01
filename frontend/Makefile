_preflight-checks: # check if all dependencies to run the app are available
	@test -f .env || (echo "Error: .env file not found. Copy .env.example to .env and configure it." && exit 1)
	@command -v node > /dev/null || (echo "Error: node is not installed." && exit 1)
	@command -v npm > /dev/null || (echo "Error: npm is not installed." && exit 1)

backend-check: # Check if the backend API is reachable
	@. ./.env && curl -sf "$$NEXT_PUBLIC_API_URL" > /dev/null 2>&1 || (echo "Error: Backend API is not reachable at $$(. ./.env && echo $$NEXT_PUBLIC_API_URL). Make sure the backend is running." && exit 1)
	@echo "Backend API is reachable."

run: _preflight-checks # Run the application without any container
	npm run dev

setup:
	npm install

compose-up:
	uvx podman-compose up

build: # Build the frontend Docker image
	@if [ -f .env ]; then \
		. ./.env && podman build -t ghcr.io/marcospaul0/unidash-frontend:latest -f Dockerfile.prod \
			--build-arg NEXT_PUBLIC_API_URL="$$NEXT_PUBLIC_API_URL" \
			--build-arg NEXT_PUBLIC_SERVER_SIDE_API_URL="$$NEXT_PUBLIC_SERVER_SIDE_API_URL" \
			--build-arg NEXT_PUBLIC_APP_URL="$$NEXT_PUBLIC_APP_URL" \
			--build-arg ITEMS_PER_PAGE="$$ITEMS_PER_PAGE" \
			.; \
	else \
		echo "Warning: .env file not found. Building with default values."; \
		podman build -t ghcr.io/marcospaul0/unidash-frontend:latest -f Dockerfile.prod \
			--build-arg NEXT_PUBLIC_API_URL="http://localhost:3333" \
			--build-arg NEXT_PUBLIC_SERVER_SIDE_API_URL="http://localhost:3333" \
			--build-arg NEXT_PUBLIC_APP_URL="http://localhost:3000" \
			--build-arg ITEMS_PER_PAGE="12" \
			.; \
	fi
