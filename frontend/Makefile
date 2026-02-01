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
