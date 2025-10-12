# Running / testing locally

## Local Rust + Local Chrome

This is where we are compiling and running it under Rust locally and allowing the `headless_chrome` library to find and start Chrome for us.

Take a screenshot and save in `screenshot.png`: 

    cargo run --bin screenshot

The default log-leve is `INFO` and following runs it at `TRACE` level:

    RUST_LOG=trace cargo run --bin screenshot    

Run a local server:

    RUST_LOG=info cargo run --bin server # (Note that I think we need explicit `RUST_LOG` here as I think something else set it to quieter than that)

If you then go to `http://localhost:8080/screenshot.png` you should see a screenshot