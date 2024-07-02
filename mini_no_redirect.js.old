// ==UserScript==
// @name	Stop Redirect
// @version	0.1
// @description	Prevents redirects and opens links in new tabs w/o permission
// @match	*://*/*
// @grant	none
// ==/UserScript==

(function() {
    'use strict';

    // Block unload events at the very beginning
    window.addEventListener('beforeunload', function(event) {
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();
        event.returnValue = '';
    });

    function displayURL(url) {
        const message = 'The website is attempting to redirect to:\n\n' + url + '\n\nDo you want to proceed?';
        return window.confirm(message);
    }

    function setupEventListeners() {
        window.addEventListener('click', function(event) {
            const link = event.target.closest('a');
            if (link && link.href) {
                event.preventDefault();
                event.stopPropagation();
                event.stopImmediatePropagation();
                if (displayURL(link.href)) {
                    window.location.href = link.href;
                }
            }
        }, true);
    }

    setupEventListeners();
})();
