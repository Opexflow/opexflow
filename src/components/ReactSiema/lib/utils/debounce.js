

Object.defineProperty(exports, "__esModule", {
    value: true
});
 var _arguments = {}

exports.default = function (func, wait, immediate) {
    _arguments = arguments ;
    var timeout = void 0;
    return function () {
        var context = undefined, args = _arguments;
        var later = function later() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};