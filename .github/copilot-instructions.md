# Copilot Instructions for AI Agents

## Project Overview
This is a basic Zendesk app scaffold. The project structure and conventions are designed for rapid prototyping and simple deployment. The app is likely intended to run as an iframe within Zendesk, with static assets and translations provided.

## Key Files & Directories
- `manifest.json`: Main app manifest; defines metadata, requirements, and entry points for Zendesk.
- `assets/iframe.html`: The main HTML file loaded as the app's iframe. All UI logic and scripts should be referenced or included here.
- `assets/`: Contains static assets (images, HTML) used by the app.
- `translations/en.json`: English translation strings for UI localization.
- `zcli.apps.config.json`: Configuration for Zendesk CLI (zcli) for local development and deployment.
- `README.md`: Project overview and contribution notes.

## Developer Workflows
- **Local Development:** Use Zendesk CLI (`zcli`) to serve and test the app locally. Example: `zcli apps:server`.
- **Deployment:** Deploy using `zcli apps:deploy` (see `zcli.apps.config.json` for environment details).
- **No build step** is present by default; static files are served as-is. Add a build process if you introduce JS/CSS preprocessors.

## Patterns & Conventions
- **All UI logic** should be placed in or referenced from `assets/iframe.html`.
- **Translations**: Use keys from `translations/en.json` for all user-facing text. Do not hardcode strings in HTML/JS.
- **Assets**: Reference images and other static files from the `assets/` directory using relative paths.
- **Minimal JS/CSS**: If adding scripts or styles, keep them modular and reference them from `iframe.html`.

## Integration Points
- **Zendesk App Framework**: The app is loaded as an iframe by Zendesk. All communication with Zendesk APIs should be done via the mechanisms provided in the Zendesk App Framework (ZAF).
- **zcli**: All local development and deployment is managed via the Zendesk CLI.

## Example: Adding a New Translation
1. Add the key-value pair to `translations/en.json`.
2. Reference the key in your UI code (HTML/JS) for dynamic translation.

## Example: Referencing an Asset
```html
<img src="assets/logo.png" alt="App Logo" />
```

## Additional Notes
- No custom linting, testing, or CI/CD is configured by default.
- For more advanced workflows, update this file and the README as needed.
