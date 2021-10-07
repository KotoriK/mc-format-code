import * as CSS from 'csstype';
export declare type CSSProperties = CSS.Properties<string | number>;
export declare function transformToCSS(prop: CSSProperties | undefined): string;
