# Variables for the AKS cluster configuration

variable "resource_group_name" {
  description = "Name of the existing resource group"
  type        = string
  default     = "rg-FSicard2024_cours-projet"
}

variable "location" {
  description = "Azure region for resources (will be retrieved from existing RG)"
  type        = string
  default     = "West Europe"
}

variable "cluster_name" {
  description = "Name of the AKS cluster"
  type        = string
  default     = "aks-todolist-cluster"
}

variable "node_count" {
  description = "Number of nodes in the default node pool"
  type        = number
  default     = 2
}

variable "node_vm_size" {
  description = "VM size for the nodes"
  type        = string
  default     = "Standard_DS2_v2"
}

variable "kubernetes_version" {
  description = "Kubernetes version"
  type        = string
  default     = "1.28"
}

variable "environment" {
  description = "Environment name"
  type        = string
  default     = "dev"
}

variable "project_name" {
  description = "Project name for tagging"
  type        = string
  default     = "todolist"
}

variable "dns_prefix" {
  description = "DNS prefix for the cluster"
  type        = string
  default     = "todolist-aks"
}

# Required tags for compliance with resource group policy
variable "required_tags" {
  description = "Required tags for all resources"
  type        = map(string)
  default = {
    cours      = "cours-projet"
    promotion  = "HASDO_001"
    user       = "FSicard2024"
  }
}
