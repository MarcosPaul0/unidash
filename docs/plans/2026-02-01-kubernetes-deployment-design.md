# Kubernetes Deployment Design for Unidash

**Date:** 2026-02-01
**Target Environment:** Kind cluster (Podman Desktop)
**Status:** Approved

## Overview

This document outlines the Kubernetes deployment architecture for the Unidash application, consisting of a PostgreSQL database, NestJS backend API, and Next.js frontend.

## Architecture

### Components

1. **PostgreSQL Database**
   - Stateful deployment with persistent storage
   - Single replica (development setup)
   - Internal ClusterIP service on port 5432

2. **Backend API (NestJS)**
   - Deployment with InitContainer for database readiness check
   - Runs Prisma migrations before starting main application
   - Internal ClusterIP service on port 3333
   - Depends on PostgreSQL

3. **Frontend (Next.js)**
   - Standard deployment
   - Exposed via NodePort service for external access
   - Communicates with backend via internal service

### File Structure

```
kubernetes/
├── README.md                          # Setup guide & future Ingress documentation
├── postgres/
│   ├── postgres-pv.yaml              # PersistentVolume (hostPath)
│   ├── postgres-pvc.yaml             # PersistentVolumeClaim (5Gi)
│   ├── postgres-deployment.yaml      # PostgreSQL 16 deployment
│   └── postgres-service.yaml         # ClusterIP service
├── backend/
│   ├── backend-configmap.yaml        # Non-sensitive environment variables
│   ├── backend-secret.yaml           # Sensitive data (JWT keys, passwords)
│   ├── backend-deployment.yaml       # Deployment with initContainer
│   └── backend-service.yaml          # ClusterIP service
└── frontend/
    ├── frontend-configmap.yaml       # Frontend environment variables
    ├── frontend-deployment.yaml      # Frontend deployment
    └── frontend-service.yaml         # NodePort service
```

## Detailed Component Design

### 1. PostgreSQL Deployment

**Storage Strategy:**
- **PersistentVolume:** hostPath type pointing to `/mnt/data/unidash/postgres`
- **PersistentVolumeClaim:** 5Gi storage request
- **Future Options (documented in README):**
  - NFS for shared storage across nodes
  - Ceph/Rook for distributed storage
  - Cloud provider CSI drivers (EBS, Azure Disk, GCE PD)
  - Local PersistentVolume with node affinity

**Container Configuration:**
- Image: `postgres:16`
- Port: 5432
- Environment variables from Secret:
  - `POSTGRES_USER`: postgres
  - `POSTGRES_PASSWORD`: docker (from Secret)
  - `POSTGRES_DB`: unidash
  - `PGDATA`: /var/lib/postgresql/data/pgdata
- Volume mount: PVC mounted at `/var/lib/postgresql/data`

**Service:**
- Type: ClusterIP
- Port: 5432
- Selector: `app=unidash, component=postgres`

### 2. Backend Deployment

**InitContainer: wait-for-postgres**
- Image: `postgres:16`
- Purpose: Ensure PostgreSQL is ready before starting backend
- Command: Loop with `pg_isready -h postgres-service -U postgres`
- Max wait time: 60 seconds (configurable)
- Based on pattern from `backend/Makefile`

**InitContainer: run-migrations**
- Image: Same as backend (unidash-api)
- Purpose: Run Prisma database migrations
- Command: `npx prisma migrate deploy`
- Ensures database schema is up-to-date before application starts
- Uses same environment variables as main container

**Main Container: backend**
- Image: `unidash-api:latest` (from backend/Dockerfile)
- Port: 3333
- Environment variables from ConfigMap:
  - `PORT`: 3333
  - `FRONTEND_BASE_URL`
  - `ACCOUNT_ACTIVATION_URL`
  - `PASSWORD_RESET_URL`
  - `INCOMING_STUDENT_URL`
  - `REFRESH_TOKEN_COOKIE`
  - `JWT_ACCESS_TOKEN_EXPIRATION_SECONDS`
  - `JWT_INCOMING_STUDENT_EXPIRATION_DAYS`
  - `JWT_REFRESH_TOKEN_EXPIRATION_DAYS`
  - `SMTP_HOST`
  - `SMTP_PORT`
  - `SMTP_FROM`

- Environment variables from Secret:
  - `DB_URL`: Full PostgreSQL connection string
  - `JWT_PRIVATE_KEY`: Private key for JWT signing
  - `JWT_PUBLIC_KEY`: Public key for JWT verification
  - `SMTP_USER`: SMTP username
  - `SMTP_PASS`: SMTP password

**Service:**
- Type: ClusterIP
- Port: 3333
- Selector: `app=unidash, component=backend`
- Name: `backend-service`

### 3. Frontend Deployment

**Main Container: frontend**
- Image: `unidash-app:latest` (from frontend/Dockerfile.prod)
- Port: 3000
- Environment variables from ConfigMap:
  - `NEXT_PUBLIC_API_URL`: Points to backend service (http://backend-service:3333)

**Service:**
- Type: NodePort
- Port: 3000
- NodePort: 30080 (configurable, range 30000-32767)
- Selector: `app=unidash, component=frontend`
- Accessible at: `http://localhost:30080` from host machine

**Future Ingress Setup (documented in README):**
- Install nginx-ingress or traefik
- Create Ingress resource with host-based routing
- Optional: cert-manager for TLS/SSL certificates
- Example configuration provided in README

## Configuration Management

### ConfigMaps

**backend-configmap:**
- Non-sensitive configuration values
- Application URLs, timeouts, public settings
- Can be viewed/edited without security concerns

**frontend-configmap:**
- API endpoint configuration
- Public environment variables

### Secrets

**backend-secret:**
- Database credentials
- JWT signing keys (private/public)
- SMTP credentials
- Encoded in base64
- Should be created from actual .env files
- **Important:** Not committed to git, created manually or via CI/CD

**postgres-secret:**
- PostgreSQL password
- Separate from backend secret for modularity

## Deployment Process

### Prerequisites
1. Kind cluster running (via Podman Desktop)
2. Docker images built and loaded into Kind:
   - `unidash-api:latest`
   - `unidash-app:latest`
3. Secrets populated with actual values

### Deployment Order
1. Create secrets (postgres, backend, frontend)
2. Deploy PostgreSQL (PV → PVC → Deployment → Service)
3. Deploy Backend (ConfigMap → Secret → Deployment → Service)
4. Deploy Frontend (ConfigMap → Deployment → Service)

### Verification Steps
1. Check PostgreSQL pod is running and ready
2. Verify backend initContainers completed successfully
3. Check backend pod logs for successful startup
4. Access frontend at `http://localhost:30080`
5. Verify frontend can communicate with backend

## Resource Considerations

**Current Design:**
- No resource limits/requests defined
- Suitable for local development with dedicated Kind cluster
- Allows flexibility for testing and debugging

**Future Production Considerations (documented in README):**
- Add resource requests/limits based on load testing
- Recommended starting points:
  - PostgreSQL: 512Mi-1Gi memory, 250m-500m CPU
  - Backend: 512Mi-1Gi memory, 250m-500m CPU
  - Frontend: 256Mi-512Mi memory, 100m-250m CPU
- Configure HPA (Horizontal Pod Autoscaler) for backend/frontend
- Set up PodDisruptionBudgets for high availability

## High Availability & Scaling (Future)

**Documented in README for future implementation:**
- PostgreSQL: StatefulSet with replication (primary/replica)
- Backend: Increase replicas, add HPA
- Frontend: Increase replicas, add HPA
- Ingress with load balancing across frontend replicas
- Persistent volume replication strategies

## Monitoring & Observability (Future)

**Documented in README:**
- Prometheus for metrics collection
- Grafana for visualization
- Loki for log aggregation
- Jaeger/Tempo for distributed tracing
- Service mesh considerations (Istio/Linkerd)

## Security Considerations

**Current Implementation:**
- Secrets for sensitive data (base64 encoded)
- Non-root user in containers (already in Dockerfiles)
- ClusterIP services for internal communication

**Future Enhancements (documented in README):**
- NetworkPolicies to restrict pod communication
- PodSecurityPolicies/PodSecurityStandards
- External secrets management (sealed-secrets, external-secrets-operator)
- RBAC for service accounts
- TLS for backend/frontend communication
- Database connection pooling (PgBouncer)

## Labels & Selectors

All resources use consistent labeling:
```yaml
labels:
  app: unidash
  component: postgres|backend|frontend
  managed-by: kubectl
```

This enables:
- Easy resource selection (`kubectl get all -l app=unidash`)
- Future service mesh integration
- Monitoring and observability tools
- GitOps workflows

## Testing Strategy

1. **Local Testing:**
   - Deploy to Kind cluster
   - Verify all pods are running
   - Test frontend access via NodePort
   - Verify backend API endpoints
   - Check database connectivity

2. **Migration Testing:**
   - Verify Prisma migrations run successfully
   - Check for migration failures in initContainer logs
   - Test rollback scenarios

3. **Integration Testing:**
   - End-to-end user flows
   - Frontend → Backend → Database communication
   - Email functionality (if MailHog deployed separately)

## Rollout Strategy

**For Future Updates:**
- Use Deployment rolling updates (default strategy)
- MaxUnavailable: 0 for zero-downtime deployments
- MaxSurge: 1 for controlled rollout
- Health checks (readiness/liveness probes) to be added later
- Rollback capability via `kubectl rollout undo`

## Known Limitations

1. **Single-node Kind cluster:**
   - No high availability
   - hostPath volumes tied to single node

2. **No health checks:**
   - Readiness/liveness probes not defined
   - Pods may receive traffic before fully ready

3. **No resource limits:**
   - Pods can consume unlimited resources
   - Potential for resource starvation

4. **Development secrets:**
   - Using development credentials (postgres/docker)
   - Not suitable for production

5. **No monitoring:**
   - No metrics collection
   - Limited observability

All limitations are acceptable for local development and documented for future production deployment.

## Migration Path to Production

Documented in README:
1. Replace hostPath with cloud provider storage (EBS, Azure Disk, etc.)
2. Add resource limits/requests based on profiling
3. Implement proper secrets management
4. Add Ingress with TLS termination
5. Configure horizontal pod autoscaling
6. Implement monitoring and alerting
7. Set up CI/CD pipeline for automated deployments
8. Configure backup and disaster recovery
9. Implement network policies
10. Add health checks and readiness probes

## References

- Kind documentation: https://kind.sigs.k8s.io/
- Kubernetes documentation: https://kubernetes.io/docs/
- Prisma migrations: https://www.prisma.io/docs/concepts/components/prisma-migrate
- PostgreSQL on Kubernetes: https://www.postgresql.org/docs/current/
