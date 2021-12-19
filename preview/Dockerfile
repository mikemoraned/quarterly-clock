FROM rust:1.56.1
LABEL org.opencontainers.image.source https://github.com/mikemoraned/quarterly-clock

ARG TARGETPLATFORM
ARG CHROME_VERSION="96.0.4664.45-1"

RUN echo $TARGETPLATFORM; echo $CHROME_VERSION

RUN apt-get update && apt-get install wget -y
RUN wget --no-verbose -O /tmp/chrome.deb https://dl.google.com/linux/chrome/deb/pool/main/g/google-chrome-stable/google-chrome-stable_${CHROME_VERSION}_amd64.deb \
  && apt install -y /tmp/chrome.deb \
  && rm /tmp/chrome.deb

RUN mkdir -p /home/appuser
WORKDIR /home/appuser
COPY . .
RUN cargo build --release

RUN groupadd -g 999 appuser && useradd -r -u 999 -g appuser appuser
RUN chown -v -R appuser:appuser /home/appuser
USER appuser
RUN cd /home/appuser

ENTRYPOINT ["./target/release/server"]
