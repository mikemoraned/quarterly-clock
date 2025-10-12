# Running / testing locally

Locally here means on a Mac machine.

## Local Rust + Local Chrome

This is where we are compiling and running it under Rust locally and allowing the `headless_chrome` library to find and start Chrome for us.

Take a screenshot and save in `screenshot.png`: 

    cargo run --bin screenshot

The default log-leve is `INFO` and following runs it at `TRACE` level:

    RUST_LOG=trace cargo run --bin screenshot    

Run a local server:

    RUST_LOG=info cargo run --bin server # (Note that I think we need explicit `RUST_LOG` here as I think something else set it to quieter than that)

If you then go to `http://localhost:8080/screenshot.png` you should see a screenshot

## Running locally in Docker

This is where everything is running inside Docker, including a version of chrome that is not from local machine. Note that this is running as `--platform linux/amd64` which is not the native architecture of mac.

Build the container:

    docker build --tag quarterly-clock-preview --platform linux/amd64 --file Dockerfile .

Run it locally:

    docker run --platform linux/amd64 -p 8080:8080 -it quarterly-clock-preview

Because a `RUST_LOG` `ARG` is defined, you can also enable more verbose logging e.g.

    docker run --platform linux/amd64 -e RUST_LOG=trace -p 8080:8080 -it quarterly-clock-preview

# Running / testing on fly.io

This is largely controlled by the `publish-to-ghcr` github workflow which builds the app, publishes to GHCR, and then deploys it to fly.io. It follow the pattern that:
* main app is deployed to https://fly.io/apps/quarterly-preview (https://quarterly-preview.fly.dev) whenever a release is made
    * a release is made by going to https://github.com/mikemoraned/quarterly-clock/releases/new and tagging a new release as `vSOMETHING` e.g. `v0.2.0`
* branches are deployed to https://fly.io/apps/quarterly-preview-branch-build (https://quarterly-preview-branch-build.fly.dev) whenever a new PR is created
    * this is last-writer wins i.e. multiple simultaneous PR's not supported