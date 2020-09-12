Object.defineProperty(exports, '__esModule', {
    value: true,
});

exports.default = (function() {
    const { transform } = document.documentElement.style;

    if (typeof transform === 'string') {
        return 'transform';
    }
    return 'WebkitTransform';
})();
