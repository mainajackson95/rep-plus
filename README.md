Here's the optimized description for Firefox installation:

# rep+ (Firefox)

> Acknowledgements: This Firefox port builds upon the excellent Chrome DevTools extension rep by bscript: https://github.com/bscript/rep

rep+ is a lightweight Firefox DevTools extension inspired by Burp Suite's Repeater, now supercharged with AI. I often need to poke at a few requests without spinning up the full Burp stack, so I built this extension to keep my workflow fast, focused, and intelligent with integrated LLM support.

[![Watch Demo](https://img.shields.io/badge/Demo-Video-red?style=for-the-badge&logo=youtube)](https://video.twimg.com/amplify_video/1992382891196571648/pl/zE5-oOXgVua1ZBQn.m3u8?tag=14)

<p align="center">
  <!-- Firefox Supported -->
  <img src="https://img.shields.io/badge/Firefox-Supported-FF7139?logo=firefox&logoColor=white" alt="Firefox Supported">

  <!-- AppSec Tool -->
  <img src="https://img.shields.io/badge/AppSec-Tool-blueviolet" alt="AppSec Tool">

  <!-- Bug Bounty Friendly -->
  <img src="https://img.shields.io/badge/Bug%20Bounty-Friendly-orange" alt="Bug Bounty Friendly">

  <!-- Stars -->
  <a href="https://github.com/bscript/rep/stargazers">
    <img src="https://img.shields.io/github/stars/bscript/rep?style=social" alt="GitHub Stars">
  </a>

   <!-- Discord -->
  <a href="https://discord.gg/rMcKHSbG">
        <img src="https://img.shields.io/discord/1442955541293961429.svg?label=&logo=discord&logoColor=ffffff&color=7389D8&labelColor=6A7EC2" alt="Discord">
  </a>

  <!-- Sponsor -->
  <a href="https://github.com/sponsors/bscript">
    <img src="https://img.shields.io/badge/Sponsor-%F0%9F%92%96-ea4aaa?style=flat-square" alt="Sponsor">
  </a>
</p>

## Features (Same Powerful Toolkit)

- **No Proxy Setup**: Works directly in Firefox. No need to configure system proxies or install CA certificates like in Burp Suite.
- **Capture & Replay**: Captures every HTTP request you trigger while testing. Replay any request and freely manipulate the raw method, path, headers, or body to probe endpoints.
- **Multi-tab Capture**: Captures network requests from **all open tabs**, not just the inspected one.
- **Hierarchical Request Grouping**: Intelligent organization of captured requests with page-based and third-party domain grouping.
- **Filters & Regex**: Powerful search across URL, domain, headers, and body with Regex Mode.
- **Converters**: Right-click context menu for instant encoding/decoding (Base64, URL, JWT, Hex, UTF-8).
- **Screenshots**: Built-in screenshot tool for bug reports.
- **History & Navigation**: Undo/redo support and history navigation.
- **Starring**: Pin important requests or entire groups.
- **Bulk Replay**: Burp Suite Intruder-style attacks with four attack modes (Sniper, Battering Ram, Pitchfork, Cluster Bomb).
- **Unified Extractor**: Secret Scanner and Endpoint Extractor for JavaScript analysis.
- **Theme Support**: Auto-detects system theme with manual toggle.
- **AI Capabilities**: Integrated with Anthropic's Claude for request explanations, attack vector suggestions, and targeted text analysis.

## ⚠️ Firefox-Specific Notes

rep+ runs inside Firefox DevTools, so:

- Some headers may behave differently than in Chrome due to Firefox's security model
- Performance characteristics may vary slightly
- The extension uses Firefox's `devtools.panels` and `webRequest` APIs which are well-supported
- No raw TCP sockets (same limitation as Chrome)
- DevTools panel constraints are similar to Chrome

## Firefox Installation

### Method 1: Temporary Load (Development)

1. **Download the Extension**:
   - Clone the repository or download the latest release:
   ```bash
   git clone https://github.com/bscript/rep.git
   ```

2. **Open Firefox Debugging**:
   - Type `about:debugging` in the Firefox address bar
   - Click **"This Firefox"** in the left sidebar

3. **Load the Extension**:
   - Click **"Load Temporary Add-on..."**
   - Navigate to the `rep` folder and select any file (or the `manifest.json`)
   - The extension will now appear in your DevTools

### Method 2: Install from Release (Recommended)

1. **Download the Firefox Extension**:
   - Get the latest `.xpi` file from the [Releases page](https://github.com/bscript/rep/releases)

2. **Install in Firefox**:
   - Open Firefox and go to `about:addons`
   - Click the gear icon ⚙️ → **"Install Add-on From File..."**
   - Select the downloaded `.xpi` file
   - Confirm the installation when prompted

3. **Open DevTools**:
   - Press `F12` or right-click → **Inspect Element**
   - Look for the **rep+** tab in DevTools (you might need to click the `»` overflow menu)

### Method 3: Development Build

For contributors or those wanting the latest features:

1. **Clone and Build**:
   ```bash
   git clone https://github.com/bscript/rep.git
   cd rep
   npm install
   npm run build:firefox
   ```

2. **Load the Built Extension**:
   - Follow **Method 1** above, but load from the `dist-firefox/` directory

## Firefox Permissions

When installing, Firefox will request these permissions:
- **Access your data for all websites**: Required for capturing requests across tabs
- **Access browser tabs**: Needed for multi-tab capture functionality
- **Native messaging**: For potential future integration with external tools

**Privacy Note**: These permissions are only used for the extension's core functionality. No data is sent to external servers unless you explicitly use the AI features with your own API key.

## Troubleshooting Firefox Installation

If the extension doesn't appear in DevTools:

1. **Restart Firefox**: Sometimes required after first installation
2. **Check Extension Status**: Go to `about:addons` and ensure rep+ is enabled
3. **Verify DevTools**: Make sure DevTools is open (F12) and check the toolbar for the rep+ icon
4. **Clear Cache**: If issues persist, try clearing Firefox cache and restarting
5. **Check Console**: Open Browser Console (Ctrl+Shift+J) for any error messages

## Known Firefox Differences

- **Performance**: Firefox may handle large numbers of requests slightly differently
- **UI Rendering**: Minor visual differences due to browser rendering engines
- **API Support**: Full feature parity with Chrome, but some underlying APIs differ
- **Updates**: Firefox extensions update automatically through Mozilla Add-ons

## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=bscript/rep&type=date&legend=top-left)](https://www.star-history.com/#bscript/rep&type=date&legend=top-left)

## Found a Bug or Issue?

If you encounter any bugs, unexpected behavior, or have feature requests, please help me improve **rep+** by [opening an issue here](https://github.com/bscript/rep/issues).  
I'll do my best to address it as quickly as possible! 🙏

---
