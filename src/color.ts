import { CSSProperties } from './css'
export class Color {
    readonly name: string
    readonly cssForeColor: string
    readonly cssBackColor: string
    readonly fmc: string
    constructor(name: string, fmc: string, cssForeColor: string, cssBackColor: string) {
        this.name = name;
        this.fmc = fmc;
        this.cssBackColor = cssBackColor;
        this.cssForeColor = cssForeColor;
    }
    toCSS(): CSSProperties {
        return { color: this.cssForeColor, textShadow: `1px 0.2px ${this.cssBackColor}` }
    }
}
export const _colors_basic: Record<Exclude<UsableColors_JE, 'gold'> | 'empty', Color | undefined> = {
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
}
export const ColorsJE: Record<UsableColors_JE | 'empty', Color | undefined> = {
    gold: new Color('gold', '6', '#FFAA00', '#2A2A00'/**#402A00 for bedrock edition */),
    ..._colors_basic
}
export const ColorsBE: Record<UsableColors_BE | 'empty', Color | undefined> = {
    minecoin_gold: new Color('minecoin_gold', 'g', '#DDD605', '#373501'),/**bedrock edition */
    gold: new Color('gold', '6', '#FFAA00', '#402A00'),
    ..._colors_basic
}
/**
 * 
 * @param BEJE false->BE, true->JE
 */
export function switchColors(BEJE: boolean = false) {
    if (BEJE === true) {
        _usingColors = ColorsJE
    } else {
        _usingColors = ColorsBE
    }
}
let _usingColors: Record<UsableColors_BE | 'empty', Color | undefined> | Record<UsableColors_JE | 'empty', Color | undefined> = ColorsBE
/**当前正在使用的色彩映射 */
const Colors = new Proxy(_usingColors, { set: () => false/**failed directly */ })/**使用只读代理防止被更改 */
export { Colors }
export type UsableColors_JE = 'black' | 'dark_blue' | 'dark_green' | 'dark_aqua'
    | 'dark_red' | 'dark_purple' | 'gold' | 'gray' | 'dark_gray'
    | 'blue' | 'green' | 'aqua' | 'red' | 'light_purple' | 'yellow' | 'white' | 'empty'
export type UsableColors_BE = UsableColors_JE | 'minecoin_gold'
