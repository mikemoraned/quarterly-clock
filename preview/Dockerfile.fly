FROM rust:1.56.1

ARG TARGETPLATFORM
ARG CHROME_VERSION="96.0.4664.45-1"

RUN echo $TARGETPLATFORM; echo $CHROME_VERSION

RUN apt-get update && apt-get install wget -y
RUN wget --no-verbose -O /tmp/chrome.deb https://dl.google.com/linux/chrome/deb/pool/main/g/google-chrome-stable/google-chrome-stable_${CHROME_VERSION}_amd64.deb \
  && apt install -y /tmp/chrome.deb \
  && rm /tmp/chrome.deb

WORKDIR /app
COPY . .
RUN cargo build --release

ENV RUSTLOG=headless_chrome=trace
ENTRYPOINT ["./target/release/server"]
