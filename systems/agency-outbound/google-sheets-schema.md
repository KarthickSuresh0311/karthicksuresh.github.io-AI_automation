# Google Sheets Schema

Create one spreadsheet with these tabs.

## Config

| key | value |
| --- | --- |
| icp | agency owners |
| offer | lead response automation |
| daily_send_limit | 10 |
| send_enabled | false |
| timezone | Asia/Kolkata |
| from_name | Karthick Suresh |
| from_email | your-gmail@gmail.com |
| telegram_chat_id | YOUR_TELEGRAM_CHAT_ID |
| followup_day_1 | 3 |
| followup_day_2 | 7 |
| min_fit_score | 7 |

## RawLeads

| source | name | role | company | website | email | location | notes | imported_at | processed |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |

This is the intake buffer. External lead source automations write here first.

## Leads

| lead_id | source | name | role | company | website | email | location | notes | status | fit_score | fit_reason | pain_hypothesis | personalization_line | subject_draft | body_draft | approval_state | approval_message_id | last_action | sent_at | reply_state | reply_summary | followup_step | last_contact_at | error |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |

## Replies

| reply_id | lead_id | gmail_thread_id | from_email | subject | body_excerpt | classification | suggested_response | approval_state | processed_at |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |

## Metrics

| date | new_leads | drafted | approved | sent | replied | positive | calls_booked |
| --- | --- | --- | --- | --- | --- | --- | --- |

## Notes

- Keep `daily_send_limit` editable so you can change from `1` to `100` without touching the workflow.
- Do not change status naming casually. The workflows depend on exact values.
- `approval_state` should typically be one of:
  - `waiting`
  - `approved`
  - `approved_manual`
  - `rejected`
  - `editing`
