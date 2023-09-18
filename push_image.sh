docker build -t calcul_mental:latest .
docker image tag calcul_mental:latest ghcr.io/seaweedbraincy/calcul_mental:latest
docker push ghcr.io/seaweedbraincy/calcul_mental:latest
docker system prune
