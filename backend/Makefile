services: # Create the database for the application
	podman network exists unidash-network || podman network create unidash-network
	uvx podman-compose up -d postgres mailhog
	@echo "Waiting for PostgreSQL to be ready..."
	@max_attempts=30; \
	attempt=0; \
	while [ $$attempt -lt $$max_attempts ]; do \
		if podman exec unidash-pg pg_isready -U postgres > /dev/null 2>&1; then \
			echo "PostgreSQL is ready!"; \
			exit 0; \
		fi; \
		attempt=$$((attempt + 1)); \
		echo "Waiting for PostgreSQL... ($$attempt/$$max_attempts)"; \
		sleep 1; \
	done; \
	echo "Error: PostgreSQL did not become ready in time." && exit 1

_preflight-checks: # check if all dependencies to run the app are available
	# check if the .env file is properly configured
	@test -f .env || (echo "Error: .env file not found. Copy .env.example to .env and configure it." && exit 1)
	@command -v node > /dev/null || (echo "Error: node is not installed." && exit 1)
	@command -v npm > /dev/null || (echo "Error: npm is not installed." && exit 1)

service-check: # Check if all services are up and running
	@podman container inspect unidash-pg --format '{{.State.Status}}' 2>/dev/null | grep -q running || (echo "Error: PostgreSQL (unidash-pg) is not running. Run 'make services' first." && exit 1)
	@podman container inspect mailhog --format '{{.State.Status}}' 2>/dev/null | grep -q running || (echo "Error: Mailhog is not running. Run 'make services' first." && exit 1)
	@echo "All services are up and running."
	# Test the .env credentials
	@. ./.env && podman exec unidash-pg pg_isready -U "$$DB_USER" -d "$$DB_NAME" > /dev/null 2>&1 || (echo "Error: Cannot connect to PostgreSQL with .env credentials." && exit 1)
	@echo "Database credentials are valid."

run: _preflight-checks # Run the application without any container
	npm run start:dev

migration: services _preflight-checks  # run the migration
	npx prisma migrate dev

setup:
	npm install
	make migration

compose-up:
	uvx podman-compose up

load-backups: migration # Load all SQL backups from ./backup/ into the database
	@echo "Loading backups from ./backup/ directory..."
	@for file in ./backup/*.sql; do \
		echo "Loading $$file..."; \
		podman exec -i unidash-pg psql -U postgres -d unidash < "$$file" || exit 1; \
	done
	@echo "All backups loaded successfully."

clean: # Turn off the database and delete the database volume
	@echo "Stopping and removing database container..."
	-uvx podman-compose down postgres
	@echo "Removing database volume..."
	-podman volume rm backend_postgres
	@echo "Database cleanup complete."

build: # Build the backend Docker image
	podman build -t ghcr.io/marcospaul0/unidash-backend:latest -f Dockerfile .
