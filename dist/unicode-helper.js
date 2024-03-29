"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.escapeSpecialChar = void 0;
function escapeSpecialChar(string) {
    let array = [];
    for (const i of string) {
        if (/[\u0020-\u007E]/.test(i)) {
            array.push(i);
        }
        else {
            const low = _toEscaped(i.charCodeAt(0));
            const high = _toEscaped(i.charCodeAt(1));
            if (low)
                array.push(low);
            if (high)
                array.push(high);
        }
    }
    let str2 = '';
    for (const i of array) {
        str2 += i;
    }
    return str2;
}
exports.escapeSpecialChar = escapeSpecialChar;
function _toEscaped(num) {
    if (!isNaN(num)) {
        let str = num.toString(16);
        while (str.length < 4) {
            str = '0' + str;
        }
        return '\\u' + str;
    }
    return undefined;
}
