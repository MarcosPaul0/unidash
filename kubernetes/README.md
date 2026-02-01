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

2. **GitHub Container Registry authentication**
   ```bash
   # Create a GitHub Personal Access Token with read:packages and write:packages permissions
   # Then login to GHCR
   echo $GITHUB_TOKEN | docker login ghcr.io -u marcospaul0 --password-stdin
   ```

3. **Build and push Docker images to GHCR**
   ```bash
   # Build and push backend image
   cd backend
   docker build -t ghcr.io/marcospaul0/unidash-api:latest -f Dockerfile .
   docker push ghcr.io/marcospaul0/unidash-api:latest

   # Build and push frontend image
   cd ../frontend
   docker build -t ghcr.io/marcospaul0/unidash-app:latest -f Dockerfile.prod .
   docker push ghcr.io/marcospaul0/unidash-app:latest
   ```

4. **Create image pull secret in Kubernetes** (if images are private)
   ```bash
   kubectl create secret docker-registry ghcr-secret \
     --docker-server=ghcr.io \
     --docker-username=marcospaul0 \
     --docker-password=$GITHUB_TOKEN \
     --docker-email=your-email@example.com
   ```

   If using private images, add to deployment specs:
   ```yaml
   spec:
     imagePullSecrets:
     - name: ghcr-secret
   ```

**Alternative: Local Development with Kind**

For local development without pushing to GHCR:
```bash
# Build images locally with GHCR tags
docker build -t ghcr.io/marcospaul0/unidash-api:latest -f backend/Dockerfile backend/
docker build -t ghcr.io/marcospaul0/unidash-app:latest -f frontend/Dockerfile.prod frontend/

# Load images directly into Kind cluster
kind load docker-image ghcr.io/marcospaul0/unidash-api:latest --name unidash
kind load docker-image ghcr.io/marcospaul0/unidash-app:latest --name unidash
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

- `FRONTEND_BASE_URL`: Your frontend URL
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
- Ensure images are loaded into Kind: `kind load docker-image <image> --name unidash`
- Check image names match in deployment YAML files

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

## Future Enhancements

### Setting up Ingress Controller

For production-like setup with domain-based routing:

#### 1. Install nginx-ingress

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

#### 2. Create Ingress Resource

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

#### 3. Update /etc/hosts

Add to `/etc/hosts`:
```
127.0.0.1 unidash.local
```

#### 4. Access Application

- Frontend: `http://unidash.local`
- Backend API: `http://unidash.local/api`

#### 5. Enable TLS/SSL with cert-manager

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

### Storage Options for Production

#### 1. NFS Persistent Volumes

```yaml
apiVersion: v1
kind: PersistentVolume
metadata:
  name: postgres-pv-nfs
spec:
  capacity:
    storage: 10Gi
  accessModes:
    - ReadWriteMany
  nfs:
    server: nfs-server.example.com
    path: "/exported/path"
```

#### 2. Cloud Provider Storage

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

#### 3. Ceph with Rook

Install Rook operator and use CephBlockPool for PostgreSQL storage.

### High Availability Setup

#### PostgreSQL StatefulSet with Replication

Replace Deployment with StatefulSet:

```yaml
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: postgres
spec:
  serviceName: postgres
  replicas: 3
  selector:
    matchLabels:
      app: postgres
  template:
    # ... pod template
  volumeClaimTemplates:
  - metadata:
      name: postgres-storage
    spec:
      accessModes: [ "ReadWriteOnce" ]
      resources:
        requests:
          storage: 10Gi
```

Use PostgreSQL streaming replication or tools like Patroni for HA.

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

#### Frontend Horizontal Pod Autoscaling

```yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: frontend-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: frontend
  minReplicas: 2
  maxReplicas: 5
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70
```

### Resource Limits and Requests

Add to deployments for production:

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

**Frontend:**
```yaml
livenessProbe:
  httpGet:
    path: /
    port: 3000
  initialDelaySeconds: 30
  periodSeconds: 10
readinessProbe:
  httpGet:
    path: /
    port: 3000
  initialDelaySeconds: 5
  periodSeconds: 5
```

### Monitoring and Observability

#### Prometheus and Grafana

1. Install Prometheus Operator:
   ```bash
   kubectl apply -f https://raw.githubusercontent.com/prometheus-operator/prometheus-operator/main/bundle.yaml
   ```

2. Create ServiceMonitor for backend:
   ```yaml
   apiVersion: monitoring.coreos.com/v1
   kind: ServiceMonitor
   metadata:
     name: backend-metrics
   spec:
     selector:
       matchLabels:
         component: backend
     endpoints:
     - port: http
       path: /metrics
   ```

3. Install Grafana and import dashboards

#### Logging with Loki

1. Install Loki stack:
   ```bash
   helm install loki grafana/loki-stack
   ```

2. Configure log aggregation from all pods

### Security Enhancements

#### Network Policies

Restrict pod-to-pod communication:

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: backend-network-policy
spec:
  podSelector:
    matchLabels:
      component: backend
  policyTypes:
  - Ingress
  - Egress
  ingress:
  - from:
    - podSelector:
        matchLabels:
          component: frontend
    ports:
    - protocol: TCP
      port: 3333
  egress:
  - to:
    - podSelector:
        matchLabels:
          component: postgres
    ports:
    - protocol: TCP
      port: 5432
```

#### External Secrets Management

Use External Secrets Operator with AWS Secrets Manager, Azure Key Vault, or HashiCorp Vault:

```yaml
apiVersion: external-secrets.io/v1beta1
kind: SecretStore
metadata:
  name: aws-secrets
spec:
  provider:
    aws:
      service: SecretsManager
      region: us-east-1
---
apiVersion: external-secrets.io/v1beta1
kind: ExternalSecret
metadata:
  name: backend-secret
spec:
  secretStoreRef:
    name: aws-secrets
  target:
    name: backend-secret
  data:
  - secretKey: JWT_PRIVATE_KEY
    remoteRef:
      key: unidash/jwt-private-key
```

### CI/CD Integration

Example GitHub Actions workflow:

```yaml
name: Deploy to Kubernetes
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2

    - name: Build images
      run: |
        docker build -t unidash-api:${{ github.sha }} backend/
        docker build -t unidash-app:${{ github.sha }} frontend/

    - name: Push to registry
      run: |
        # Push to your container registry

    - name: Update K8s manifests
      run: |
        sed -i 's|unidash-api:latest|unidash-api:${{ github.sha }}|g' kubernetes/backend/backend-deployment.yaml
        sed -i 's|unidash-app:latest|unidash-app:${{ github.sha }}|g' kubernetes/frontend/frontend-deployment.yaml

    - name: Deploy to K8s
      run: |
        kubectl apply -f kubernetes/
```

## Additional Resources

- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Kind Documentation](https://kind.sigs.k8s.io/)
- [NestJS Documentation](https://docs.nestjs.com/)
- [Next.js Documentation](https://nextjs.org/docs)
- [PostgreSQL on Kubernetes](https://www.postgresql.org/docs/current/)
- [Prisma Migrations](https://www.prisma.io/docs/concepts/components/prisma-migrate)
