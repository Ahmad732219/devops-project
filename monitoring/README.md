# Monitoring Stack

## Tools
- Prometheus: metrics collection
- Grafana: visualization
- AlertManager: alerting

## Deployment
Deployed via Helm chart: kube-prometheus-stack

## Access
kubectl --namespace monitoring port-forward svc/monitoring-grafana 3000:80

## Credentials
- Username: admin
- Password: stored in monitoring-grafana secret
