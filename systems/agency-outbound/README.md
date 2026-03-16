# Agency Outbound System

This package defines a semi-autonomous outbound system for:

- ICP: `agency owners`
- Offer: `lead response automation`
- Approval channel: `Telegram`
- Send channel: `Gmail`
- State store: `Google Sheets`
- Model: `Gemini 2.5 Flash-Lite`

The system is intentionally approval-first. Drafting, classification, and follow-up suggestions can be automated, but first-touch sends and reply sends should stay human-approved until reply quality is stable.

## What Is Included

- `google-sheets-schema.md` - exact sheet tabs and columns
- `prompts.md` - prompts for fit scoring, drafting, regeneration, and reply classification
- `n8n/01_lead_intake.json` - raw lead ingestion, normalization, dedupe, append to `Leads`
- `n8n/02_score_and_approval.json` - enrichment, Gemini scoring, draft generation, Telegram approval
- `n8n/03_send_and_replies.json` - Telegram callbacks, Gmail send, Gmail reply classification, follow-up approval

## Operating Model

1. External source automation writes raw leads into a `RawLeads` sheet.
2. `01_lead_intake.json` normalizes rows and appends unique rows to `Leads`.
3. `02_score_and_approval.json` enriches each lead, generates score and email draft, then sends approval cards to Telegram.
4. `03_send_and_replies.json` handles Telegram actions, Gmail sending, reply classification, and follow-up suggestions.

## Required Integrations

- Google Sheets credentials
- Gmail credentials
- Telegram Bot credentials
- Gemini API key

## Required Manual Setup

1. Create the Google Sheet tabs exactly as listed in `google-sheets-schema.md`.
2. Replace every placeholder value:
   - `YOUR_SPREADSHEET_ID`
   - `YOUR_TELEGRAM_CHAT_ID`
   - `YOUR_GEMINI_API_KEY`
3. Set `daily_send_limit` in the `Config` sheet.
4. Set `send_enabled=true` only after testing.
5. Start with `5-10` emails per day even if you have more free time.

## Telegram Actions

Approval cards support:

- `Approve`
- `Reject`
- `Regenerate`
- `Edit`

The callback payload format is:

- `approve|lead_id`
- `reject|lead_id`
- `regen|lead_id`
- `edit|lead_id`

For `Edit`, reply in Telegram using:

`EDIT lead_id ::: subject ::: body`

## Recommended Status Values

Use these values only in the `Leads.status` column:

- `new`
- `enriched`
- `drafted`
- `pending_approval`
- `approved`
- `rejected`
- `sent`
- `replied`
- `followup_pending`
- `closed`
- `error`

## Testing Order

1. Test Google Sheets reads and writes.
2. Test Telegram bot send and callback.
3. Test Gmail send to yourself.
4. Test Gemini JSON output formatting.
5. Run 3 leads end to end.
6. Turn on schedules only after the full approval loop works.
