# 📝 ToDoList - DevOps Project

A full-stack task management application built with Angular, Node.js, and MySQL, deployed on Azure Kubernetes Service (AKS) using modern DevOps practices.

## 🏗️ Architecture Overview

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │    Backend      │    │    Database     │
│   (Angular 15)  │◄──►│   (Node.js)     │◄──►│    (MySQL 8)    │
│   Port: 80      │    │   Port: 3000    │    │   Port: 3306    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 │
                    ┌─────────────────┐
                    │  Kubernetes     │
                    │  (AKS Cluster)  │
                    └─────────────────┘
```

## 🚀 Features

### Frontend (Angular 15)
- **Modern UI**: Built with Angular Material Design
- **Task Management**: Create, read, update, delete tasks
- **Status Tracking**: Tasks with different statuses (à faire, en cours, terminé)
- **Responsive Design**: Works on desktop and mobile devices
- **Real-time Updates**: Dynamic task list updates

### Backend (Node.js + Express)
- **RESTful API**: Complete CRUD operations for tasks
- **Database Integration**: Sequelize ORM with MySQL
- **API Documentation**: Swagger UI integration
- **CORS Support**: Cross-origin resource sharing enabled
- **Environment Configuration**: Flexible configuration management

### Database (MySQL 8)
- **Persistent Storage**: Task data persistence
- **Relational Structure**: Normalized database schema
- **Connection Pooling**: Optimized database connections

## 📁 Project Structure

```
projet_eni_devops/
├── 📂 frontend/                 # Angular application
│   ├── 📂 src/
│   │   ├── 📂 app/
│   │   │   ├── 📂 components/   # Angular components
│   │   │   ├── 📂 models/       # TypeScript models
│   │   │   ├── 📂 services/     # HTTP services
│   │   │   └── 📂 testing/      # Test utilities
│   │   └── 📄 index.html
│   ├── 📄 Dockerfile           # Frontend container
│   └── 📄 package.json
│
├── 📂 backend/                  # Node.js API
│   ├── 📂 src/
│   │   ├── 📂 config/          # Database configuration
│   │   ├── 📂 controllers/     # Route controllers
│   │   ├── 📂 models/          # Sequelize models
│   │   ├── 📂 routes/          # API routes
│   │   ├── 📂 services/        # Business logic
│   │   └── 📂 docs/            # API documentation
│   ├── 📂 tests/               # Unit & integration tests
│   ├── 📄 Dockerfile           # Backend container
│   └── 📄 package.json
│
├── 📂 k8s/                     # Kubernetes manifests
│   ├── 📄 mysql-secret.yaml    # Database credentials
│   ├── 📄 mysql-pv.yaml        # Persistent volume
│   ├── 📄 mysql.yaml           # MySQL deployment
│   ├── 📄 backend.yaml         # Backend deployment
│   ├── 📄 frontend.yaml        # Frontend deployment
│   └── 📄 loadbalancer.yaml    # Load balancer
│
├── 📂 iac/                     # Infrastructure as Code
│   ├── 📄 aks.tf              # AKS cluster definition
│   ├── 📄 variables.tf        # Terraform variables
│   └── 📄 provider.tf         # Azure provider
│
├── 📂 .github/workflows/       # CI/CD pipelines
│   └── 📄 ci-cd.yml           # GitHub Actions
│
└── 📄 README.md               # This file
```

## 🛠️ Technology Stack

### Frontend
- **Framework**: Angular 15
- **UI Library**: Angular Material
- **Language**: TypeScript
- **Build Tool**: Angular CLI
- **Testing**: Jasmine + Karma

### Backend
- **Runtime**: Node.js 18
- **Framework**: Express.js
- **ORM**: Sequelize
- **Language**: JavaScript
- **Testing**: Jest + Supertest
- **Documentation**: Swagger UI

### Database
- **Engine**: MySQL 8.0
- **Storage**: Persistent volumes on Azure Disk

### Infrastructure
- **Container Platform**: Docker
- **Orchestration**: Kubernetes (AKS)
- **Cloud Provider**: Microsoft Azure
- **IaC**: Terraform
- **CI/CD**: GitHub Actions

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Docker & Docker Compose
- kubectl configured for AKS
- Azure CLI
- Terraform

### Local Development

#### 1. Clone the Repository
```bash
git clone <repository-url>
cd projet_eni_devops
```

#### 2. Backend Setup
```bash
cd backend
npm install
cp .env.example .env  # Configure your database
npm run dev           # Start development server
npm test             # Run tests
```

#### 3. Frontend Setup
```bash
cd frontend
npm install
ng serve             # Start development server
ng test              # Run tests
```

#### 4. Database Setup
```bash
# Using Docker
docker run --name mysql-dev \
  -e MYSQL_ROOT_PASSWORD=rootpassword \
  -e MYSQL_DATABASE=todolist \
  -p 3306:3306 \
  -d mysql:8.0
```

### 🐳 Docker Deployment

#### Build Images
```bash
# Backend
cd backend
docker build -t todolist-backend .

# Frontend  
cd frontend
docker build -t todolist-frontend .
```

#### Run with Docker Compose
```bash
docker-compose up -d
```

## ☁️ Cloud Deployment

### 1. Infrastructure Setup
```bash
cd iac
terraform init
terraform plan
terraform apply
```

### 2. Configure kubectl
```bash
az aks get-credentials --resource-group <rg-name> --name <cluster-name>
```

### 3. Deploy to Kubernetes
```bash
cd k8s

# Deploy in order
kubectl apply -f mysql-secret.yaml
kubectl apply -f mysql-pv.yaml
kubectl apply -f mysql.yaml
kubectl apply -f backend.yaml
kubectl apply -f frontend.yaml
kubectl apply -f loadbalancer.yaml
```

### 4. Access the Application
```bash
# Method 1: Port forwarding (Development)
kubectl port-forward service/backend-service 3000:3000 -n backend &
kubectl port-forward service/frontend-service 80:80 -n frontend &
# Access: http://localhost:80

# Method 2: LoadBalancer (Production)
kubectl get service todolist-loadbalancer -n frontend
# Use the external IP provided
```

## 🔧 Configuration

### Environment Variables

#### Backend (.env)
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=todolist_db
DB_DIALECT=mysql
PORT=3000
```

#### Kubernetes Secrets
Database credentials are stored in Kubernetes secrets:
- Root password: `rootpassword`
- Database: `todolist`
- User: `todouser`
- Password: `todopass`

## 🧪 Testing

### Backend Tests
```bash
cd backend
npm test                    # Run all tests
npm run test:unit          # Unit tests only
npm run test:integration   # Integration tests only
```

### Frontend Tests
```bash
cd frontend
ng test                    # Run tests in watch mode
ng test --watch=false      # Run tests once
ng test --code-coverage    # Generate coverage report
```

## 🚀 CI/CD Pipeline

The project uses GitHub Actions for continuous integration and deployment:

### Pipeline Stages
1. **Test**: Run unit tests for both frontend and backend
2. **Build**: Create Docker images
3. **Push**: Push images to Docker Hub
4. **Deploy**: Deploy to AKS (manual trigger)

### Workflow File
`.github/workflows/ci-cd.yml` contains the complete pipeline configuration.

## 📊 API Documentation

The backend API is documented using Swagger UI:
- **Local**: http://localhost:3000/api/docs
- **Production**: Access via your deployed backend URL + `/api/docs`

### API Endpoints
- `GET /api/tasks` - Get all tasks
- `GET /api/tasks/:id` - Get task by ID
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

## 🗄️ Database Schema

### Tasks Table
```sql
CREATE TABLE tasks (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nom VARCHAR(255) NOT NULL,
  description TEXT,
  statut ENUM('à faire', 'en cours', 'terminé') DEFAULT 'à faire',
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

## 🔍 Monitoring & Troubleshooting

### Check Application Status
```bash
# Check all pods
kubectl get pods -A

# Check services
kubectl get services -A

# Check logs
kubectl logs -l app=backend -n backend
kubectl logs -l app=frontend -n frontend
kubectl logs -l app=mysql -n mysql
```

### Common Issues

#### Backend Connection Issues
```bash
# Check if MySQL is accessible
kubectl exec -it deployment/backend-deployment -n backend -- nslookup mysql.mysql.svc.cluster.local
```

#### Frontend Not Loading
```bash
# Check nginx configuration
kubectl describe configmap frontend-nginx-config -n frontend
```

## 🔒 Security Considerations

- Database credentials stored in Kubernetes secrets
- CORS properly configured for cross-origin requests
- Resource limits set for all containers
- Network policies can be added for additional security
- HTTPS termination at load balancer level

## 📈 Performance Optimization

- **Frontend**: Angular build optimization, lazy loading
- **Backend**: Connection pooling, caching strategies
- **Database**: Indexed queries, optimized schema
- **Infrastructure**: Horizontal pod autoscaling, resource limits

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License - see the LICENSE file for details.

## 👥 Authors

- **Florent Sicard** - Initial work

## 🙏 Acknowledgments

- Angular team for the excellent framework
- Express.js community for the robust backend framework
- Kubernetes community for container orchestration
- Azure team for cloud infrastructure

---

**🎉 Happy coding! If you have any questions or issues, please open an issue in the repository.**
