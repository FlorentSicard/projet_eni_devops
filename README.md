# 📝 TodoList - Application de Gestion de Tâches Moderne

Une application de gestion de tâches simple et élégante construite avec des technologies web modernes et déployée en utilisant les meilleures pratiques DevOps. Ce projet démontre une application full-stack complète avec un pipeline CI/CD automatisé et un déploiement cloud.

## 🎯 Qu'est-ce que cette application ?

Il s'agit d'une **application TodoList** qui permet aux utilisateurs de gérer efficacement leurs tâches quotidiennes. Les utilisateurs peuvent :

- ✅ **Créer de nouvelles tâches** avec un titre et une description
- 📝 **Modifier les tâches existantes** pour mettre à jour les informations
- 🔄 **Changer le statut des tâches** entre "À faire", "En cours" et "Terminé"
- 🗑️ **Supprimer les tâches** quand elles ne sont plus nécessaires
- 📱 **Accéder depuis n'importe quel appareil** grâce au design responsive

## 🏗️ Comment ça fonctionne

L'application suit une **architecture 3-tiers moderne** :

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │    Backend      │    │  Base de données│
│   (Angular 15)  │◄──►│   (Node.js)     │◄──►│    (MySQL 8)    │
│ Interface Utilisateur│ │    API REST     │    │ Stockage données│
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### Frontend (Angular 15)
- **Interface web moderne** construite avec Angular et Material Design
- **Design responsive** qui fonctionne sur ordinateur, tablette et mobile
- **Mises à jour en temps réel** quand les tâches sont modifiées
- **Expérience utilisateur intuitive** avec drag-and-drop et animations fluides

### Backend (Node.js + Express)
- **API RESTful** qui gère toutes les opérations sur les tâches (CRUD)
- **Intégration base de données** utilisant l'ORM Sequelize
- **Documentation API** avec Swagger UI pour les développeurs
- **Configuration d'environnement** pour différents scénarios de déploiement

### Base de données (MySQL 8)
- **Stockage persistant** pour toutes les données de tâches
- **Base de données relationnelle** avec requêtes optimisées
- **Intégrité des données** avec contraintes et relations appropriées

## 🚀 Guide de Démarrage Rapide

### Option 1 : Essayer en ligne (Le plus facile)
Si l'application est déployée, visitez simplement l'URL fournie par votre instructeur ou vérifiez le statut de déploiement dans GitHub Actions.

### Option 2 : Configuration de Développement

Si vous voulez modifier le code :

1. **Prérequis** : 
   - [Node.js 18+](https://nodejs.org/)
   - [MySQL 8](https://dev.mysql.com/downloads/mysql/) ou Docker

2. **Configuration Backend** :
```bash
cd backend
npm install
cp .env.example .env  # Configurer votre connexion base de données
npm run dev           # Démarre sur http://localhost:3000
```

3. **Configuration Frontend** :
```bash
cd frontend
npm install
ng serve              # Démarre sur http://localhost:4200
```

4. **Configuration Base de données** :
```bash
# Utiliser Docker (le plus facile)
docker run --name mysql-todolist \
  -e MYSQL_ROOT_PASSWORD=rootpassword \
  -e MYSQL_DATABASE=todolist \
  -p 3306:3306 \
  -d mysql:8.0
```

## 📱 Comment Utiliser l'Application

### Créer une Tâche
1. Cliquer sur le bouton **"Ajouter une tâche"**
2. Saisir un **nom de tâche** (obligatoire)
3. Ajouter une **description** (optionnel)
4. Cliquer sur **"Enregistrer"** pour créer la tâche

### Gérer les Tâches
- **Voir toutes les tâches** : Les tâches sont affichées dans un format de liste claire
- **Changer le statut** : Cliquer sur le menu déroulant de statut pour déplacer les tâches entre :
  - 🔵 **À faire** - Nouvelles tâches
  - 🟡 **En cours** - Tâches sur lesquelles vous travaillez
  - 🟢 **Terminé** - Tâches finies
- **Modifier une tâche** : Cliquer sur l'icône d'édition pour modifier les détails
- **Supprimer une tâche** : Cliquer sur l'icône de suppression pour retirer définitivement une tâche

### Filtrage et Organisation
- Les tâches sont automatiquement organisées par statut
- Utiliser la fonctionnalité de recherche pour trouver des tâches spécifiques
- Trier les tâches par date de création ou priorité

## 🛠️ Stack Technologique

| Composant | Technologie | Objectif |
|-----------|-------------|----------|
| **Frontend** | Angular 15 + Material UI | Interface et expérience utilisateur |
| **Backend** | Node.js + Express | API REST et logique métier |
| **Base de données** | MySQL 8 | Persistance et stockage des données |
| **Conteneurisation** | Docker | Packaging d'application |
| **Orchestration** | Kubernetes (AKS) | Gestion et mise à l'échelle des conteneurs |
| **Plateforme Cloud** | Microsoft Azure | Hébergement et infrastructure |
| **CI/CD** | GitHub Actions | Tests et déploiement automatisés |
| **Infrastructure** | Terraform | Infrastructure as Code |

## 🔄 Pipeline DevOps

Ce projet démontre les pratiques DevOps modernes avec CI/CD automatisé :

### Intégration Continue (CI)
1. **Push de code** → Déclenche le pipeline automatisé
2. **Tests** → Exécute les tests unitaires pour frontend et backend
3. **Construction** → Crée les images Docker
4. **Publication** → Pousse les images vers Docker Hub

### Déploiement Continu (CD)
1. **Déploiement** → Déploie automatiquement sur le cluster Kubernetes
2. **Vérification** → Vérifie la santé du déploiement
3. **Surveillance** → Suit les performances de l'application

### Statut du Pipeline
Vérifiez l'onglet **Actions** dans GitHub pour voir le statut actuel du pipeline et l'historique des déploiements.

## 📁 Structure du Projet

```
projet_eni_devops/
├── 📂 frontend/                 # Application Angular
│   ├── 📂 src/app/components/   # Composants UI (liste tâches, formulaires, etc.)
│   ├── 📂 src/app/services/     # Services HTTP pour appels API
│   └── 📄 Dockerfile           # Configuration conteneur frontend
│
├── 📂 backend/                  # API REST Node.js
│   ├── 📂 src/controllers/     # Gestionnaires d'endpoints API
│   ├── 📂 src/models/          # Modèles base de données (modèle Task)
│   ├── 📂 src/routes/          # Routes API (/api/tasks)
│   └── 📄 Dockerfile           # Configuration conteneur backend
│
├── 📂 k8s/                     # Fichiers de déploiement Kubernetes
│   ├── 📄 mysql.yaml          # Déploiement base de données
│   ├── 📄 backend.yaml         # Déploiement API backend
│   ├── 📄 frontend.yaml        # Déploiement frontend
│   └── 📄 loadbalancer.yaml    # Configuration accès externe
│
├── 📂 .github/workflows/       # Pipeline CI/CD
│   └── 📄 ci-cd.yml           # Tests et déploiement automatisés
│
└── 📄 README.md               # Cette documentation
```

## 🔧 Configuration

### Variables d'Environnement
L'application utilise des variables d'environnement pour la configuration :

```env
# Configuration Backend
DB_HOST=mysql                    # Hôte base de données
DB_PORT=3306                     # Port base de données
DB_NAME=todolist                 # Nom base de données
DB_USER=todouser                 # Utilisateur base de données
DB_PASSWORD=todopass             # Mot de passe base de données
PORT=3000                        # Port serveur backend
```

### Schéma Base de Données
L'application utilise un schéma de base de données simple :

```sql
CREATE TABLE tasks (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nom VARCHAR(255) NOT NULL,           -- Nom de la tâche
  description TEXT,                    -- Description de la tâche
  statut ENUM('à faire', 'en cours', 'terminé') DEFAULT 'à faire',
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

## 🧪 Tests

Le projet inclut des tests complets :

### Exécuter les Tests
```bash
# Tests backend
cd backend && npm test

# Tests frontend  
cd frontend && ng test --watch=false
```

### Couverture de Tests
- **Tests unitaires** pour composants et fonctions individuels
- **Tests d'intégration** pour endpoints API
- **Tests end-to-end** pour workflows utilisateur

## 🚀 Déploiement

### Déploiement Cloud (Azure Kubernetes Service)
L'application est automatiquement déployée sur Azure AKS via GitHub Actions :

1. **Push du code** vers la branche main
2. **Le pipeline s'exécute** automatiquement
3. **Les tests s'exécutent** pour assurer la qualité du code
4. **Les images Docker** sont construites et poussées
5. **Le déploiement Kubernetes** met à jour l'application en cours d'exécution

### Déploiement Manuel
Pour un déploiement manuel ou dépannage :

```bash
# Déployer sur Kubernetes
kubectl apply -f k8s/

# Vérifier le statut du déploiement
kubectl get pods -n projet-eni
kubectl get services -n projet-eni
```

### 🌐 Accéder à l'Application Déployée

Une fois l'application déployée sur AKS, l'ingress controller crée automatiquement une **adresse IP statique publique** pour accéder à votre application.

#### Obtenir l'IP Publique
```bash
# Récupérer l'IP externe du LoadBalancer
kubectl get service -n projet-eni

# Ou spécifiquement pour le service LoadBalancer
kubectl get service todolist-loadbalancer -n projet-eni -o jsonpath='{.status.loadBalancer.ingress[0].ip}'

# Afficher toutes les informations du service
kubectl describe service todolist-loadbalancer -n projet-eni
```

#### Accéder à l'Application
Une fois que vous avez récupéré l'IP publique (par exemple `20.123.45.67`), vous pouvez accéder à :

- **Application Frontend** : `http://[IP-PUBLIQUE]`
- **API Backend** : `http://[IP-PUBLIQUE]:3000`
- **Documentation API** : `http://[IP-PUBLIQUE]:3000/api/docs`

**Exemple** :
```bash
# Si votre IP publique est 20.123.45.67
# Frontend : http://20.123.45.67
# Backend API : http://20.123.45.67:3000
# Documentation : http://20.123.45.67:3000/api/docs
```

#### Vérifier que l'Application Fonctionne
```bash
# Tester l'API
curl http://[IP-PUBLIQUE]:3000/api/tasks

# Vérifier le statut de santé
curl http://[IP-PUBLIQUE]:3000/health
```

> **Note** : Il peut falloir quelques minutes après le déploiement pour que l'IP publique soit assignée et que l'application soit accessible.

## 📊 Surveillance et Monitoring

### Installation de Prometheus et Grafana

Le cluster est équipé d'une stack de monitoring complète utilisant **Prometheus** et **Grafana** installés via Helm :

```bash
# Installation de kube-prometheus-stack
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo update
helm install kube-prometheus-stack prometheus-community/kube-prometheus-stack --namespace monitoring --create-namespace
```

### Accéder à Grafana

1. **Récupérer le mot de passe admin** :
```bash
kubectl --namespace monitoring get secrets kube-prometheus-stack-grafana -o jsonpath="{.data.admin-password}" | base64 -d ; echo
```

2. **Port-forward vers Grafana** :
```bash
export POD_NAME=$(kubectl --namespace monitoring get pod -l "app.kubernetes.io/name=grafana,app.kubernetes.io/instance=kube-prometheus-stack" -oname)
kubectl --namespace monitoring port-forward $POD_NAME 3000
```

3. **Accéder à l'interface** :
   - URL : `http://localhost:3000`
   - Utilisateur : `admin`
   - Mot de passe : (obtenu avec la commande ci-dessus)

### Dashboards Disponibles

Grafana est livré avec de **nombreux dashboards pré-configurés** pour surveiller :
- **Métriques du cluster Kubernetes** (CPU, mémoire, réseau)
- **Performances des pods** et conteneurs
- **État des nodes** et ressources
- **Métriques de l'application TodoList** (si instrumentée)
- **Santé de la base de données MySQL**
- **Trafic réseau** et latence

Ces dashboards offrent une **visibilité complète** sur l'infrastructure et les performances de l'application en temps réel.

## 🔍 Dépannage

### Vérifier la Santé de l'Application
```bash
# Voir les pods en cours d'exécution
kubectl get pods -n projet-eni

# Vérifier les logs d'application
kubectl logs -l app=backend -n projet-eni
kubectl logs -l app=frontend -n projet-eni

# Tester la connectivité API
curl http://<url-de-votre-app>/api/tasks
```

### Problèmes Courants
- **Connexion base de données** : S'assurer que le pod MySQL fonctionne et est accessible
- **Erreurs de pull d'image** : Vérifier les identifiants Docker Hub et tags d'image
- **Problèmes réseau** : Vérifier les configurations de service et règles d'ingress

## 🤝 Contribuer

Vous voulez améliorer l'application ? Voici comment :

1. **Forker** le repository
2. **Créer** une branche de fonctionnalité (`git checkout -b feature/nouvelle-fonctionnalite`)
3. **Faire** vos changements et ajouter des tests
4. **Commiter** vos changements (`git commit -m 'Ajouter nouvelle fonctionnalité'`)
5. **Pousser** vers votre branche (`git push origin feature/nouvelle-fonctionnalite`)
6. **Créer** une Pull Request

## 📚 Objectifs d'Apprentissage

Ce projet démontre :

- **Développement full-stack** avec frameworks modernes
- **Conception et implémentation d'API RESTful**
- **Conception de base de données** et utilisation d'ORM
- **Conteneurisation** avec Docker
- **Orchestration et déploiement Kubernetes**
- **Pipelines CI/CD** avec GitHub Actions
- **Déploiement cloud** sur Azure
- **Infrastructure as Code** avec Terraform
- **Meilleures pratiques DevOps** et automatisation

## 📞 Support

Si vous rencontrez des problèmes :

1. Vérifiez l'onglet **GitHub Actions** pour le statut du pipeline
2. Consultez les **logs** dans les pods Kubernetes
3. Consultez la **documentation API** à `/api/docs`
4. Ouvrez une **issue** dans le repository GitHub

## 👥 Auteurs

- **Florent Sicard** - Étudiant ENI - Projet DevOps 2024

---

**🎉 Profitez de la gestion de vos tâches avec cette application TodoList moderne !**
