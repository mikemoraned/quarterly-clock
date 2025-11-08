# Solid Clock Spike

This is a small spike which demonstrated a few things are possible:
* Defining the bulk of the SVG dom structure in Solid JSX but with things like arc paths still using D3
* Allowing SVG patterns to defined from within components but then hoisted to the top of the SVG and put inside the global `def`
* Snapshot-based testing of the above
* Proper Typescript typing of the above
* All of the above updated dynamically based on a simple model