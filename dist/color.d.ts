import { CSSProperties } from './css';
export declare class Color {
    readonly name: string;
    readonly cssForeColor: string;
    readonly cssBackColor: string;
    readonly fmc: string;
    constructor(name: string, fmc: string, cssForeColor: string, cssBackColor: string);
    toCSS(): CSSProperties;
}
export declare const ColorsJE: Record<UsableColors_JE | 'empty', Color | undefined>;
export declare const ColorsBE: Record<UsableColors_BE | 'empty', Color | undefined>;
/**
 *
 * @param BEJE false->BE, true->JE
 */
export declare function switchColors(BEJE?: boolean): void;
/**当前正在使用的色彩映射 */
declare let Colors: Record<UsableColors_BE | 'empty', Color | undefined> | Record<UsableColors_JE | 'empty', Color | undefined>;
export { Colors };
export declare type UsableColors_JE = 'black' | 'dark_blue' | 'dark_green' | 'dark_aqua' | 'dark_red' | 'dark_purple' | 'gold' | 'gray' | 'dark_gray' | 'blue' | 'green' | 'aqua' | 'red' | 'light_purple' | 'yellow' | 'white' | 'empty';
export declare type UsableColors_BE = UsableColors_JE | 'minecoin_gold';
