FROM rust:1.57.0-bullseye as build

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
RUN touch src/server.rs
RUN cargo build --release

FROM rust:1.57.0-slim-bullseye
LABEL org.opencontainers.image.source https://github.com/mikemoraned/quarterly-clock

ARG TARGETPLATFORM
ARG CHROME_VERSION="96.0.4664.45-1"

RUN echo $TARGETPLATFORM; echo $CHROME_VERSION

# install extra fonts
RUN apt-get update && apt-get install software-properties-common -y
RUN apt-add-repository contrib && apt-get update
RUN apt-get install ttf-mscorefonts-installer fontconfig -y && fc-cache -f

# install chrome
RUN apt-get install wget -y
RUN wget --no-verbose -O /tmp/chrome.deb https://dl.google.com/linux/chrome/deb/pool/main/g/google-chrome-stable/google-chrome-stable_${CHROME_VERSION}_amd64.deb \
  && apt install -y /tmp/chrome.deb \
  && rm /tmp/chrome.deb

RUN mkdir -p /home/appuser
WORKDIR /home/appuser
COPY --from=build /usr/src/app/target/release/server /home/appuser/server

RUN groupadd -g 999 appuser && useradd -r -u 999 -g appuser appuser
RUN chown -v -R appuser:appuser /home/appuser
USER appuser
RUN cd /home/appuser

ENTRYPOINT ["./server"]
