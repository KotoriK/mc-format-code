import { Decorations } from "./decoration";
import { Color } from "./color";
/**
 * 具有样式的一段文本
 */
export declare class RichSpan implements IRichSpan {
    constructor(fmc: string);
    constructor(span: IRichSpan);
    /**描述文本的颜色 */
    color?: Color;
    /**描述文本的装饰 */
    decorations?: Decorations;
    /**文本的内容 */
    content: string;
    toHTML(htmlTag?: string): string;
    toFmc(): string;
    /**更换色彩映射后，需要更新span的color字段引用 */
    updateColor(): void;
}
export interface IRichSpan {
    color?: Color;
    decorations?: Decorations;
    content: string;
}
