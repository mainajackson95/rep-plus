// Multi-tab Capture Module
import { addRequest } from './state.js';
import { renderRequestItem } from './ui.js';

export function initMultiTabCapture() {
    const multiTabBtn = document.getElementById('multi-tab-btn');
    let backgroundPort = null;
    let isConnecting = false;

    function updateMultiTabIcon(enabled) {
        if (!multiTabBtn) return;
        if (enabled) {
            multiTabBtn.classList.add('active');
            multiTabBtn.title = "Multi-tab Capture Enabled (Click to disable)";
            multiTabBtn.style.color = 'var(--accent-color)';
        } else {
            multiTabBtn.classList.remove('active');
            multiTabBtn.title = "Enable Multi-tab Capture";
            multiTabBtn.style.color = '';
        }
    }

    function connectToBackground() {
        if (backgroundPort || isConnecting) return;
        isConnecting = true;

        try {
            backgroundPort = chrome.runtime.connect({ name: "rep-panel" });
            console.log("Connected to background service worker");
            isConnecting = false;

            backgroundPort.onMessage.addListener((msg) => {
                if (msg.type === 'captured_request') {
                    const req = msg.data;

                    // Skip requests from the current inspected tab (handled by setupNetworkListener)
                    if (req.tabId === chrome.devtools.inspectedWindow.tabId) return;

                    // Convert to HAR-like format
                    const harEntry = {
                        request: {
                            method: req.method,
                            url: req.url,
                            headers: req.requestHeaders || [],
                            postData: req.requestBody ? { text: req.requestBody } : undefined
                        },
                        response: {
                            status: req.statusCode,
                            statusText: req.statusLine || '',
                            headers: req.responseHeaders || [],
                            content: {
                                mimeType: (req.responseHeaders || []).find(h => h.name.toLowerCase() === 'content-type')?.value || '',
                                text: '' // Response body not available for background requests
                            }
                        },
                        capturedAt: req.timeStamp,
                        fromOtherTab: true, // Flag to indicate source
                        pageUrl: req.initiator || req.url // Use initiator as pageUrl for grouping
                    };

                    // Filter static resources
                    const url = req.url.toLowerCase();
                    const staticExtensions = [
                        '.css', '.jpg', '.jpeg', '.png', '.gif', '.svg', '.webp', '.ico',
                        '.woff', '.woff2', '.ttf', '.eot', '.otf',
                        '.mp4', '.webm', '.mp3', '.wav',
                        '.pdf'
                    ];

                    const isStatic = staticExtensions.some(ext => url.endsWith(ext) || url.includes(ext + '?'));
                    if (isStatic) return;

                    const index = addRequest(harEntry);
                    renderRequestItem(harEntry, index);
                }
            });

            backgroundPort.onDisconnect.addListener(() => {
                console.log("Disconnected from background");
                backgroundPort = null;
                isConnecting = false;

                // Retry if toggle remains enabled in storage
                chrome.storage.local.get({ multiTabEnabled: true }, (data) => {
                    if (data.multiTabEnabled) {
                        console.log("Retrying connection in 2s...");
                        setTimeout(connectToBackground, 2000);
                    } else {
                        updateMultiTabIcon(false);
                    }
                });
            });

        } catch (e) {
            console.error('Failed to connect to background script:', e);
            backgroundPort = null;
            isConnecting = false;
            setTimeout(connectToBackground, 2000);
        }
    }

    function disconnectBackground() {
        if (backgroundPort) {
            backgroundPort.disconnect();
            backgroundPort = null;
        }
    }

    // Firefox: Use storage-based toggle, not runtime permissions
    chrome.storage.local.get({ multiTabEnabled: true }, (data) => {
        if (data.multiTabEnabled) {
            updateMultiTabIcon(true);
            connectToBackground();
        } else {
            updateMultiTabIcon(false);
        }
    });

    // Toggle button handler (storage-based)
    if (multiTabBtn) {
        multiTabBtn.addEventListener('click', () => {
            chrome.storage.local.get({ multiTabEnabled: true }, (data) => {
                const next = !data.multiTabEnabled;
                chrome.storage.local.set({ multiTabEnabled: next }, () => {
                    if (next) {
                        updateMultiTabIcon(true);
                        connectToBackground();
                    } else {
                        updateMultiTabIcon(false);
                        disconnectBackground();
                    }
                });
            });
        });
    }
}
