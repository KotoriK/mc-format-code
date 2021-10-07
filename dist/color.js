"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Colors = exports.switchColors = exports.ColorsBE = exports.ColorsJE = exports.Color = void 0;
class Color {
    constructor(name, fmc, cssForeColor, cssBackColor) {
        this.name = name;
        this.fmc = fmc;
        this.cssBackColor = cssBackColor;
        this.cssForeColor = cssForeColor;
    }
    toCSS() {
        return { color: this.cssForeColor, textShadow: `1px 0.2px ${this.cssBackColor}` };
    }
}
exports.Color = Color;
const _colors_basic = {
    empty: undefined,
    black: new Color('black', '0', '#000000', '#000000'),
    dark_blue: new Color('dark_blue', '1', '#0000AA', '#00002A'),
    dark_green: new Color('dark_green', '2', '#00AA00', '#002A00'),
    dark_aqua: new Color('dark_aqua', '3', '#00AAAA', '#002A2A'),
    dark_red: new Color('dark_red', '4', '#AA0000', '#2A0000'),
    dark_purple: new Color('dark_purple', '5', '#AA00AA', '#2A002A'),
    gray: new Color('gray', '7', '#AAAAAA', '#2A2A2A'),
    dark_gray: new Color('dark_gray', '8', '#555555', '#151515'),
    blue: new Color('blue', '9', '#5555FF', '#15153F'),
    green: new Color('green', 'a', '#55FF55', '#153F15'),
    aqua: new Color('aqua', 'b', '#55FFFF', '#153F3F'),
    red: new Color('red', 'c', '#FF5555', '#3F1515'),
    light_purple: new Color('light_purple', 'd', '#FF55FF', '#3F153F'),
    yellow: new Color('yellow', 'e', '#FFFF55', '#3F3F15'),
    white: new Color('white', 'f', '#FFFFFF', '#3F3F3F'),
};
exports.ColorsJE = {
    gold: new Color('gold', '6', '#FFAA00', '#2A2A00' /**#402A00 for bedrock edition */),
    ..._colors_basic
};
exports.ColorsBE = {
    minecoin_gold: new Color('minecoin_gold', 'g', '#DDD605', '#373501'),
    gold: new Color('gold', '6', '#FFAA00', '#402A00'),
    ..._colors_basic
};
/**
 *
 * @param BEJE false->BE, true->JE
 */
function switchColors(BEJE = false) {
    if (BEJE === true) {
        exports.Colors = Colors = exports.ColorsJE;
    }
    else {
        exports.Colors = Colors = exports.ColorsBE;
    }
}
exports.switchColors = switchColors;
/**当前正在使用的色彩映射 */
let Colors = exports.ColorsBE;
exports.Colors = Colors;
