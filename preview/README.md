## Developing

1. provision docker host on digital ocean (see https://marketplace.digitalocean.com/apps/docker)
2. setup passwordless login on remote host
3. `export DOCKER_HOST=ssh://root@<remote DO IP>`
4. `docker build --tag fly.amd64 --platform linux/amd64 --file Dockerfile .`
5. setup tunneling (allows services started on remote machine to accessed locally): `ssh -L 8080:localhost:8080 root@<remote DO IP>`
6. `docker run --env-file .env -p 8080:8080 -it fly.amd64`
7. access http://localhost:8080/screenshot.png locally
