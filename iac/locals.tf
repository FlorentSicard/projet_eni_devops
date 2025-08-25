# Local values for consistent tagging across all resources
locals {
  # Combine required tags with additional project tags
  common_tags = merge(var.required_tags, {
    Environment = var.environment
    Project     = var.project_name
    ManagedBy   = "Terraform"
  })
}
