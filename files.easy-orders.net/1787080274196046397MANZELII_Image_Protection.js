/*
 * MANZELII Image Protection
 * منع السحب والحفظ السهل للصور بدون تعطيل الموقع بالكامل.
 */
(function () {
    'use strict';

    function protectImages() {
        document.querySelectorAll('img').forEach(function (img) {
            img.setAttribute('draggable', 'false');
            img.setAttribute('oncontextmenu', 'return false');
            img.setAttribute('ondragstart', 'return false');
        });
    }

    document.addEventListener('dragstart', function (event) {
        if (event.target && event.target.closest('img')) {
            event.preventDefault();
        }
    }, true);

    document.addEventListener('contextmenu', function (event) {
        if (event.target && event.target.closest('img')) {
            event.preventDefault();
        }
    }, true);

    document.addEventListener('mousedown', function (event) {
        if (event.target && event.target.closest('img')) {
            event.target.setAttribute('draggable', 'false');
        }
    }, true);

    const style = document.createElement('style');
    style.id = 'manzelii-image-protection';
    style.textContent = `
        img {
            -webkit-user-drag: none !important;
            user-drag: none !important;
            -webkit-user-select: none !important;
            user-select: none !important;
        }
    `;

    if (!document.getElementById('manzelii-image-protection')) {
        document.head.appendChild(style);
    }

    protectImages();

    const observer = new MutationObserver(function () {
        protectImages();
    });

    observer.observe(document.documentElement, {
        childList: true,
        subtree: true
    });
})();
