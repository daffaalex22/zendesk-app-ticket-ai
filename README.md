# App name

A small Zendesk app scaffold for quick prototyping and demos. This project shows a minimal Zendesk iframe app using static HTML, CSS and JavaScript and includes translations and static assets.

## 🚀 Quick overview

- Languages: [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML), [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS), [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript), [JSON](https://www.json.org/json-en.html)
- Frameworks / tools: [Zendesk App Framework (ZAF)](https://developer.zendesk.com/apps/docs/apps-v2), [Zendesk CLI (`zcli`)](https://developer.zendesk.com/apps/docs/zcli/getting-started)
- Purpose: Simple iframe-based Zendesk app (static assets in `assets/`)

## 🧾 What this repository contains

- `manifest.json` — Zendesk app manifest and metadata
- `assets/` — HTML, JS, CSS and images used by the iframe
- `zcli.apps.config.json` — zcli configuration used for deploy/dev
- `README.md` — this file

## 🎯 Features

- Minimal static Zendesk iframe app
- Translation support via `translations/` JSON files
- Ready for local development with `zcli` and easy deployment

## 📦 Languages & Frameworks

- Languages: [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML), [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS), [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript), [JSON](https://www.json.org/json-en.html)
- Tools / Frameworks:
	- [Zendesk App Framework (ZAF)](https://developer.zendesk.com/apps/docs/apps-v2) — app runs inside Zendesk via an iframe
	- [Zendesk CLI (`zcli`)](https://developer.zendesk.com/apps/docs/zcli/getting-started) — local development and deployment tools

## 🌐 Deployment URL

Replace the placeholder below with your production app URL after deployment:

Deployment URL: https://your-deployment.example.com/your-zendesk-app

If you deploy with Zendesk's app hosting or a custom host, update the URL and the `iframe` entry in `manifest.json` accordingly.

## ▶️ How to run locally (development)

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
cd d:\Programming\zendesk-basic-app\hello-world
zcli apps:server
```

This command will start a local dev server and give you a URL to install the dev app into your Zendesk account (follow the prompts from `zcli`).

Deploy the app using `zcli`:

```powershell
zcli apps:deploy
```

See `zcli.apps.config.json` for environment-specific settings used during deploy.

## 🔧 Project structure (short)

- `assets/iframe.html` — main iframe HTML the app loads
- `assets/script.js` — app JavaScript logic (if present)
- `assets/styles.css` — app styling
- `translations/en.json` — English translations
- `manifest.json` — app metadata and requirements

