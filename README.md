# Muse AI Auto-Allow

A lightweight Chrome extension that automatically clicks selected **Allow** buttons on [Muse.ai](https://muse.ai/). Includes a simple popup interface, enable/disable controls, optional sound notifications, and a click counter.

## ✨ Features

- **Automatic Allow Clicking** — Detects and clicks supported Allow buttons on Muse.ai pages.
- **Enable/Disable Toggle** — Easily pause or resume automatic clicking.
- **Sound Notifications** — Enable or mute audio feedback.
- **Click Counter** — Tracks the number of automatic clicks recorded by the extension.
- **Reset Counter** — Clear the click counter whenever needed.
- **Test Sound** — Test audio feedback directly from the popup.
- **Manifest V3** — Uses the modern Chrome extension architecture.
- **Lightweight** — Built with standard JavaScript, HTML, and CSS without external libraries.

## 📸 Overview

Muse AI Auto-Allow is designed to simplify repetitive approval interactions on Muse.ai by automatically handling supported Allow buttons while providing controls to manage the behavior.

> **Important:** Automatic clicking can approve prompts without manual review. Always understand what you are approving before enabling this extension.

## 🛠️ Installation

### Install in Google Chrome

1. Download or clone this repository.
2. Extract the downloaded ZIP file if necessary.
3. Open Google Chrome and navigate to `chrome://extensions`.
4. Enable **Developer mode**.
5. Click **Load unpacked**.
6. Select the project folder containing `manifest.json`.
7. Open or refresh a Muse.ai page.
8. Click the extension icon to configure its settings.

### Install in Microsoft Edge

1. Open `edge://extensions`.
2. Enable **Developer mode**.
3. Click **Load unpacked**.
4. Select the project folder containing `manifest.json`.

## 🚀 How to Use

1. Open a supported page on Muse.ai.
2. Click the Muse AI Auto-Allow extension icon.
3. Enable **Enable Extension** to activate automatic clicking.
4. Enable or disable **Play Sound** according to your preference.
5. Use **Test Sound** to check audio feedback.
6. Monitor the click counter to see how many clicks the extension has recorded.
7. Use **Clear Count** to reset the counter.

To stop automatic clicking, turn off the extension's enable toggle or disable the extension through your browser's extensions page.

## ⚙️ How It Works

The extension's content script monitors the page for supported buttons using DOM observation.

It checks for:

- Buttons with the attribute `data-hatch-approval-primary-action="true"`.
- Buttons whose visible text matches `Allow` or `Allow all once`, ignoring capitalization.

When the extension is enabled and a matching button is detected, it attempts to click the button, updates the counter, and optionally plays a short sound.

A cooldown helps prevent repeated clicks in quick succession.

**Note:** Detection depends on Muse.ai's current page structure. Changes to the website may affect functionality.

## 📁 Project Structure

```text
muse-auto-allow/
├── manifest.json
├── popup.html
├── popup.js
├── content.js
├── README.md
├── LICENSE
├── PRIVACY.md
├── SECURITY.md
├── CONTRIBUTING.md
├── CHANGELOG.md
└── .gitignore
```

| File | Description |
|---|---|
| `manifest.json` | Extension metadata, permissions, and configuration |
| `popup.html` | Popup interface and styling |
| `popup.js` | Popup controls, settings, sound test, and counter display |
| `content.js` | Button detection, automatic clicking, and sound feedback |
| `README.md` | Project documentation |
| `LICENSE` | Open-source license |
| `PRIVACY.md` | Privacy and data-handling information |
| `SECURITY.md` | Security reporting guidelines |
| `CONTRIBUTING.md` | Contribution guidelines |
| `CHANGELOG.md` | Project version history |

## 🔐 Permissions and Privacy

The extension uses Chrome's local extension storage to save settings and the click counter.

- **Storage:** Saves the enabled state, sound preference, and click counter locally.
- **Website access:** Runs on pages matching the configured Muse.ai domain pattern.
- **External services:** The supplied source code does not include analytics or remote data-collection services.
- **Credentials:** The extension does not request your Muse.ai password.

The extension interacts with page content on matching Muse.ai pages to detect and click supported buttons.

For additional details, see [PRIVACY.md](PRIVACY.md).

## 🧪 Development

This project uses plain JavaScript, HTML, and CSS. No package manager, compilation, or build step is required.

To make changes:

1. Edit the relevant source files.
2. Open `chrome://extensions`.
3. Click **Reload** on the extension.
4. Refresh the Muse.ai tab.
5. Test the changed functionality.

Test the enable/disable toggle, button detection, sound settings, and counter behavior before relying on a new version.

## 🐛 Troubleshooting

### The extension does not click buttons

- Ensure the extension is enabled.
- Refresh the Muse.ai page.
- Check whether the button text or HTML attributes have changed.
- Check the browser developer console for JavaScript errors.

### The counter does not increase

- The counter updates when the script attempts a matching automatic click.
- Reopen the popup to view the latest displayed value.
- Confirm that a supported button was detected.

### Sound notifications are not working

- Ensure **Play Sound** is enabled.
- Use **Test Sound** in the popup.
- Check your browser audio settings and system volume.

### How do I stop automatic clicking?

Turn off **Enable Extension** in the popup or disable the extension in your browser settings.

## ⚠️ Limitations

- Button detection depends on Muse.ai's current interface.
- The extension may require updates if the website changes.
- The click counter does not confirm that Muse.ai accepted or completed an action.
- Browser audio policies may affect sound playback.
- The project has not been independently security-audited.
- Automated test coverage is not currently included.

## 🤝 Contributing

Contributions, bug reports, and suggestions are welcome.

1. Fork the repository.
2. Create a feature branch.
3. Make your changes.
4. Test the extension locally.
5. Update the documentation when necessary.
6. Submit a pull request describing your changes.

Please review [CONTRIBUTING.md](CONTRIBUTING.md) before contributing. Report security vulnerabilities according to [SECURITY.md](SECURITY.md).

## 📄 License

This project is released under the [MIT License](LICENSE).

## ⚖️ Disclaimer

Muse AI Auto-Allow is an independent community project and is not affiliated with, endorsed by, or officially associated with Muse.ai.

The software is provided "as is", without warranties of any kind. You are responsible for reviewing approval prompts, complying with applicable terms and policies, and understanding the consequences of enabling automatic actions.

**Use at your own risk.**
