# Example Terraform variables file
# Copy this file to terraform.tfvars and customize the values

# Existing resource group name
resource_group_name = "rg-FSicard2024_cours-projet"

# Location will be automatically retrieved from the existing resource group
# but you can override it if needed
# location = "West Europe"

cluster_name       = "aks-todolist-dev"
node_count         = 2
node_vm_size       = "Standard_DS2_v2"
kubernetes_version = "1.33"
environment        = "dev"
project_name       = "todolist"
dns_prefix         = "todolist-aks-dev"

# Required tags for compliance with resource group policy
# These are already set as defaults but can be overridden if needed
required_tags = {
  cours     = "cours-projet"
  promotion = "HASDO_001"
  user      = "FSicard2024"
}
