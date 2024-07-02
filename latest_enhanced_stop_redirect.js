// ==UserScript==
// @name        Enhanced Stop Redirect
// @version     0.6
// @description Securely confirms links, shows sanitized URL
// @match       *://*/*
// @grant       none
// @run-at      document-start
// ==/UserScript==

(function() {
    'use strict';

    const sanitizeUrl = (url) => {
        const decoded = decodeURIComponent(url);
        return decoded.replace(/[<>&'"]/g, (char) => {
            switch (char) {
                case '<': return '&lt;';
                case '>': return '&gt;';
                case '&': return '&amp;';
                case "'": return '&#39;';
                case '"': return '&quot;';
            }
        });
    };

    document.addEventListener('click', (e) => {
        const link = e.target.closest('a');
        if (link?.href) {
            e.preventDefault();
            const safeUrl = sanitizeUrl(link.href);
            if (confirm(`Go to:\n${safeUrl}?`)) {
                window.open(link.href, '_blank', 'noopener,noreferrer');
            }
        }
    }, true);
})();

