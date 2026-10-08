(function () {
    'use strict';

    /*
     * MANZELII - Gold Review Stars
     * Changes ONLY the color of review stars.
     * Does not add backgrounds, borders, or alter star shape.
     */

    const GOLD_FILTER =
        'brightness(0) saturate(100%) ' +
        'invert(68%) sepia(55%) saturate(900%) ' +
        'hue-rotate(5deg) brightness(88%) contrast(88%)';

    function colorReviewStars() {
        document.querySelectorAll('.ab-pd-star-filled').forEach(function (star) {

            // Remove the previous rectangular/background effect.
            star.style.removeProperty('background-color');
            star.style.removeProperty('background-image');

            // Preserve the original star shape and recolor only the icon.
            star.style.setProperty('filter', GOLD_FILTER, 'important');

            // Do not force fill/stroke/background colors that can change the shape.
            star.style.removeProperty('fill');
            star.style.removeProperty('stroke');
            star.style.removeProperty('color');

            // If the star contains an SVG, recolor its paths without changing geometry.
            const svg = star.querySelector('svg');

            if (svg) {
                svg.style.removeProperty('filter');
                svg.style.setProperty('fill', '#C9A227', 'important');
                svg.style.setProperty('color', '#C9A227', 'important');

                svg.querySelectorAll('path, polygon, use').forEach(function (el) {
                    el.style.setProperty('fill', '#C9A227', 'important');
                    el.style.removeProperty('stroke');
                });
            }
        });
    }

    colorReviewStars();
    window.addEventListener('load', colorReviewStars);

    // Handles reviews/products loaded dynamically.
    const observer = new MutationObserver(colorReviewStars);
    observer.observe(document.documentElement, {
        childList: true,
        subtree: true
    });
})();
