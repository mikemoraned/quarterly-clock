# Developing

## Running / testing locally

### Local Rust + Chrome inside Docker

First setup a chrome running in a local docker container, such that it can be talked to:
```
# Build it:
docker build --tag quarterly-clock-preview.amd64 --platform linux/amd64 --file Dockerfile.debian.chrome .
# Run it:
docker run --platform linux/amd64 -p 9222:9222 -it quarterly-clock-preview.amd64
```


