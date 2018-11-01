0- install node
1- docker build -t federicobottoni/node-web-app
2- docker-compose build
3- docker-compose up

https://nodejs.org/en/docs/guides/nodejs-docker-webapp/
https://docs.docker.com/docker-for-windows/kubernetes/
https://node-postgres.com/features/connecting
https://prometheus.io/docs/visualization/grafana/#grafana-support-for-prometheus
https://stackoverflow.com/questions/43999394/prometheus-how-to-monitor-other-docker-containers

Federico Bottoni 806944, Nassim Habbash 808292
L'applicativo consiste in una webapp in Node.js con database PostgreSQL i cui ambienti sono containerizzati con Docker, orchestrati con Kubernetes e monitorati da Prometheus supportato da Grafana. Il sistema soddisfa i requisiti di Containerization, Provisioning e Monitoring.
