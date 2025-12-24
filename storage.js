const CONFIG = {
    ACCESS_MINUTES: 5,
    SESSION_KEY: 'mindful_unlock_time',
    HISTORY_KEY: 'mindful_history'
};

const MindfulStorage = {
    isSessionActive: () => {
        const unlockTime = sessionStorage.getItem(CONFIG.SESSION_KEY);
        if (!unlockTime) return false;

        const elapsedMinutes = (Date.now() - parseInt(unlockTime, 10)) / 1000 / 60;
        
        if (elapsedMinutes < CONFIG.ACCESS_MINUTES) {
            return true;
        } else {
            sessionStorage.removeItem(CONFIG.SESSION_KEY);
            return false;
        }
    },

    startSession: (reason, brand) => {
        const now = Date.now();
        
        sessionStorage.setItem(CONFIG.SESSION_KEY, now);

        const history = MindfulStorage.getHistory();
        history.push({
            reason: reason,
            time: now,
            brand: brand
        });
        localStorage.setItem(CONFIG.HISTORY_KEY, JSON.stringify(history));
    },

    getHistory: () => {
        return JSON.parse(localStorage.getItem(CONFIG.HISTORY_KEY) || '[]');
    },

    formatDate: (timestamp) => {
        const d = new Date(timestamp);
        return d.toLocaleDateString() + ' ' + d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
};