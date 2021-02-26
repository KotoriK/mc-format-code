import { Color, ColorsBE,Colors, UsableColors_BE } from "./color"
import { decoration2FmcMap, Decorations, DecorationType, getEmptyDecoration } from "./decoration"
import { IRichSpan, RichSpan } from "./span"
import { RichString } from "./str"
const fmc2DecorationMap = Object.fromEntries(Object.entries(decoration2FmcMap).map(([a, b]) => [b, parseInt(a) as DecorationType]))
const ColorMap = (() => {
    const premapColors = { ...ColorsBE }//TODO:
    delete premapColors.empty
    return Object.fromEntries(Object.entries(premapColors as Record<UsableColors_BE, Color>).map(([key, value]) => [value.fmc, key]))
})()

function _isArrayAllFalse(array: Array<boolean>) {
    for (const bool of array) {
        if (bool === true) return false
    }
    return true
}
export function parseFmc(fmc: string) {
    let waitForFormatCode = false
    let waitForNextSpan = false
    const spans = new RichString()
    let content = ''
    let decorations: Decorations = getEmptyDecoration()
    let color = Colors.empty
    const pushSpan = () => {
        waitForNextSpan = false
        const span = {
            content, color
        } as IRichSpan
        if (!_isArrayAllFalse(decorations)) span.decorations = [...decorations]
        spans.push(new RichSpan(span))
        content = ''
    }
    for (const char of fmc) {
        if (char === '§') {
            if (waitForFormatCode) {
                waitForFormatCode = false
                content += '§§'
                continue
            } else {
                waitForFormatCode = true
                continue
            }
        } else {
            if (waitForFormatCode) {
                if (char === 'r') {
                    if (waitForNextSpan) pushSpan()
                    color = Colors.empty
                    decorations = getEmptyDecoration()
                } else {
                    const tryDecor = fmc2DecorationMap[char]
                    if (tryDecor != undefined) {
                        if (!(decorations[tryDecor])) {
                            if (waitForNextSpan) pushSpan()
                            decorations[tryDecor] = true
                        }
                    } else {
                        const tryColor = ColorMap[char]
                        if (tryColor != undefined) {
                            //@ts-ignore
                            const nextColor: Color = Colors[tryColor]
                            if (color != nextColor) {
                                if (waitForNextSpan) pushSpan()
                                color = nextColor
                            }
                        } else {
                            content += '§' + char
                        }
                    }
                }
                waitForFormatCode = false
            } else {
                content += char
                waitForNextSpan = true
            }
        }
    }
    if (content != '') {
        pushSpan()
    } else {
        if (waitForFormatCode) return new RichString(new RichSpan('§'))
    }
    return new RichString(...spans)
}