#!/usr/bin/env bash

set -euo pipefail

FILE="${1:-/home/karthick/karthick-suresh-portfolio/index.html}"

assert_contains() {
  local pattern="$1"
  if ! rg -Fq "$pattern" "$FILE"; then
    echo "Missing expected content: $pattern" >&2
    exit 1
  fi
}

assert_contains "See ROI Opportunities"
assert_contains "Why this is lower-risk than hiring a generic automation freelancer"
assert_contains "Where ROI usually shows up first"
assert_contains "What you get in the audit reply"
