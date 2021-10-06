"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseFmc = void 0;
const color_1 = require("./color");
const decoration_1 = require("./decoration");
const span_1 = require("./span");
const str_1 = require("./str");
const fmc2DecorationMap = Object.fromEntries(Object.entries(decoration_1.decoration2FmcMap).map(([a, b]) => [b, parseInt(a)]));
const ColorMap = (() => {
    const premapColors = { ...color_1.ColorsBE }; //TODO:
    delete premapColors.empty;
    return Object.fromEntries(Object.entries(premapColors).map(([key, value]) => [value.fmc, key]));
})();
function _isArrayAllFalse(array) {
    for (const bool of array) {
        if (bool === true)
            return false;
    }
    return true;
}
function parseFmc(fmc) {
    if (fmc == '')
        return new str_1.RichString(new span_1.RichSpan(''));
    let waitForFormatCode = false;
    let waitForNextSpan = false;
    let content = '';
    let decorations = decoration_1.getEmptyDecoration();
    let color = color_1.Colors.empty;
    const spans = new str_1.RichString();
    const pushSpan = () => {
        waitForNextSpan = false;
        const span = {
            content, color
        };
        if (!_isArrayAllFalse(decorations))
            span.decorations = [...decorations];
        spans.push(new span_1.RichSpan(span));
        content = '';
    };
    for (const char of fmc) {
        if (char === '§') {
            if (waitForFormatCode) {
                waitForFormatCode = false;
                content += '§§';
                continue;
            }
            else {
                waitForFormatCode = true;
                continue;
            }
        }
        else {
            if (waitForFormatCode) {
                if (char === 'r') {
                    if (waitForNextSpan)
                        pushSpan();
                    color = color_1.Colors.empty;
                    decorations = decoration_1.getEmptyDecoration();
                }
                else {
                    const tryDecor = fmc2DecorationMap[char];
                    if (tryDecor != undefined) {
                        if (!(decorations[tryDecor])) {
                            if (waitForNextSpan)
                                pushSpan();
                            decorations[tryDecor] = true;
                        }
                    }
                    else {
                        const tryColor = ColorMap[char];
                        if (tryColor != undefined) {
                            //@ts-ignore
                            const nextColor = color_1.Colors[tryColor];
                            if (color != nextColor) {
                                if (waitForNextSpan)
                                    pushSpan();
                                color = nextColor;
                            }
                        }
                        else {
                            content += '§' + char;
                        }
                    }
                }
                waitForFormatCode = false;
            }
            else {
                content += char;
                waitForNextSpan = true;
            }
        }
    }
    if (content != '') {
        pushSpan();
    }
    else {
        if (waitForFormatCode)
            return new str_1.RichString(new span_1.RichSpan('§'));
    }
    return new str_1.RichString(...spans);
}
exports.parseFmc = parseFmc;
