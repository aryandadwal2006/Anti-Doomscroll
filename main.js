function init() {
    const hostname = window.location.hostname;
    let brandKey = '';
    
    if (hostname.includes('x.com') || hostname.includes('twitter.com')) brandKey = 'x';
    else if (hostname.includes('linkedin.com')) brandKey = 'linkedin';
    else return;

    if (MindfulStorage.isSessionActive()) {
        return;
    }

    const injectOverlay = () => {
        if (document.getElementById('mindful-overlay')) return;

        const overlay = document.createElement('div');
        overlay.id = 'mindful-overlay';
        overlay.classList.add(MindfulUI.brands[brandKey].class);
        overlay.innerHTML = MindfulUI.getHTML(brandKey);

        document.body.appendChild(overlay);
        document.body.style.overflow = 'hidden';

        setupInteractions(overlay, brandKey);
    };

    if (document.body) {
        injectOverlay();
    } else {
        new MutationObserver((_, obs) => {
            if (document.body) {
                injectOverlay();
                obs.disconnect();
            }
        }).observe(document.documentElement, { childList: true });
    }
}

function setupInteractions(overlay, brandKey) {
    const input = overlay.querySelector('.mindful-input');
    const hint = overlay.querySelector('.mindful-hint');
    const historyBtn = overlay.querySelector('.mindful-history-btn');
    const historyList = overlay.querySelector('#history-list');
    let focusInterval;

    const enforceFocus = () => {
        input.focus();
        focusInterval = setInterval(() => input.focus(), 50);
    };
    enforceFocus();

    historyBtn.addEventListener('click', () => {
        if (historyList.style.display === 'block') {
            historyList.style.display = 'none';
            historyBtn.textContent = 'View Previous Reasons';
            enforceFocus();
        } else {
            clearInterval(focusInterval);
            const history = MindfulStorage.getHistory();
            historyList.innerHTML = MindfulUI.renderHistoryItems(history);
            historyList.style.display = 'block';
            historyBtn.textContent = 'Close History';
        }
    });

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const reason = input.value.trim();
            
            if (reason.length > 0) {
                input.style.borderColor = '#4CAF50';
                hint.textContent = `Unlocked for ${CONFIG.ACCESS_MINUTES} Minutes`;
                hint.style.color = '#4CAF50';
                
                MindfulStorage.startSession(reason, brandKey);

                clearInterval(focusInterval);
                setTimeout(() => {
                    overlay.style.transition = 'opacity 0.5s ease';
                    overlay.style.opacity = '0';
                    setTimeout(() => {
                        overlay.remove();
                        document.body.style.overflow = '';
                    }, 500);
                }, 600);
            } else {
                input.style.borderColor = '#ff4444';
                setTimeout(() => {
                    input.style.borderColor = brandKey === 'x' ? '#333' : '#0a66c2';
                }, 300);
            }
        }
    });
}

init();