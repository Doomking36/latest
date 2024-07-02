// ==UserScript==
// @name        Ultra-Enhanced Stop Redirect
// @version     0.7
// @description Securely confirms links with sanitized URL and improved performance
// @match       *://*/*
// @grant       none
// @run-at      document-start
// ==/UserScript==

(function() {
    'use strict';

    const sanitizeMap = {
        '<': '&lt;',
        '>': '&gt;',
        '&': '&amp;',
        "'": '&#39;',
        '"': '&quot;'
    };

    const sanitizeUrl = (() => {
        const regex = /[<>&'"]/g;
        return (url) => decodeURIComponent(url).replace(regex, char => sanitizeMap[char] || char);
    })();

    const handleClick = (e) => {
        const link = e.target.closest('a');
        if (link?.href) {
            e.preventDefault();
            const safeUrl = sanitizeUrl(link.href);
            if (confirm(`Go to:\n${safeUrl}?`)) {
                const newTab = window.open();
                if (newTab) {
                    newTab.opener = null;
                    newTab.location = link.href;
                } else {
                    console.warn('Popup blocked. Unable to open link.');
                }
            }
        }
    };

    document.addEventListener('click', handleClick, { capture: true, passive: false });
})();

