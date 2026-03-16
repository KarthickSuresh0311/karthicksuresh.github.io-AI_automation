#!/usr/bin/env bash

set -euo pipefail

ROOT="${1:-/home/karthick/karthicksuresh.github.io-AI_automation}"

assert_file() {
  local file="$1"
  if [[ ! -f "$ROOT/$file" ]]; then
    echo "Missing expected file: $file" >&2
    exit 1
  fi
}

assert_contains() {
  local file="$1"
  local pattern="$2"
  if ! rg -Fq "$pattern" "$ROOT/$file"; then
    echo "Missing expected content in $file: $pattern" >&2
    exit 1
  fi
}

assert_json() {
  local file="$1"
  node -e "JSON.parse(require('fs').readFileSync(process.argv[1], 'utf8'))" "$ROOT/$file" >/dev/null
}

assert_file "systems/agency-outbound/README.md"
assert_file "systems/agency-outbound/google-sheets-schema.md"
assert_file "systems/agency-outbound/prompts.md"
assert_file "systems/agency-outbound/n8n/01_lead_intake.json"
assert_file "systems/agency-outbound/n8n/02_score_and_approval.json"
assert_file "systems/agency-outbound/n8n/03_send_and_replies.json"

assert_contains "systems/agency-outbound/README.md" "agency owners"
assert_contains "systems/agency-outbound/README.md" "lead response automation"
assert_contains "systems/agency-outbound/google-sheets-schema.md" "daily_send_limit"
assert_contains "systems/agency-outbound/prompts.md" "fit_score"
assert_contains "systems/agency-outbound/prompts.md" "suggested_response"

assert_json "systems/agency-outbound/n8n/01_lead_intake.json"
assert_json "systems/agency-outbound/n8n/02_score_and_approval.json"
assert_json "systems/agency-outbound/n8n/03_send_and_replies.json"
