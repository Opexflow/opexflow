Object.defineProperty(exports, '__esModule', {
    value: true,
});
let _arguments = {};

exports.default = function(func, wait, immediate) {
    _arguments = arguments;
    let timeout = void 0;
    return function() {
        const context = undefined;
        let args = _arguments;
        const later = function later() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};
