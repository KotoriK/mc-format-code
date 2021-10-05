"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RichString = void 0;
const color_1 = require("./color");
const decoration_1 = require("./decoration");
class RichString extends Array {
    constructor(...spans) {
        super(...spans);
    }
    renderToHTML() {
        return this.map(span => span.toHTML()).join('');
    }
    renderFmc() {
        let decorationState = undefined;
        let colorState = color_1.Colors.empty;
        let fmc = '';
        for (const span of this) {
            let resetSign = span.color == color_1.Colors.empty && (span.color != colorState);
            const nextDecorResult = nextDecor(decorationState, span.decorations);
            if (nextDecorResult[0])
                resetSign = true;
            const newDecor = nextDecorResult[1];
            if (resetSign) {
                fmc += '§r';
                decorationState = undefined;
            }
            if (span.color != colorState) {
                colorState = span.color;
                if (span.color != color_1.Colors.empty)
                    fmc += '§' + span.color.fmc;
            }
            if (newDecor) {
                fmc += decoration_1.decorations2Fmc(newDecor);
                if (decorationState) {
                    decoration_1.addDecoration(decorationState, newDecor);
                }
                else {
                    decorationState = newDecor;
                }
            }
            fmc += span.content;
        }
        return fmc;
    }
    renderRaw() {
        return this.map(span => span.content).join('');
    }
}
exports.RichString = RichString;
function nextDecor(a, b) {
    if (b == undefined) {
        return [!(a == undefined), undefined /**表示没有需要添加的装饰，帮助快速跳过检查而不是再进行遍历 */];
    }
    else if (a == undefined) {
        return [false, b];
    }
    else {
        let newDecor = decoration_1.getEmptyDecoration();
        let hasNewDecor = false;
        for (const index in a) {
            if (a[index] && !b[index]) {
                return [true, b]; /**一旦需要重置，所有b都需要添加 */
            }
            else if (!a[index] && b[index]) {
                hasNewDecor = true;
                newDecor[index] = true;
            }
        }
        return [false, hasNewDecor ? newDecor : undefined];
    }
}
