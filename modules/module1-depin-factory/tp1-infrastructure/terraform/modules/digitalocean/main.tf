variable "do_token" {}
variable "region" { default = "fra1" }
variable "droplet_count" { default = 1 }
variable "ssh_keys" { type = list(string) }

resource "digitalocean_droplet" "depin_node" {
  count  = var.droplet_count
  image  = "ubuntu-22-04-x64"
  name   = "depin-node-${count.index}"
  region = var.region
  size   = "s-1vcpu-2gb"
  ssh_keys = var.ssh_keys

  tags = ["masterclass2026", "depin"]
}

output "droplet_ips" {
  value = digitalocean_droplet.depin_node.*.ipv4_address
}
