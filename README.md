# Terraform - Infrastructure AKS Simplifiée pour ToDoList

Ce dossier contient la configuration Terraform pour déployer un cluster Azure Kubernetes Service (AKS) simplifié pour l'application ToDoList.

## Structure des fichiers

```
terraform/
├── provider.tf              # Configuration des providers Terraform
├── variables.tf             # Définition des variables
├── locals.tf                # Valeurs locales pour la gestion des tags
├── resource-group.tf        # Référence au groupe de ressources existant
├── vnet.tf                  # Fichier vide (networking supprimé)
├── aks.tf                   # Cluster AKS avec networking par défaut
├── outputs.tf               # Valeurs de sortie
├── terraform.tfvars.example # Exemple de fichier de variables
└── README.md                # Documentation
```

## Configuration simplifiée

Cette configuration crée un cluster AKS **sans VNet personnalisé ni NSG** :
- ✅ Utilise le networking par défaut d'Azure (kubenet)
- ✅ Pas de VNet personnalisé
- ✅ Pas de Network Security Group
- ✅ Configuration minimale pour un déploiement rapide

## Prérequis

1. **Azure CLI** installé et configuré
   ```bash
   az login
   ```

2. **Terraform** installé (version >= 1.0)
   ```bash
   terraform version
   ```

3. **kubectl** installé pour gérer le cluster
   ```bash
   kubectl version --client
   ```

## Tags obligatoires

⚠️ **Important** : Toutes les ressources ont les tags suivants pour respecter la politique du groupe de ressources :

- `cours: cours-projet`
- `promotion: HASDO_001`
- `user: FSicard2024`

## Configuration

1. **Copier le fichier d'exemple des variables**
   ```bash
   cp terraform.tfvars.example terraform.tfvars
   ```

2. **Les variables par défaut sont prêtes à l'emploi**
   ```hcl
   resource_group_name = "rg-FSicard2024_cours-projet"
   cluster_name       = "aks-todolist-cluster"
   node_count         = 2
   environment        = "dev"
   ```

## Déploiement

1. **Initialiser Terraform**
   ```bash
   terraform init
   ```

2. **Planifier le déploiement**
   ```bash
   terraform plan
   ```

3. **Appliquer la configuration**
   ```bash
   terraform apply
   ```

4. **Configurer kubectl**
   ```bash
   az aks get-credentials --resource-group rg-FSicard2024_cours-projet --name aks-todolist-cluster
   ```

## Ressources créées

Ressources créées dans le groupe de ressources existant `rg-FSicard2024_cours-projet` :

- **AKS Cluster** : Cluster Kubernetes managé avec networking par défaut
- **Log Analytics Workspace** : Pour le monitoring du cluster
- **Node Resource Group** : Créé automatiquement par Azure pour les nœuds

## Networking par défaut

- **Plugin réseau** : kubenet (par défaut Azure)
- **Load Balancer** : Standard SKU
- **VNet** : Créé automatiquement par Azure
- **Subnets** : Gérés automatiquement par Azure
- **NSG** : Règles par défaut d'Azure

## Fonctionnalités activées

- **Auto-scaling** : Mise à l'échelle automatique des nœuds (1-5 nœuds)
- **Monitoring** : Intégration avec Azure Monitor
- **RBAC** : Contrôle d'accès basé sur les rôles
- **Azure Policy** : Gouvernance et conformité
- **HTTP Application Routing** : Pour le développement
- **Tags obligatoires** : Conformité avec la politique

## Avantages de cette configuration

✅ **Simplicité** : Configuration minimale  
✅ **Déploiement rapide** : Moins de ressources à créer  
✅ **Gestion automatique** : Azure gère le networking  
✅ **Coût réduit** : Pas de ressources réseau supplémentaires  
✅ **Conformité** : Tags obligatoires appliqués  

## Commandes utiles

```bash
# Voir l'état de l'infrastructure
terraform show

# Voir les outputs
terraform output

# Obtenir la configuration kubectl
az aks get-credentials --resource-group rg-FSicard2024_cours-projet --name aks-todolist-cluster

# Vérifier le cluster
kubectl get nodes

# Vérifier les services
kubectl get services

# Détruire l'infrastructure
terraform destroy
```

## Variables importantes

| Variable | Description | Défaut |
|----------|-------------|---------|
| `resource_group_name` | Nom du groupe de ressources existant | `rg-FSicard2024_cours-projet` |
| `cluster_name` | Nom du cluster AKS | `aks-todolist-cluster` |
| `node_count` | Nombre de nœuds | `2` |
| `node_vm_size` | Taille des VMs | `Standard_DS2_v2` |
| `kubernetes_version` | Version de Kubernetes | `1.28` |

## Sécurité

- **RBAC** : Activé par défaut
- **Identité managée** : Système assigné
- **Azure Policy** : Gouvernance activée
- **Règles réseau** : Gérées par Azure (par défaut)

## Monitoring

- **Log Analytics** : Workspace intégré
- **Azure Monitor** : Métriques et logs
- **Container Insights** : Monitoring des conteneurs

## Dépannage

```bash
# Vérifier l'état du cluster
az aks show --resource-group rg-FSicard2024_cours-projet --name aks-todolist-cluster

# Vérifier les nœuds
kubectl get nodes -o wide

# Vérifier les pods système
kubectl get pods -n kube-system

# Logs Terraform en cas de problème
export TF_LOG=DEBUG
terraform apply
```

## Prochaines étapes

Après le déploiement du cluster, vous pourrez :
1. Déployer votre application ToDoList avec kubectl
2. Configurer des services et ingress
3. Ajouter des certificats SSL si nécessaire
4. Configurer CI/CD pour les déploiements automatiques
