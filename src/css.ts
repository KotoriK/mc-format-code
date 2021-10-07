import * as CSS from 'csstype'
import decamelize from 'decamelize'
export type CSSProperties = CSS.Properties<string | number>
export function transformToCSS(prop: CSSProperties | undefined) {
    if (prop == undefined) return ''
    return Object.entries(prop).map(([key, value]) => `${decamelize(key, '-')}:${value};`).join('')
}