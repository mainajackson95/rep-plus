Firefox compatibility guide for rep+

What’s included
- manifest.firefox.json with browser_specific_settings for Gecko
- Background listener compatibility (initiator fallback)
- Multi-tab toggle that works without runtime permission APIs (persisted in storage)
- Build script to create a dist/firefox bundle

Prerequisites
- Firefox 109+ (for MV3 service worker)
- Storage permission is required (already declared)

Build steps (recommended)
1) Install Node.js 18+
2) Run: npm run build:firefox
3) Load the folder dist/firefox into Firefox:
   - Open about:debugging#/runtime/this-firefox
   - Click "Load Temporary Add-on…"
   - Select any file inside dist/firefox (Firefox auto-detects manifest.json)

Alternative: Manual quick test
- Copy this repo to another folder
- Rename manifest.firefox.json → manifest.json (overwriting the Chrome one)
- Load that folder via about:debugging → Load Temporary Add-on

Using the extension in Firefox
- Open DevTools (F12) on any tab
- Open the "Rep+" panel
- Multi‑tab capture button:
  - Firefox: The button acts as an enable/disable toggle, remembered via storage. It does not request/remove host permissions at runtime.
  - Chromium: The button requests/removes webRequest and <all_urls> at runtime.

Notes
- webRequest in Firefox: Request/response headers and request body are available; response body is not (same as Chromium).
- MV3 service workers: Supported in current Firefox. If it stops, a browser restart or reloading the extension reactivates it (typical service worker behavior).
- scripting permission: not used by this project in Firefox; the Firefox manifest omits it.

Publishing (optional)
- For AMO, update browser_specific_settings.gecko.id in manifest.firefox.json to your own ID or let AMO assign one.
- Consider using the web-ext tool for packaging/signing if you plan to distribute.
