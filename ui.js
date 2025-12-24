const MindfulUI = {
    brands: {
        x: {
            class: 'theme-x',
            logo: `<svg viewBox="0 0 24 24" aria-hidden="true" style="width: 50px; height: 50px;"><g><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></g></svg>`
        },
        linkedin: {
            class: 'theme-linkedin',
            logo: `<svg height="72" viewBox="0 0 72 72" width="72" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><path d="M8,72 L64,72 C68.418278,72 72,68.418278 72,64 L72,8 C72,3.581722 68.418278,-8.11624501e-16 64,0 L8,0 C3.581722,8.11624501e-16 -5.41083001e-16,3.581722 0,8 L0,64 C5.41083001e-16,68.418278 3.581722,72 8,72 Z" fill="#007EBB"/><path d="M62,62 L51.315625,62 L51.315625,43.8021149 C51.315625,38.8127542 49.4197917,36.0245323 45.4707031,36.0245323 C41.1746094,36.0245323 38.9300781,38.9261103 38.9300781,43.8021149 L38.9300781,62 L28.6333333,62 L28.6333333,27.3333333 L38.9300781,27.3333333 L38.9300781,32.0029283 C38.9300781,32.0029283 42.0260417,26.2742151 49.3825521,26.2742151 C56.7356771,26.2742151 62,30.7644705 62,40.051212 L62,62 Z M16.349349,22.7940133 C12.8420573,22.7940133 10,19.9296567 10,16.3970067 C10,12.8643566 12.8420573,10 16.349349,10 C19.8566406,10 22.6970052,12.8643566 22.6970052,16.3970067 C22.6970052,19.9296567 19.8566406,22.7940133 16.349349,22.7940133 Z M11.0325521,62 L21.769401,62 L21.769401,27.3333333 L11.0325521,27.3333333 L11.0325521,62 Z" fill="#FFF"/></g></svg>`
        }
    },

    getHTML: (brandKey) => {
        const brand = MindfulUI.brands[brandKey];
        return `
            <div class="mindful-content">
                <div class="mindful-logo">${brand.logo}</div>
                <div class="mindful-question">Type your reason</div>
                <div class="mindful-input-wrapper">
                    <input type="text" class="mindful-input" placeholder="What is your intention?" autocomplete="off">
                </div>
                <div class="mindful-hint">Press Enter to start ${CONFIG.ACCESS_MINUTES} minute session</div>
                
                <div class="mindful-history-container" id="history-list"></div>
                <button class="mindful-history-btn">View Previous Reasons</button>
            </div>
        `;
    },

    renderHistoryItems: (history) => {
        if (!history || history.length === 0) {
            return '<div class="mindful-history-item" style="justify-content:center">No history yet</div>';
        }
        return history.slice(-10).reverse().map(item => `
            <div class="mindful-history-item">
                <span>${item.reason}</span>
                <span class="date">${MindfulStorage.formatDate(item.time)}</span>
            </div>
        `).join('');
    }
};