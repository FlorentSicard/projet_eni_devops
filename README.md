# 📝 TodoList - Application de Gestion de Tâches Moderne

Une application de gestion de tâches complète construite avec des technologies web modernes et déployée en utilisant les meilleures pratiques DevOps. Ce projet démontre une application full-stack avec un pipeline CI/CD automatisé et un déploiement cloud sur Azure Kubernetes Service (AKS).

## 🎯 Vue d'ensemble du Projet

Cette **application TodoList** permet aux utilisateurs de gérer efficacement leurs tâches quotidiennes avec une interface moderne et intuitive. L'application suit une architecture 3-tiers complète avec :

- ✅ **Création, modification et suppression de tâches**
- 🔄 **Gestion des statuts** : "à faire", "en cours", "terminée"
- 📱 **Interface responsive** compatible mobile et desktop
- 🚀 **Déploiement automatisé** sur Kubernetes
- 🔧 **Infrastructure as Code** avec Terraform
- 📊 **Monitoring** avec Prometheus et Grafana

## 🏗️ Architecture Technique

L'application suit une **architecture microservices moderne** :

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │    Backend      │    │  Base de données│
│   Angular 15    │◄──►│   Node.js       │◄──►│    MySQL 8      │
│   + Material UI │    │   + Express     │    │   + Sequelize   │
│   Port: 80      │    │   Port: 3000    │    │   Port: 3306    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 │
                    ┌─────────────────┐
                    │   Kubernetes    │
                    │   Azure AKS     │
                    │   + Ingress     │
                    └─────────────────┘
```

### 🎨 Frontend (Angular 15)
- **Framework** : Angular 15 avec TypeScript
- **UI Library** : Angular Material Design
- **Fonctionnalités** :
  - Interface utilisateur moderne et responsive
  - Gestion des formulaires réactifs
  - Communication HTTP avec le backend via des services
  - Routage SPA (Single Page Application)
  - Tests unitaires avec Jasmine/Karma

### ⚙️ Backend (Node.js + Express)
- **Runtime** : Node.js 18
- **Framework** : Express.js
- **ORM** : Sequelize pour MySQL
- **Fonctionnalités** :
  - API RESTful complète (CRUD)
  - Documentation API avec Swagger UI
  - Gestion des erreurs et validation
  - Configuration par variables d'environnement
  - Tests unitaires avec Jest

### 🗄️ Base de données (MySQL 8)
- **SGBD** : MySQL 8.0
- **Schéma** : Table `tasks` avec colonnes :
  - `id` : Clé primaire auto-incrémentée
  - `nom` : Nom de la tâche (obligatoire)
  - `description` : Description détaillée (optionnel)
  - `statut` : ENUM('à faire', 'en cours', 'terminée')
  - `createdAt`, `updatedAt` : Timestamps automatiques

## 🚀 Guide de Démarrage Rapide

### Prérequis
- [Node.js 18+](https://nodejs.org/)
- [Docker](https://www.docker.com/) et Docker Compose
- [kubectl](https://kubernetes.io/docs/tasks/tools/) (pour le déploiement K8s)
- [Terraform](https://www.terraform.io/) (pour l'infrastructure)

### Option 1 : Démarrage avec Docker Compose (Recommandé pour le développement)

```bash
# Cloner le repository
git clone <votre-repo-url>
cd projet_eni_devops

# Lancer l'application complète
docker-compose up -d

# Vérifier que les services sont démarrés
docker-compose ps
```

**Accès aux services :**
- Frontend : http://localhost
- Backend API : http://localhost:3000
- Documentation API : http://localhost:3000/api/docs

### Accès à l'Application via Kubernetes Ingress

Lorsque l'application est déployée sur Kubernetes, l'Ingress Controller crée une adresse IP statique pour accéder à l'application. Voici comment obtenir cette IP et accéder à l'application :

#### Récupérer l'IP de l'Ingress Controller

```bash
# Obtenir l'adresse IP externe de l'Ingress Controller
kubectl get ingress app-ingress -n projet-eni

# Ou pour obtenir uniquement l'IP
kubectl get ingress app-ingress -n projet-eni -o jsonpath='{.status.loadBalancer.ingress[0].ip}'

# Alternative : vérifier le service de l'Ingress Controller
kubectl get svc -n ingress-nginx
```

#### Accéder à l'Application

Une fois l'IP récupérée, vous pouvez accéder à l'application dans votre navigateur :

```bash
# Exemple si l'IP est 20.123.45.67
# Frontend : http://20.123.45.67
# Backend API : http://20.123.45.67/api/tasks
# Documentation API : http://20.123.45.67/api/docs
```

**Note importante :** Remplacez `20.123.45.67` par l'IP réelle obtenue avec la commande `kubectl get ingress`.

### Option 2 : Développement Local

#### Backend
```bash
cd backend

# Installation des dépendances
npm install

# Configuration de l'environnement
cp .env.example .env
# Éditer .env avec vos paramètres de base de données

# Démarrage en mode développement
npm run dev

# Tests
npm test
```

#### Frontend
```bash
cd frontend

# Installation des dépendances
npm install

# Démarrage du serveur de développement
ng serve

# Tests
ng test --watch=false --browsers=ChromeHeadless
```

#### Base de données MySQL
```bash
# Avec Docker
docker run --name mysql-todolist \
  -e MYSQL_ROOT_PASSWORD=rootpassword \
  -e MYSQL_DATABASE=todolist_db \
  -e MYSQL_USER=todouser \
  -e MYSQL_PASSWORD=todopassword \
  -p 3306:3306 \
  -d mysql:8.0

# Initialisation du schéma
mysql -h localhost -u todouser -p todolist_db < backend/scriptSQL.sql
```

## 📱 Guide d'Utilisation

### Interface Utilisateur

#### Créer une Nouvelle Tâche
1. Cliquer sur le bouton **"Ajouter une tâche"** ou **"+"**
2. Remplir le formulaire :
   - **Nom** : Titre de la tâche (obligatoire)
   - **Description** : Détails supplémentaires (optionnel)
3. Cliquer sur **"Enregistrer"**

#### Gérer les Tâches Existantes
- **Voir toutes les tâches** : Affichage en liste avec statut coloré
- **Modifier une tâche** : Cliquer sur l'icône ✏️ pour éditer
- **Changer le statut** : Utiliser le menu déroulant :
  - 🔵 **À faire** : Nouvelles tâches
  - 🟡 **En cours** : Tâches en progression
  - 🟢 **Terminée** : Tâches complétées
- **Supprimer une tâche** : Cliquer sur l'icône 🗑️

### API REST

L'API backend expose les endpoints suivants :

```http
GET    /api/tasks          # Récupérer toutes les tâches
POST   /api/tasks          # Créer une nouvelle tâche
GET    /api/tasks/:id      # Récupérer une tâche par ID
PUT    /api/tasks/:id      # Mettre à jour une tâche
DELETE /api/tasks/:id      # Supprimer une tâche
```

**Exemple de requête :**
```bash
# Créer une tâche
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "nom": "Apprendre Kubernetes",
    "description": "Étudier les concepts de base de K8s",
    "statut": "à faire"
  }'

# Récupérer toutes les tâches
curl http://localhost:3000/api/tasks
```

## 🛠️ Stack Technologique Complète

| Composant | Technologie | Version | Rôle |
|-----------|-------------|---------|------|
| **Frontend** | Angular | 15.x | Interface utilisateur |
| **UI Framework** | Angular Material | 15.x | Composants UI |
| **Backend** | Node.js | 18.x | Serveur API |
| **Framework Web** | Express.js | 5.x | Routage et middleware |
| **ORM** | Sequelize | 6.x | Mapping objet-relationnel |
| **Base de données** | MySQL | 8.0 | Persistance des données |
| **Conteneurisation** | Docker | Latest | Packaging d'application |
| **Orchestration** | Kubernetes | 1.28+ | Gestion des conteneurs |
| **Cloud Provider** | Microsoft Azure | - | Infrastructure cloud |
| **Cluster K8s** | Azure AKS | Latest | Service Kubernetes managé |
| **CI/CD** | GitHub Actions | - | Pipeline automatisé |
| **IaC** | Terraform | 1.5+ | Infrastructure as Code |
| **Monitoring** | Prometheus + Grafana | Latest | Surveillance et métriques |
| **Reverse Proxy** | Nginx | Alpine | Serveur web frontend |
| **Documentation API** | Swagger UI | 5.x | Documentation interactive |

## 🏗️ Structure du Projet

```
projet_eni_devops/
├── 📁 backend/                    # API Node.js + Express
│   ├── 📁 src/
│   │   ├── 📁 config/            # Configuration base de données
│   │   ├── 📁 controllers/       # Contrôleurs API
│   │   ├── 📁 models/            # Modèles Sequelize
│   │   ├── 📁 routes/            # Routes Express
│   │   ├── 📁 services/          # Services métier
│   │   ├── 📁 docs/              # Documentation Swagger
│   │   ├── app.js                # Configuration Express
│   │   └── server.js             # Point d'entrée serveur
│   ├── 📁 tests/                 # Tests unitaires Jest
│   ├── Dockerfile                # Image Docker backend
│   ├── package.json              # Dépendances Node.js
│   ├── scriptSQL.sql             # Script d'initialisation DB
│   └── .env                      # Variables d'environnement
├── 📁 frontend/                   # Application Angular
│   ├── 📁 src/
│   │   ├── 📁 app/
│   │   │   ├── 📁 components/    # Composants Angular
│   │   │   ├── 📁 services/      # Services HTTP
│   │   │   ├── 📁 models/        # Interfaces TypeScript
│   │   │   └── app.module.ts     # Module principal
│   │   ├── 📁 assets/            # Ressources statiques
│   │   └── index.html            # Page principale
│   ├── Dockerfile                # Image Docker frontend
│   ├── nginx-proxy.conf          # Configuration Nginx
│   ├── package.json              # Dépendances Angular
│   └── angular.json              # Configuration Angular CLI
├── 📁 k8s/                       # Manifestes Kubernetes
│   ├── namespace.yaml            # Namespace projet-eni
│   ├── mysql-secret.yaml         # Secrets MySQL
│   ├── mysql-pv.yaml             # Volume persistant
│   ├── mysql.yaml                # Déploiement MySQL
│   ├── backend.yaml              # Déploiement backend
│   ├── frontend.yaml             # Déploiement frontend
│   ├── app-ingress.yaml          # Ingress controller
│   ├── ingress-controller.yaml   # Configuration Nginx Ingress
│   ├── docker-registry.yaml      # Registry Docker Hub
│   └── github-actions.yaml       # ServiceAccount CI/CD
├── 📁 iac/                       # Infrastructure Terraform
│   ├── provider.tf               # Providers Azure
│   ├── variables.tf              # Variables Terraform
│   ├── locals.tf                 # Variables locales
│   ├── aks.tf                    # Cluster AKS
│   └── terraform.tfvars          # Valeurs des variables
├── 📁 .github/workflows/         # Pipeline CI/CD
│   └── ci-cd.yml                 # GitHub Actions
├── docker-compose.yml            # Orchestration locale
├── .gitignore                    # Fichiers ignorés Git
└── README.md                     # Documentation projet
```

## 🐳 Conteneurisation avec Docker

### Images Docker

Le projet utilise une approche multi-stage pour optimiser les images :

#### Backend (Node.js)
```dockerfile
# Build stage - Installation des dépendances
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install

# Production stage - Image finale optimisée
FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY package.json ./
COPY src ./src

# Sécurité : utilisateur non-root
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001
RUN chown -R nodejs:nodejs /app
USER nodejs

EXPOSE 3000
CMD ["npm", "start"]
```

#### Frontend (Angular + Nginx)
```dockerfile
# Stage 1: Build Angular
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine
COPY --from=build /app/dist/frontend /usr/share/nginx/html
COPY nginx-proxy.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Configuration Docker Compose

Le fichier `docker-compose.yml` orchestre les trois services :

```yaml
services:
  mysql:
    image: mysql:8.0
    environment:
      MYSQL_ROOT_PASSWORD: rootpassword
      MYSQL_DATABASE: todolist_db
      MYSQL_USER: todouser
      MYSQL_PASSWORD: todopassword
    ports:
      - "3306:3306"
    volumes:
      - mysql_data:/var/lib/mysql
      - ./backend/scriptSQL.sql:/docker-entrypoint-initdb.d/init.sql

  backend:
    build: ./backend
    ports:
      - "3000:3000"
    environment:
      - DB_HOST=mysql
      - DB_USER=todouser
      - DB_PASSWORD=todopassword
      - DB_NAME=todolist_db
    depends_on:
      - mysql

  frontend:
    build: ./frontend
    ports:
      - "80:80"
    depends_on:
      - backend
```

## ☸️ Déploiement Kubernetes

### Architecture Kubernetes

L'application est déployée sur Azure Kubernetes Service (AKS) avec :

- **Namespace** : `projet-eni` pour l'isolation
- **Deployments** : Backend, Frontend, MySQL
- **Services** : Exposition interne des pods
- **Ingress** : Point d'entrée externe avec Nginx
- **Secrets** : Gestion sécurisée des mots de passe
- **PersistentVolume** : Stockage persistant pour MySQL

### Manifestes Kubernetes

#### Namespace
```yaml
apiVersion: v1
kind: Namespace
metadata:
  name: projet-eni
```

#### MySQL Deployment
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: mysql-deployment
  namespace: projet-eni
spec:
  replicas: 1
  selector:
    matchLabels:
      app: mysql
  template:
    metadata:
      labels:
        app: mysql
    spec:
      containers:
      - name: mysql
        image: mysql:8.0
        env:
        - name: MYSQL_ROOT_PASSWORD
          valueFrom:
            secretKeyRef:
              name: mysql-secret
              key: root-password
        ports:
        - containerPort: 3306
        volumeMounts:
        - name: mysql-storage
          mountPath: /var/lib/mysql
```

#### Backend Deployment
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: backend-deployment
  namespace: projet-eni
spec:
  replicas: 2
  selector:
    matchLabels:
      app: backend
  template:
    metadata:
      labels:
        app: backend
    spec:
      containers:
      - name: backend
        image: <your_registry>>:backend-latest
        ports:
        - containerPort: 3000
        env:
        - name: DB_HOST
          value: "mysql-service"
        - name: DB_USER
          value: "todouser"
        - name: DB_PASSWORD
          valueFrom:
            secretKeyRef:
              name: mysql-secret
              key: user-password
```

#### Ingress Configuration
```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: app-ingress
  namespace: projet-eni
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /
spec:
  ingressClassName: nginx
  rules:
  - host: todolist.local
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: frontend-service
            port:
              number: 80
      - path: /api
        pathType: Prefix
        backend:
          service:
            name: backend-service
            port:
              number: 3000
```

### Commandes de Déploiement

```bash
# Créer le namespace
kubectl apply -f k8s/namespace.yaml

# Déployer les secrets
kubectl apply -f k8s/mysql-secret.yaml

# Déployer MySQL avec volume persistant
kubectl apply -f k8s/mysql-pv.yaml
kubectl apply -f k8s/mysql.yaml

# Déployer le backend
kubectl apply -f k8s/backend.yaml

# Déployer le frontend
kubectl apply -f k8s/frontend.yaml

# Configurer l'ingress
kubectl apply -f k8s/ingress-controller.yaml
kubectl apply -f k8s/app-ingress.yaml

# Vérifier le déploiement
kubectl get pods -n projet-eni
kubectl get services -n projet-eni
kubectl get ingress -n projet-eni
```
## 🏗️ Infrastructure as Code (Terraform)

### Configuration Azure AKS

Le cluster Kubernetes est provisionné automatiquement sur Azure avec Terraform :

```hcl
# AKS Cluster avec réseau par défaut (kubenet)
resource "azurerm_kubernetes_cluster" "main" {
  name                = var.cluster_name
  location            = data.azurerm_resource_group.main.location
  resource_group_name = data.azurerm_resource_group.main.name
  dns_prefix          = var.dns_prefix
  kubernetes_version  = var.kubernetes_version

  # Pool de nœuds par défaut
  default_node_pool {
    name                = "default"
    vm_size             = var.node_vm_size
    min_count           = 1
    max_count           = 5
    os_disk_size_gb     = 30
    enable_auto_scaling = true
  }

  # Configuration d'identité
  identity {
    type = "SystemAssigned"
  }

  # Configuration réseau par défaut (kubenet)
  network_profile {
    network_plugin    = "kubenet"
    load_balancer_sku = "standard"
  }
}
```

### Déploiement de l'Infrastructure

```bash
# Initialiser Terraform
cd iac
terraform init

# Planifier le déploiement
terraform plan

# Appliquer la configuration
terraform apply

# Récupérer les credentials du cluster
az aks get-credentials --resource-group <resource-group> --name <cluster-name>
```

## 🔄 Pipeline CI/CD avec GitHub Actions

### Workflow Automatisé

Le pipeline CI/CD automatise :

1. **Tests** : Exécution des tests unitaires (backend et frontend)
2. **Build** : Construction des images Docker
3. **Push** : Publication sur Docker Hub
4. **Deploy** : Déploiement automatique sur AKS

```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    name: Run Tests
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4
    - uses: actions/setup-node@v4
      with:
        node-version: '18'
    
    # Tests backend
    - name: Test backend
      run: |
        cd backend
        npm install
        npm run test
    
    # Tests frontend
    - name: Test frontend
      run: |
        cd frontend
        npm install
        npm run test -- --watch=false --browsers=ChromeHeadless

  build-and-push:
    name: Build & Push Images
    runs-on: ubuntu-latest
    needs: test
    if: github.ref == 'refs/heads/main'
    steps:
    - uses: actions/checkout@v4
    - name: Login to Docker Hub
      uses: docker/login-action@v3
      with:
        username: ${{ secrets.DOCKER_USERNAME }}
        password: ${{ secrets.DOCKER_PASSWORD }}
    
    - name: Build and push images
      run: |
        # Backend
        docker build -t <your_registry>>:backend-${{ github.sha }} ./backend
        docker push <your_registry>>:backend-${{ github.sha }}
        
        # Frontend
        docker build -t <your_registry>>:frontend-${{ github.sha }} ./frontend
        docker push <your_registry>>:frontend-${{ github.sha }}

  deploy:
    name: Deploy to AKS
    needs: [ test, build-and-push ]
    runs-on: ubuntu-latest
    steps:
    - name: Deploy to Kubernetes
      run: |
        kubectl set image deployment/backend-deployment backend=<your_registry>>:backend-${{ github.sha }} -n projet-eni
        kubectl set image deployment/frontend-deployment frontend=<your_registry>>:frontend-${{ github.sha }} -n projet-eni
```

### Configuration des Secrets GitHub

Pour que le pipeline fonctionne, configurez ces secrets dans votre repository GitHub :

- `DOCKER_USERNAME` : Nom d'utilisateur Docker Hub
- `DOCKER_PASSWORD` : Token d'accès Docker Hub
- `KUBE_CONFIG` : Configuration kubectl encodée en base64

## 🔧 Configuration et Variables d'Environnement

### Backend (.env)
```bash
# Base de données
DB_HOST=localhost
DB_USER=todouser
DB_PASSWORD=todopassword
DB_NAME=todolist_db
DB_DIALECT=mysql

# Serveur
PORT=3000
NODE_ENV=development
```

### Frontend (environment.ts)
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api'
};
```

### Kubernetes Secrets
```bash
# Créer les secrets MySQL
kubectl create secret generic mysql-secret \
  --from-literal=root-password=rootpassword \
  --from-literal=user-password=todopassword \
  -n projet-eni
```

## 🧪 Tests et Qualité

### Tests Backend (Jest)
```bash
cd backend
npm test

# Tests avec couverture
npm test -- --coverage

# Tests en mode watch
npm test -- --watch
```

### Tests Frontend (Jasmine/Karma)
```bash
cd frontend
ng test

# Tests en mode headless
ng test --watch=false --browsers=ChromeHeadless

# Tests avec couverture
ng test --code-coverage
```

### Linting et Formatage
```bash
# Backend
cd backend
npm run lint

# Frontend
cd frontend
ng lint
```

## 📊 Monitoring et Observabilité

### Stack de Monitoring avec kube-prometheus-stack

Le cluster AKS est équipé d'une solution de monitoring complète basée sur **kube-prometheus-stack** installée via Helm. Cette stack inclut :

- **Prometheus** : Collecte des métriques du cluster et des applications
- **Grafana** : Visualisation des métriques avec des dashboards préconfigurés
- **AlertManager** : Gestion des alertes
- **Node Exporter** : Métriques des nœuds
- **kube-state-metrics** : Métriques des objets Kubernetes

#### Installation de kube-prometheus-stack

```bash
# Ajouter le repository Helm de Prometheus Community
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo update

# Installer kube-prometheus-stack
helm install kube-prometheus-stack prometheus-community/kube-prometheus-stack \
  --namespace monitoring \
  --create-namespace \
  --set prometheus.prometheusSpec.serviceMonitorSelectorNilUsesHelmValues=false \
  --set prometheus.prometheusSpec.podMonitorSelectorNilUsesHelmValues=false
```

#### Accès à Grafana

```bash
# Port-forward pour accéder à Grafana
kubectl port-forward -n monitoring svc/kube-prometheus-stack-grafana 3000:80

# Accès via navigateur
# URL: http://localhost:3000
# Username: admin
# Password: prom-operator (par défaut)
```

#### Dashboards Préconfigurés

Plusieurs dashboards sont automatiquement créés et connectés au cluster :

1. **Kubernetes / Compute Resources / Cluster** : Vue d'ensemble des ressources du cluster
2. **Kubernetes / Compute Resources / Namespace (Pods)** : Métriques par namespace
3. **Kubernetes / Compute Resources / Node (Pods)** : Métriques par nœud
4. **Node Exporter / Nodes** : Métriques détaillées des nœuds
5. **Kubernetes / API Server** : Performances de l'API Kubernetes
6. **Kubernetes / Networking / Cluster** : Métriques réseau du cluster

#### Dashboards Personnalisés pour l'Application

Des dashboards spécifiques à l'application TodoList sont également disponibles :

- **TodoList Application Overview** : Métriques générales de l'application
- **MySQL Database Metrics** : Performances de la base de données
- **Nginx Ingress Metrics** : Métriques du reverse proxy

#### Métriques Personnalisées

```bash
# Vérifier les ServiceMonitors créés
kubectl get servicemonitor -n monitoring

# Vérifier les targets Prometheus
kubectl port-forward -n monitoring svc/kube-prometheus-stack-prometheus 9090:9090
# Accès: http://localhost:9090/targets
```

### Métriques Kubernetes Natives

```bash
# Vérifier l'état des pods
kubectl get pods -n projet-eni

# Logs des applications
kubectl logs -f deployment/backend-deployment -n projet-eni
kubectl logs -f deployment/frontend-deployment -n projet-eni

# Métriques des ressources
kubectl top pods -n projet-eni
kubectl top nodes
```

### Health Checks

```bash
# Vérifier la santé du backend
curl http://localhost:3000/api/tasks

# Vérifier le frontend
curl http://localhost/

# Vérifier la base de données
kubectl exec -it deployment/mysql-deployment -n projet-eni -- mysql -u todouser -p -e "SELECT 1"

# Vérifier les services de monitoring
kubectl get pods -n monitoring
kubectl get svc -n monitoring
```

### Alertes et Notifications

Le système d'alertes est configuré pour surveiller :

- **Utilisation CPU/Mémoire** des pods et nœuds
- **Disponibilité des services** (backend, frontend, MySQL)
- **Erreurs HTTP** sur l'API
- **Espace disque** des volumes persistants
- **État des déploiements** Kubernetes

```bash
# Accéder à AlertManager
kubectl port-forward -n monitoring svc/kube-prometheus-stack-alertmanager 9093:9093
# URL: http://localhost:9093
```

## 🚨 Dépannage

### Problèmes Courants

#### 1. Erreur de connexion à la base de données
```bash
# Vérifier que MySQL est démarré
kubectl get pods -n projet-eni | grep mysql

# Vérifier les logs MySQL
kubectl logs deployment/mysql-deployment -n projet-eni

# Tester la connexion
kubectl exec -it deployment/mysql-deployment -n projet-eni -- mysql -u root -p
```

#### 2. Images Docker non trouvées
```bash
# Vérifier que les images existent
docker images | grep <your_registry>>

# Reconstruire les images
docker-compose build --no-cache
```

#### 3. Problèmes de réseau Kubernetes
```bash
# Vérifier les services
kubectl get services -n projet-eni

# Tester la connectivité interne
kubectl exec -it deployment/backend-deployment -n projet-eni -- curl mysql-service:3306
```

#### 4. Problèmes d'Ingress
```bash
# Vérifier l'ingress controller
kubectl get pods -n ingress-nginx

# Vérifier la configuration ingress
kubectl describe ingress app-ingress -n projet-eni
```

### Logs et Debugging
```bash
# Logs détaillés du backend
kubectl logs -f deployment/backend-deployment -n projet-eni --tail=100

# Logs du frontend (Nginx)
kubectl logs -f deployment/frontend-deployment -n projet-eni

# Événements du cluster
kubectl get events -n projet-eni --sort-by='.lastTimestamp'
```

## 🔒 Sécurité

### Bonnes Pratiques Implémentées

- **Images Docker** : Utilisation d'utilisateurs non-root
- **Secrets Kubernetes** : Gestion sécurisée des mots de passe
- **Network Policies** : Isolation réseau entre les namespaces
- **RBAC** : Contrôle d'accès basé sur les rôles
- **TLS** : Chiffrement des communications (via Ingress)

### Recommandations Supplémentaires

```bash
# Scanner les vulnérabilités des images
docker scan <your_registry>>:backend-latest

# Audit de sécurité Kubernetes
kubectl auth can-i --list -n projet-eni

# Vérifier les politiques de sécurité des pods
kubectl get psp
```

## 📈 Performance et Optimisation

### Optimisations Implémentées

- **Images multi-stage** : Réduction de la taille des images Docker
- **Mise en cache npm** : Accélération des builds CI/CD
- **Auto-scaling** : Adaptation automatique des ressources AKS
- **Load balancing** : Répartition de charge avec Kubernetes Services

### Métriques de Performance
```bash
# Utilisation des ressources
kubectl top pods -n projet-eni

# Temps de réponse de l'API
curl -w "@curl-format.txt" -o /dev/null -s http://localhost:3000/api/tasks

# Métriques du cluster
kubectl get hpa -n projet-eni
```

## 🤝 Contribution

### Workflow de Développement

1. **Fork** le repository
2. **Créer** une branche feature (`git checkout -b feature/nouvelle-fonctionnalite`)
3. **Commiter** les changements (`git commit -am 'Ajout nouvelle fonctionnalité'`)
4. **Pousser** vers la branche (`git push origin feature/nouvelle-fonctionnalite`)
5. **Créer** une Pull Request

### Standards de Code

- **Backend** : ESLint + Prettier
- **Frontend** : Angular Style Guide + TSLint
- **Tests** : Couverture minimale de 80%
- **Documentation** : JSDoc pour les fonctions importantes

## 📝 Changelog

### Version 1.0.0 (Actuelle)
- ✅ Application TodoList complète
- ✅ Architecture 3-tiers (Angular + Node.js + MySQL)
- ✅ Conteneurisation Docker
- ✅ Déploiement Kubernetes sur AKS
- ✅ Pipeline CI/CD avec GitHub Actions
- ✅ Infrastructure as Code avec Terraform
- ✅ Documentation complète

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 👥 Auteurs

- **Florent Sicard** - *Développement initial* - [sicardflorent](https://github.com/sicardflorent)

## 🙏 Remerciements

- École Nationale d'Informatique (ENI) pour le cadre pédagogique
- Communauté open-source pour les outils et frameworks utilisés
- Microsoft Azure pour l'infrastructure cloud
- Docker et Kubernetes pour l'orchestration des conteneurs

---

**📞 Support** : Pour toute question ou problème, ouvrez une [issue](https://github.com/votre-username/projet_eni_devops/issues) sur GitHub.
