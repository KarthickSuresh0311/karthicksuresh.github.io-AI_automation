# n8n Automation Workflows for Agencies

AI-powered workflow systems built for agencies dealing with manual ops drag.
Lead routing, inbox automation, reporting, and alert systems using n8n, Gemini, OpenAI, and Gmail API.

## Workflows

### 1. Email Lead Automation System
Catches inbound leads from Gmail, classifies intent with Gemini, scores priority, drafts replies, and logs everything to Google Sheets.

**Stack:** n8n · Gemini · Gmail API · Slack · Google Sheets  
**Saves:** 5-6 hours/week for agencies handling 20-30 inbound leads  
**JSON:** [Open workflow](workflows/u9iGGbAgyBDFCEFM2eRP2.json)

**Flow:**
Gmail trigger → extract lead data → Gemini classification → priority scoring → draft reply → Slack alert → log to Sheets

---

### 2. Multi-Client AI Monitoring System
Pulls ad performance data, scores campaigns, detects anomalies, and fires Slack alerts across multiple client accounts.

**Stack:** n8n · Google Sheets · Slack · REST APIs  
**Saves:** Manual account checking across multiple clients  
**JSON:** [Open workflow](workflows/b5lPrh5jqMojRNDYWneIk.json)

**Flow:**
Scheduled pull → normalize data → score performance → risk rules → Slack alerts → reporting sink

---

## About
Built by [Karthick Suresh](https://linkedin.com/in/karthicksuresh) — n8n automation specialist for agencies.

Portfolio: [karthicksuresh0311.github.io](https://karthicksuresh0311.github.io/karthicksuresh.github.io-AI_automation/)  
Email: karthicksuresh0311@gmail.com
