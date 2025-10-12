FROM rust:1.90.0-bookworm AS build

# prepare base image with dependencies
## create shell project
WORKDIR /usr/src/
RUN USER=root cargo new --bin app
WORKDIR /usr/src/app

## copy dependencies
COPY ./Cargo.lock ./Cargo.lock
COPY ./Cargo.toml ./Cargo.toml

## build and cache all dependencies
RUN cargo build --release

# build real app
## replace src
RUN rm src/*.rs
COPY ./src ./src

## build for release, using already compiled dependencies
RUN touch src/bin/server.rs
RUN cargo build --release

FROM debian:bookworm-slim
LABEL org.opencontainers.image.source=https://github.com/mikemoraned/quarterly-clock

# Update system
RUN apt update && apt upgrade -y

# Install Required Packages
RUN apt install software-properties-common apt-transport-https ca-certificates curl -y

# Import Google Chrome APT Repository
## Import the Google Chrome GPG Key
RUN curl -fSsL https://dl.google.com/linux/linux_signing_key.pub | gpg --dearmor | tee /usr/share/keyrings/google-chrome.gpg >> /dev/null
## Add the Google Chrome Repository
RUN echo deb [arch=amd64 signed-by=/usr/share/keyrings/google-chrome.gpg] http://dl.google.com/linux/chrome/deb/ stable main | tee /etc/apt/sources.list.d/google-chrome.list
## Update the APT Package List
RUN apt update

# Install the Stable Version of Google Chrome
RUN apt install google-chrome-stable -y

# Copy across binary from build and run it as non-root user
ARG APP_USER=appuser
ARG APP_UID=1500
ARG APP_GID=1500

RUN groupadd -g ${APP_GID} ${APP_USER} && useradd -r -u ${APP_UID} -g ${APP_USER} ${APP_USER}
RUN mkdir -p /home/${APP_USER}
RUN chown -R appuser:appuser /home/appuser
WORKDIR /home/${APP_USER}
COPY --from=build --chown=${APP_UID}:${APP_GID} /usr/src/app/target/release/server /home/${APP_USER}/server

USER ${APP_USER}
RUN cd /home/${APP_USER}

EXPOSE 8080
# ARG RUST_LOG=info
ARG RUST_LOG=trace
ENV RUST_LOG=$RUST_LOG

ENTRYPOINT ["./server"]
