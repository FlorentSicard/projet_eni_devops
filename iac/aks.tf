# AKS Cluster with default networking (kubenet)
resource "azurerm_kubernetes_cluster" "main" {
  name                = var.cluster_name
  location            = data.azurerm_resource_group.main.location
  resource_group_name = data.azurerm_resource_group.main.name
  dns_prefix          = var.dns_prefix
  kubernetes_version  = var.kubernetes_version

  # Default node pool
  default_node_pool {
    name                = "default"
    node_count          = var.node_count
    vm_size             = var.node_vm_size
    enable_auto_scaling = true
    min_count           = 1
    max_count           = 5
    os_disk_size_gb     = 30
    
    # Add required tags to node pool
    tags = local.common_tags
    
    upgrade_settings {
      max_surge = "10%"
    }
  }

  # Identity configuration
  identity {
    type = "SystemAssigned"
  }

  # Default network configuration (kubenet)
  network_profile {
    network_plugin    = "kubenet"
    load_balancer_sku = "standard"
  }

  # Enable Azure Policy
  azure_policy_enabled = true

  # Role-based access control
  role_based_access_control_enabled = true

  tags = local.common_tags
}
