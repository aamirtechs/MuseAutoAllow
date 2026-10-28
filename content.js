let isActive = true;
let playAudio = true;
let lastClickTime = 0; // Cooldown timer to prevent double-clicks

// 1. Sync settings from the Popup menu
chrome.storage.local.get(['isActive', 'playAudio'], (data) => {
    if (data.isActive !== undefined) isActive = data.isActive;
    if (data.playAudio !== undefined) playAudio = data.playAudio;
});

chrome.storage.onChanged.addListener((changes) => {
    if (changes.isActive) isActive = changes.isActive.newValue;
    if (changes.playAudio) playAudio = changes.playAudio.newValue;
});

// 2. Audio Generator (Clean beep using the browser's Web Audio API)
function playBeep() {
    if (!playAudio) return;
    try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = 'sine';
        osc.frequency.setValueAtTime(880, ctx.currentTime); // Pitch of the beep
        gain.gain.setValueAtTime(0.05, ctx.currentTime); // Volume
        osc.start();
        gain.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + 0.1);
        osc.stop(ctx.currentTime + 0.1);
    } catch (e) {
        console.error("Audio play failed", e);
    }
}

// 3. Counter Updater
function incrementCounter() {
    chrome.storage.local.get(['counter'], (data) => {
        const newCount = (data.counter || 0) + 1;
        chrome.storage.local.set({ counter: newCount });
    });
}

// 4. Execution Logic
function processClick(button) {
    // Prevent double-clicking within 1 second
    if (Date.now() - lastClickTime < 1000) return; 
    lastClickTime = Date.now();

    button.click();
    incrementCounter();
    playBeep();
    console.log('Auto-Allow Extension: Action executed.');
}

function clickAllowButtons() {
    // Stop immediately if you toggled the extension off
    if (!isActive) return;

    // Primary Check: System Approval Button
    const systemAllowButton = document.querySelector('button[data-hatch-approval-primary-action="true"]');
    if (systemAllowButton) {
        processClick(systemAllowButton);
        return;
    }

    // Fallback Check: Text matching
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        const buttonText = button.textContent.trim().toLowerCase();
        if (buttonText === 'allow' || buttonText === 'allow all once') {
            processClick(button);
        }
    });
}

// 5. Watch the page for changes
const observer = new MutationObserver(() => {
    clickAllowButtons();
});

observer.observe(document.body, { childList: true, subtree: true });
clickAllowButtons();