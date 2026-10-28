
# Google Flow Image Helper

A lightweight Chrome extension that adds keyboard shortcuts for working with images in Google Flow.

Copy an image's name while hovering over it, trigger the like action with a keyboard shortcut, or activate the download button without manually clicking the corresponding UI controls.

## Features

- **Copy Image Name:** Hover over an image and press `Alt` to copy its detected name to the clipboard.
- **Quick Like:** Press `]` to trigger the configured like button.
- **Quick Download:** Press `\` to trigger the configured download button.
- **Lightweight:** Uses a single content script without a background service worker or popup interface.
- **Manifest V3:** Built using the Chrome Extension Manifest V3 format.
- **Google Flow Only:** Configured to run on `https://flow.google.com/*`.

## Keyboard Shortcuts

| Shortcut | Action |
|---|---|
| `Alt` | Copy the name of the currently hovered image |
| `]` | Click the configured like button |
| `\` | Click the configured download button |

**Note:** The like and download shortcuts use specific CSS selectors. Their behavior depends on the Google Flow interface matching those selectors.

## Project Structure

```text
google-flow-image-helper/
├── manifest.json
├── content.js
└── icon.png
```

### File Overview

- `manifest.json` — Defines extension metadata, permissions, the icon, and the target website.
- `content.js` — Detects the hovered image, handles keyboard shortcuts, copies image names, and triggers UI buttons.
- `icon.png` — Supplies the extension icon.

## Requirements

- Google Chrome or a compatible Chromium-based browser.
- Access to [Google Flow](https://flow.google.com/).

## Installation

1. Download or clone this repository.
2. Extract the ZIP archive if necessary.
3. Open `chrome://extensions/` in Chrome.
4. Enable **Developer mode**.
5. Click **Load unpacked**.
6. Select the extracted project folder containing `manifest.json`.
7. Open or reload Google Flow.

The content script runs automatically on matching Google Flow pages.

## Usage

### Copy an Image Name

1. Open Google Flow.
2. Move your pointer over an image.
3. Press `Alt`.
4. The extension attempts to find the image name in the surrounding page structure and copy it to the clipboard.

If the name cannot be found, the extension logs a message in the browser console.

### Like an Image

1. Open the relevant Google Flow interface.
2. Press `]`.
3. The extension attempts to locate and click one of its configured like-button selectors.

### Download an Image

1. Open the relevant Google Flow interface.
2. Press `\`.
3. The extension attempts to locate and click its configured download button.

## How It Works

### Image Detection

The content script listens for pointer events and stores the image element associated with the current pointer target.

When `Alt` is pressed, it searches for the image name using a DOM traversal based on the hovered image's parent and adjacent sibling elements.

The detected text is then copied using the Clipboard API.

### Like and Download Actions

The `]` shortcut searches for one of two configured CSS selectors and clicks the first matching element.

The `\` shortcut searches for a configured download-button selector and clicks it when found.

These shortcuts trigger existing interface controls; they do not implement separate image-liking or image-download systems.

### Initialization

The script uses a page-level initialization flag to avoid attaching duplicate event listeners if the script is initialized more than once in the same page context.

## Permissions

The extension declares these permissions in `manifest.json`:

- `activeTab`
- `clipboardWrite`

It also declares a content script that runs on `https://flow.google.com/*` at `document_idle`.

## Troubleshooting

### Alt Does Not Copy the Image Name

- Make sure the pointer is over an image.
- Check whether the image name is present in the page structure expected by `content.js`.
- Open Chrome DevTools and inspect the console for messages such as `Image name not found` or clipboard errors.
- Confirm that Google Flow has not changed the relevant DOM structure.

### The Like Shortcut Does Nothing

The extension relies on hard-coded CSS selectors. If Google Flow changes its interface, the configured selectors may no longer identify the like button.

### The Download Shortcut Does Nothing

Inspect the download button in Chrome DevTools and compare its current DOM structure with the selector in `content.js`.

### Clipboard Copy Fails

Clipboard access may depend on the page context and browser security restrictions. Check the console for the reported error.

## Limitations

- The extension is designed specifically for Google Flow.
- The image-name lookup depends on the website's current DOM structure.
- Like and download actions rely on hard-coded CSS selectors.
- The extension does not include a popup, options page, or configurable keyboard shortcuts.
- The extension triggers the website's existing download control; it does not implement a separate download manager.
- Future Google Flow interface changes may require updates to the selectors.

## Contributing

Contributions and bug reports are welcome. When updating the extension, test all three shortcuts against the current Google Flow interface.

## License

No license file is included in the supplied project.

Add a `LICENSE` file if you intend to define permissions for reuse, modification, and redistribution.
