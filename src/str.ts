import { Colors } from "./color";
import { addDecoration, Decorations, decorations2Fmc, getEmptyDecoration } from "./decoration";
import { RichSpan } from "./span";

export class RichString extends Array<RichSpan>{
    constructor(...spans: Array<RichSpan>) {
        super(...spans)
    }
    renderToHTML() {
        return this.map(span => span.toHTML()).join('')
    }
    renderFmc() {
        let decorationState = undefined
        let colorState = Colors.empty
        let fmc = ''
        for (const span of this) {
            let resetSign = span.color == Colors.empty && (span.color != colorState)
            const nextDecorResult = nextDecor(decorationState!, span.decorations)
            if (nextDecorResult[0]) resetSign = true
            const newDecor = nextDecorResult[1]
            if (resetSign) {
                fmc += '§r'
                decorationState = undefined
            }
            if (span.color != colorState) {
                colorState = span.color
                if (span.color != Colors.empty) fmc += '§' + span.color!.fmc
            }

            if (newDecor) {
                fmc += decorations2Fmc(newDecor)
                if (decorationState) {
                    addDecoration(decorationState, newDecor)
                } else {
                    decorationState = newDecor
                }
            }
            fmc += span.content
        }
        return fmc
    }
    renderRaw() {
        return this.map(span => span.content).join('')
    }
}
function nextDecor(a: Decorations | undefined, b: Decorations | undefined): [boolean, Decorations | undefined] {
    if (b == undefined) {
        return [!(a == undefined), undefined/**表示没有需要添加的装饰，帮助快速跳过检查而不是再进行遍历 */]
    } else if (a == undefined) {
        return [false, b]
    } else {
        let newDecor = getEmptyDecoration()
        let hasNewDecor = false
        for (const index in a) {
            if (a[index] && !b[index]) {
                return [true, b]/**一旦需要重置，所有b都需要添加 */
            } else if (!a[index] && b[index]) {
                hasNewDecor = true
                newDecor[index] = true
            }
        }
        return [false, hasNewDecor ? newDecor : undefined]
    }
}