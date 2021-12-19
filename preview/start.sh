#!/bin/bash
Xvfb -ac :99 -screen 0 1280x1024x16 &
sleep 5s
DISPLAY=:99 /usr/bin/chromium --headless
