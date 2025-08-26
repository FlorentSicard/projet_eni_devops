resource_group_name = "rg-FSicard2024_cours-projet"
cluster_name       = "aks-todolist-dev"
node_vm_size       = "Standard_DS2_v2"
kubernetes_version = "1.33"
environment        = "dev"
project_name       = "todolist"
dns_prefix         = "todolist-aks-dev"
required_tags = {
  cours     = "cours-projet"
  promotion = "HASDO_001"
  user      = "FSicard2024"
}
