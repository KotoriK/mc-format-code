"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RichSpan = void 0;
const decoration_1 = require("./decoration");
const color_1 = require("./color");
const css_1 = require("./css");
/**
 * 具有样式的一段文本
 */
class RichSpan {
    constructor(arg) {
        if (typeof arg == 'string') {
            this.content = arg;
        }
        else if (typeof arg == 'object') {
            const { content, color, decorations } = arg;
            this.content = content;
            this.color = color;
            this.decorations = decorations;
        }
        else {
            throw TypeError('arg must be string or object');
        }
    }
    toHTML(htmlTag = "span") {
        const colorStyle = css_1.transformToCSS(this.color?.toCSS());
        const decorationStyle = css_1.transformToCSS(decoration_1.decorations2Styles(this.decorations));
        const style = colorStyle + decorationStyle;
        return `<${htmlTag}${style != '' ? ` style="${style}"` : ''}>${this.content}</${htmlTag}>`;
    }
    toFmc() {
        let prefix = '';
        if (this.decorations) {
            prefix += decoration_1.decorations2Fmc(this.decorations);
        }
        if (this.color) {
            prefix += '§' + this.color.fmc;
        }
        return prefix + this.content;
    }
    /**更换色彩映射后，需要更新span的color字段引用 */
    updateColor() {
        if (this.color) {
            //@ts-ignore
            const nextColor = color_1.Colors[this.color?.name];
            if (nextColor != undefined) {
                this.color = nextColor;
            }
            else {
                throw 'not in map';
            }
        }
    }
}
exports.RichSpan = RichSpan;
