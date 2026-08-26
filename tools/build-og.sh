#!/usr/bin/env bash
# Render tools/og.html -> og.png at exactly 1200x630.
# Needs a Chrome/Chromium on PATH and network access for the webfonts.
set -euo pipefail
cd "$(dirname "$0")/.."

CHROME=""
for c in google-chrome chromium chromium-browser "google-chrome-stable"; do
  command -v "$c" >/dev/null 2>&1 && CHROME="$c" && break
done
[ -n "$CHROME" ] || { echo "no chrome/chromium on PATH" >&2; exit 1; }

"$CHROME" --headless --disable-gpu --hide-scrollbars \
  --force-device-scale-factor=1 \
  --virtual-time-budget=8000 \
  --window-size=1200,630 \
  --screenshot="$PWD/og.png" \
  "file://$PWD/tools/og.html" 2>/dev/null

echo "og.png: $(file -b og.png)"
