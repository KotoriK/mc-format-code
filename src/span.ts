import { Decorations, decorations2Fmc, decorations2Styles, DecorationType, getFmc } from "./decoration"
import { Color, Colors, } from "./color"
import { transformToCSS } from "./css"

/**
 * 具有样式的一段文本
 */
export class RichSpan implements IRichSpan {
    constructor(fmc: string)
    constructor(span: IRichSpan)
    constructor(arg: string | IRichSpan) {
        if (typeof arg == 'string') {
            this.content = arg
        } else if (typeof arg == 'object') {
            const { content, color, decorations } = arg
            this.content = content
            this.color = color
            this.decorations = decorations
        } else {
            throw TypeError('arg must be string or object')
        }
    }
    /**描述文本的颜色 */
    color?: Color
    /**描述文本的装饰 */
    decorations?: Decorations
    /**文本的内容 */
    content: string

    toHTML(htmlTag: string = "span") {
        const colorStyle = transformToCSS(this.color?.toCSS())
        const decorationStyle = transformToCSS(decorations2Styles(this.decorations))
        const style = colorStyle + decorationStyle
        return `<${htmlTag}${style != '' ? ` style="${style}"` : ''}>${this.content}</${htmlTag}>`
    }
    toFmc() {
        let prefix = ''
        if (this.decorations) {
            prefix += decorations2Fmc(this.decorations)
        }
        if (this.color) {
            prefix += '§' + this.color.fmc
        }
        return prefix + this.content
    }
    /**更换色彩映射后，需要更新span的color字段引用 */
    updateColor() {
        if (this.color) {
            //@ts-ignore
            const nextColor: Color = Colors[this.color?.name]
            if (nextColor != undefined) {
                this.color = nextColor
            } else {
                throw 'not in map'
            }
        }
    }
}
export interface IRichSpan {
    color?: Color
    decorations?: Decorations
    content: string
}