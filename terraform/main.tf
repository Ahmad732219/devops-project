provider "aws" {
  region = "us-east-1"
}

# Key pair for SSH access
resource "aws_key_pair" "devops_key" {
  key_name   = "devops-project-key"
  public_key = file("~/.ssh/devops-key.pub")
}

# Security group
resource "aws_security_group" "devops_sg" {
  name        = "devops-project-sg"
  description = "Security group for DevOps project"

  ingress {
    description = "SSH"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "Jenkins"
    from_port   = 8080
    to_port     = 8080
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "HTTP"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "App ports"
    from_port   = 3000
    to_port     = 9000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "devops-project-sg"
  }
}

# EC2 instance
resource "aws_instance" "devops_server" {
  ami                    = "ami-0c02fb55956c7d316"
  instance_type          = "t3.micro"
  key_name               = aws_key_pair.devops_key.key_name
  vpc_security_group_ids = [aws_security_group.devops_sg.id]

  root_block_device {
    volume_size = 20
  }

  tags = {
    Name = "devops-project-server"
  }
}

# Output the public IP
output "server_ip" {
  value = aws_instance.devops_server.public_ip
}
