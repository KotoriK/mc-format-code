import { RichSpan } from "./span";
export declare class RichString extends Array<RichSpan> {
    constructor(...spans: Array<RichSpan>);
    renderToHTML(): string;
    renderFmc(): string;
    renderRaw(): string;
}
