import { CSSProperties } from "./css";
export declare enum DecorationType {
    BOLD = 0,
    ITALIC = 1,
    DELETE_LINE = 2,
    UNDER_LINE = 3,
    OBUFUSCATED = 4
}
export declare const DECORATE_TYPE_COUNT: number;
/**
 * 样式由一个布尔值数组保存
 * 每个位指代的样式由enum DecorationType 决定
 * @see DecorationType
 */
export declare type Decorations = Array<boolean>;
export declare const decoration2FmcMap: {
    0: string;
    2: string;
    1: string;
    4: string;
    3: string;
};
export declare const getFmc: (type: DecorationType) => string;
export declare function decorations2Fmc(decorations: Decorations): string;
export declare function addDecoration(to: Decorations, from: Decorations): void;
export declare const getEmptyDecoration: () => any[];
export declare function decorations2Styles(decorations: Decorations | undefined): CSSProperties | undefined;
