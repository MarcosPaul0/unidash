# Unidash Kubernetes Deployment

This directory contains Kubernetes manifests for deploying Unidash to a Kind cluster (or any Kubernetes cluster).

## Architecture

```
┌─────────────────┐
│   Frontend      │
│  (Next.js)      │
│  NodePort:30080 │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│    Backend      │
│   (NestJS)      │
│  ClusterIP:3333 │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   PostgreSQL    │
│  ClusterIP:5432 │
│  + Persistent   │
│    Storage      │
└─────────────────┘
```

## Directory Structure

```
kubernetes/
├── postgres/           # PostgreSQL database
│   ├── postgres-pv.yaml
│   ├── postgres-pvc.yaml
│   ├── postgres-secret.yaml
│   ├── postgres-deployment.yaml
│   └── postgres-service.yaml
├── backend/            # NestJS API
│   ├── backend-configmap.yaml
│   ├── backend-secret.yaml
│   ├── backend-deployment.yaml
│   └── backend-service.yaml
└── frontend/           # Next.js application
    ├── frontend-configmap.yaml
    ├── frontend-deployment.yaml
    └── frontend-service.yaml
```

## Prerequisites

1. **Kind cluster running**
   ```bash
   kind create cluster --name unidash
   ```

2. **Images from GitHub Container Registry**

   The manifests use these images built by GitHub Actions:
   - `ghcr.io/marcospaul0/unidash-backend:latest`
   - `ghcr.io/marcospaul0/unidash-frontend:latest`
   - `docker.io/postgres:16`

3. **GitHub Container Registry authentication** (if images are private)
   ```bash
   # Create a GitHub Personal Access Token with read:packages permission
   echo $GITHUB_TOKEN | docker login ghcr.io -u marcospaul0 --password-stdin
   ```

4. **Create image pull secret in Kubernetes** (if images are private)
   ```bash
   kubectl create secret docker-registry ghcr-secret \
     --docker-server=ghcr.io \
     --docker-username=marcospaul0 \
     --docker-password=$GITHUB_TOKEN \
     --docker-email=your-email@example.com
   ```

   Then add to deployment specs:
   ```yaml
   spec:
     imagePullSecrets:
     - name: ghcr-secret
   ```

## Configuration

### 1. Update Backend Secrets

Edit `backend/backend-secret.yaml` and replace the following:

- **JWT Keys**: Generate your own RSA key pair
  ```bash
  # Generate private key
  openssl genrsa -out private.pem 2048

  # Generate public key
  openssl rsa -in private.pem -pubout -out public.pem

  # View keys (copy content to backend-secret.yaml)
  cat private.pem
  cat public.pem
  ```

- **SMTP Credentials**: Update `SMTP_USER` and `SMTP_PASS` with actual values

### 2. Update Backend ConfigMap

Edit `backend/backend-configmap.yaml` and update:

- `FRONTEND_BASE_URL`: Your frontend URL (e.g., `http://localhost:30080`)
- `ACCOUNT_ACTIVATION_URL`: Activation page URL
- `PASSWORD_RESET_URL`: Password reset page URL
- `INCOMING_STUDENT_URL`: Incoming students page URL
- `SMTP_HOST` and `SMTP_PORT`: Your SMTP server details

### 3. Update Frontend ConfigMap

Edit `frontend/frontend-configmap.yaml`:

- `NEXT_PUBLIC_API_URL`: Should point to `http://backend-service:3333` (for internal cluster communication)

**Note:** For browser-based API calls from the frontend, you may need to expose the backend via Ingress or configure CORS properly.

## Deployment

Deploy in the following order:

### 1. Deploy PostgreSQL

```bash
kubectl apply -f postgres/postgres-secret.yaml
kubectl apply -f postgres/postgres-pv.yaml
kubectl apply -f postgres/postgres-pvc.yaml
kubectl apply -f postgres/postgres-deployment.yaml
kubectl apply -f postgres/postgres-service.yaml
```

Wait for PostgreSQL to be ready:
```bash
kubectl wait --for=condition=ready pod -l component=postgres --timeout=60s
```

### 2. Deploy Backend

```bash
kubectl apply -f backend/backend-configmap.yaml
kubectl apply -f backend/backend-secret.yaml
kubectl apply -f backend/backend-deployment.yaml
kubectl apply -f backend/backend-service.yaml
```

Check init containers completed successfully:
```bash
kubectl logs -l component=backend -c wait-for-postgres
kubectl logs -l component=backend -c run-migrations
```

Wait for backend to be ready:
```bash
kubectl wait --for=condition=ready pod -l component=backend --timeout=120s
```

### 3. Deploy Frontend

```bash
kubectl apply -f frontend/frontend-configmap.yaml
kubectl apply -f frontend/frontend-deployment.yaml
kubectl apply -f frontend/frontend-service.yaml
```

Wait for frontend to be ready:
```bash
kubectl wait --for=condition=ready pod -l component=frontend --timeout=60s
```

## Quick Deploy All

Deploy everything at once:

```bash
# Apply all manifests
kubectl apply -f postgres/
kubectl apply -f backend/
kubectl apply -f frontend/

# Watch deployment progress
kubectl get pods -w
```

## Accessing the Application

### Frontend (NodePort)

The frontend is accessible at:
```
http://localhost:30080
```

### Backend API (for testing)

Port-forward to access the backend directly:
```bash
kubectl port-forward service/backend-service 3333:3333
```

Then access at: `http://localhost:3333`

### PostgreSQL (for debugging)

Port-forward to access the database:
```bash
kubectl port-forward service/postgres-service 5432:5432
```

Connect with:
```bash
psql postgresql://postgres:docker@localhost:5432/unidash
```

## Troubleshooting

### Check Pod Status
```bash
kubectl get pods
kubectl describe pod <pod-name>
```

### View Logs
```bash
# Backend logs
kubectl logs -l component=backend

# Frontend logs
kubectl logs -l component=frontend

# PostgreSQL logs
kubectl logs -l component=postgres

# Init container logs
kubectl logs <pod-name> -c wait-for-postgres
kubectl logs <pod-name> -c run-migrations
```

### Check Services
```bash
kubectl get services
kubectl describe service backend-service
```

### Verify ConfigMaps and Secrets
```bash
kubectl get configmaps
kubectl get secrets
kubectl describe configmap backend-config
```

### Common Issues

**1. Backend pod stuck in Init state**
- Check PostgreSQL is running: `kubectl get pods -l component=postgres`
- View init container logs: `kubectl logs <backend-pod> -c wait-for-postgres`

**2. Migration failures**
- Check database connection: `kubectl logs <backend-pod> -c run-migrations`
- Verify DB_URL in backend-secret.yaml

**3. Frontend can't reach backend**
- Verify backend service is running: `kubectl get service backend-service`
- Check NEXT_PUBLIC_API_URL in frontend-configmap.yaml
- For browser requests, backend needs to be accessible from the client (see Ingress section)

**4. Image pull errors**
- Ensure you're authenticated to GHCR: `docker login ghcr.io`
- Check image names match GitHub Actions output
- Verify imagePullSecrets if using private images

**5. ImagePullBackOff**
- Verify images exist: `docker pull ghcr.io/marcospaul0/unidash-backend:latest`
- Check image pull secret is configured correctly

## Cleanup

### Delete all resources
```bash
kubectl delete -f frontend/
kubectl delete -f backend/
kubectl delete -f postgres/
```

### Delete persistent data
```bash
# This will delete the database data permanently
kubectl delete pvc postgres-pvc
kubectl delete pv postgres-pv
```

## GitHub Actions Integration

The manifests are configured to use images built by GitHub Actions:

- **Backend**: `ghcr.io/marcospaul0/unidash-backend:latest`
- **Frontend**: `ghcr.io/marcospaul0/unidash-frontend:latest`

When your GitHub Actions workflow runs, it automatically builds and pushes these images to GHCR. After a successful build:

1. Pull the latest images (or Kubernetes will pull automatically)
2. Restart deployments to use new images:
   ```bash
   kubectl rollout restart deployment/backend
   kubectl rollout restart deployment/frontend
   ```

## Setting up Ingress Controller

For production-like setup with domain-based routing:

### 1. Install nginx-ingress

```bash
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/main/deploy/static/provider/kind/deploy.yaml
```

Wait for ingress controller to be ready:
```bash
kubectl wait --namespace ingress-nginx \
  --for=condition=ready pod \
  --selector=app.kubernetes.io/component=controller \
  --timeout=90s
```

### 2. Create Ingress Resource

Create `ingress.yaml`:

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: unidash-ingress
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /
spec:
  ingressClassName: nginx
  rules:
  - host: unidash.local
    http:
      paths:
      # Frontend
      - path: /
        pathType: Prefix
        backend:
          service:
            name: frontend-service
            port:
              number: 3000
      # Backend API
      - path: /api
        pathType: Prefix
        backend:
          service:
            name: backend-service
            port:
              number: 3333
```

Apply:
```bash
kubectl apply -f ingress.yaml
```

### 3. Update /etc/hosts

Add to `/etc/hosts`:
```
127.0.0.1 unidash.local
```

### 4. Access Application

- Frontend: `http://unidash.local`
- Backend API: `http://unidash.local/api`

### 5. Enable TLS/SSL with cert-manager

Install cert-manager:
```bash
kubectl apply -f https://github.com/cert-manager/cert-manager/releases/download/v1.13.0/cert-manager.yaml
```

Create ClusterIssuer for Let's Encrypt:
```yaml
apiVersion: cert-manager.io/v1
kind: ClusterIssuer
metadata:
  name: letsencrypt-prod
spec:
  acme:
    server: https://acme-v02.api.letsencrypt.org/directory
    email: your-email@example.com
    privateKeySecretRef:
      name: letsencrypt-prod
    solvers:
    - http01:
        ingress:
          class: nginx
```

Update Ingress with TLS:
```yaml
spec:
  tls:
  - hosts:
    - unidash.yourdomain.com
    secretName: unidash-tls
  rules:
  - host: unidash.yourdomain.com
    # ... rest of configuration
```

## Future Production Enhancements

### Storage Options

#### Cloud Provider Storage

**AWS EBS:**
```yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: postgres-pvc
spec:
  accessModes:
    - ReadWriteOnce
  storageClassName: gp3
  resources:
    requests:
      storage: 20Gi
```

**GCP Persistent Disk:**
```yaml
spec:
  storageClassName: pd-ssd
```

**Azure Disk:**
```yaml
spec:
  storageClassName: managed-premium
```

### High Availability

#### Backend Horizontal Pod Autoscaling

```yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: backend-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: backend
  minReplicas: 2
  maxReplicas: 10
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70
```

### Resource Limits

Add to deployments:

```yaml
spec:
  containers:
  - name: backend
    resources:
      requests:
        memory: "512Mi"
        cpu: "250m"
      limits:
        memory: "1Gi"
        cpu: "500m"
```

Recommended values:
- **PostgreSQL:** 512Mi-2Gi memory, 250m-1000m CPU
- **Backend:** 512Mi-1Gi memory, 250m-500m CPU
- **Frontend:** 256Mi-512Mi memory, 100m-250m CPU

### Health Checks

Add liveness and readiness probes:

**Backend:**
```yaml
livenessProbe:
  httpGet:
    path: /health
    port: 3333
  initialDelaySeconds: 30
  periodSeconds: 10
readinessProbe:
  httpGet:
    path: /health
    port: 3333
  initialDelaySeconds: 5
  periodSeconds: 5
```

## Additional Resources

- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Kind Documentation](https://kind.sigs.k8s.io/)
- [GitHub Container Registry Documentation](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-container-registry)
- [NestJS Documentation](https://docs.nestjs.com/)
- [Next.js Documentation](https://nextjs.org/docs)
- [PostgreSQL on Kubernetes](https://www.postgresql.org/docs/current/)
