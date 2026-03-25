#!/usr/bin/env bash

set -euo pipefail

FILE="${1:-/home/karthick/karthicksuresh.github.io-AI_automation/index.html}"

assert_contains() {
  local pattern="$1"
  if ! rg -Fq "$pattern" "$FILE"; then
    echo "Missing expected content: $pattern" >&2
    exit 1
  fi
}

assert_contains "Request Agency Workflow Audit"
assert_contains "Why this is lower-risk than hiring a generic automation freelancer"
assert_contains "Where ROI usually shows up first"
assert_contains "What you get in the audit reply"
assert_contains "Start Here"
assert_contains "Agency Workflow Audit + Build Direction"
assert_contains "Who this is for"
assert_contains "FAQ"
assert_contains "Proof You Can Review"
assert_contains "This portfolio stays grounded in what is real today"
