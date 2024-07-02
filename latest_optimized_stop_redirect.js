// ==UserScript==
// @name        Optimized Stop Redirect
// @version     0.5
// @description Asks for confirmation before opening links, showing the target URL
// @match       *://*/*
// @grant       none
// @run-at      document-start
// ==/UserScript==

document.addEventListener('click', e => {
    const url = e.target.closest('a')?.href;
    if (url && !confirm(`Go to:\n${url}?`)) e.preventDefault();
}, true);

