document.addEventListener('DOMContentLoaded', () => {
    const extToggle = document.getElementById('extToggle');
    const soundToggle = document.getElementById('soundToggle');
    const clickCount = document.getElementById('clickCount');
    const resetBtn = document.getElementById('resetBtn');
    const testSoundBtn = document.getElementById('testSoundBtn');

    // Load saved settings
    chrome.storage.local.get(['isActive', 'playAudio', 'counter'], (data) => {
        extToggle.checked = data.isActive !== false; 
        soundToggle.checked = data.playAudio !== false; 
        clickCount.textContent = data.counter || 0;
    });

    // Save settings when toggled
    extToggle.addEventListener('change', () => {
        chrome.storage.local.set({ isActive: extToggle.checked });
    });

    soundToggle.addEventListener('change', () => {
        chrome.storage.local.set({ playAudio: soundToggle.checked });
    });

    // Reset the counter
    resetBtn.addEventListener('click', () => {
        chrome.storage.local.set({ counter: 0 }, () => {
            clickCount.textContent = '0';
        });
    });

    // Test Sound Audio Generator (Matches the content.js beep)
    function playBeep() {
        try {
            const ctx = new (window.AudioContext || window.webkitAudioContext)();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.type = 'sine';
            osc.frequency.setValueAtTime(880, ctx.currentTime); // Pitch
            gain.gain.setValueAtTime(0.05, ctx.currentTime); // Volume
            osc.start();
            gain.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + 0.1);
            osc.stop(ctx.currentTime + 0.1);
        } catch (e) {
            console.error("Audio play failed", e);
        }
    }

    testSoundBtn.addEventListener('click', playBeep);

    // Update the counter live while the popup is open
    chrome.storage.onChanged.addListener((changes) => {
        if (changes.counter) {
            clickCount.textContent = changes.counter.newValue;
        }
    });
});