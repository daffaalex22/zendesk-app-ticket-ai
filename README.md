# Zendesk App - Ticket AI Assistant (+n8n Workflows)

A small Zendesk app scaffold that includes both a frontend iframe app and backend n8n automation workflows. This project shows a minimal Zendesk iframe app using static HTML, CSS and JavaScript, along with n8n workflows for backend automation.

## 📚 Table of Contents
- [Zendesk App](#zendesk-app)
  - [Features](#features)
  - [Languages & Frameworks](#languages--frameworks)
  - [Main Files](#main-files)
  - [How to run locally (development)](#how-to-run-locally-development)
- [n8n Automations](#n8n-automations)
  - [Included Workflows](#included-workflows)
  - [How to Import Workflows into n8n](#how-to-import-workflows-into-n8n)

## 🧾 Zendesk App

### 🎯 Features

- Ticket Summarization
- Draft Automated Ticket Reply
- Documentation based QnA (RAG)

### 📦 Languages & Frameworks

- Languages: [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML), [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS), [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript), [JSON](https://www.json.org/json-en.html)
- Tools / Frameworks:
	- [Zendesk App Framework (ZAF)](https://developer.zendesk.com/api-reference/apps/apps-core-api/client_api/) — app runs inside Zendesk via an iframe
	- [Zendesk CLI (`zcli`)](https://developer.zendesk.com/documentation/apps/getting-started/using-zcli/) — local development and deployment tools
 	- [Zendesk Garden](https://garden.zendesk.com/) — zendesk's official design sytem
 
### 🔧 Main Files

- [`assets/iframe.html`](assets/iframe.html) — main iframe HTML the app loads
- [`assets/script.js`](assets/script.js) — app JavaScript logic
- [`assets/n8n-webhook-client.js`](assets/n8n-webhook-client.js) — n8n webhook client functions
- [`assets/styles.css`](assets/styles.css) — app styling
- [`assets/forms.css`](assets/forms.css) — Zendesk Garden form components
- [`assets/buttons.css`](assets/buttons.css) — Zendesk Garden button components
- `translations/en.json` — English translations
- `manifest.json` — app metadata and requirements
- [`assets/workflows`](assets/workflows) - n8n automation workflows that used on the backend

### ▶️ How to run locally (development)

Prerequisites:

- Node.js (12+ recommended)
- npm (comes with Node.js)
- Zendesk CLI (`zcli`) — used for serving and deploying the app

Install `zcli` globally (PowerShell / Windows example):

```powershell
npm install -g @zendesk/zcli
```

Serve the app locally (from the repository root):

```powershell
cd YOURPATH/zendesk-app-ticket-ai
zcli apps:server
```

This command will start a local dev server and give you a URL to install the dev app into your Zendesk account (follow the prompts from `zcli`).

Deploy the app using `zcli`:

```powershell
zcli apps:deploy
```

See `zcli.apps.config.json` for environment-specific settings used during deploy.

## ⚙️ n8n Automations

The n8n workflows are included in the [`assets/workflows`](assets/workflows) directory. These workflows handle backend processes such as data processing, API integrations, and automated responses, extending the functionality of the ticket assistant beyond what's possible in the frontend alone.

### Included Workflows

1. **Ticket Summarization**
   - Triggers: Zendesk Ticket Created
   - Actions: Summarize ticket content using OpenAI API
   - Output: Ticket summary sent to Zendesk app via webhook

2. **Draft Automated Ticket Reply**
   - Triggers: Zendesk Ticket Created
   - Actions: Generate automated reply using OpenAI API
   - Output: Automated reply sent to Zendesk app via webhook

3. **Documentation based QnA (RAG)**
   - Triggers: Zendesk Ticket Created
   - Actions: Query documentation using OpenAI API
   - Output: Documentation-based response sent to Zendesk app via webhook

For detailed instructions on how to set up and customize these workflows, please refer to the [n8n documentation](https://docs.n8n.io/).

### How to Import Workflows into n8n

Assuming you already have an n8n instance running, follow these steps.

1. Open your n8n instance.
2. Click on the "Import" button in the top-right corner.
3. Select the workflow you want to import (for example, [`assets/workflows/RAG_v2.json`](assets/workflows/RAG_v2.json)).
4. Follow the prompts to complete the import process.
5. Customize the workflow as needed (e.g., add your OpenAI API key).
