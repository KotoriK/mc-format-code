import { ColorsJE } from '../src/color'
import { RichSpan } from '../src/span'
import { RichString } from '../src/str'
import { strPlain2Styled, strStyled2Plain, strStyled2OtherStyled, strStyle2MoreStyle, strSame as strSameRaw } from './teststr'
const strSame = new RichString(...strSameRaw)
test('toRaw', () => {
    expect(strPlain2Styled.renderRaw()).toBe('abc123')
})
test('toFmc', () => {

    expect(strPlain2Styled.renderFmc()).toBe('abc§l§o123')
    expect(strStyled2Plain.renderFmc()).toBe('§l§oabc§r123')
    expect(strStyled2OtherStyled.renderFmc()).toBe('§l§oabc§r§l123')
    expect(strStyle2MoreStyle.renderFmc()).toBe('§lA§oB§mC§nD§kE')

})
test('toFmc, with color', () => {
    const strRainbow = new RichString(
        new RichSpan({ content: 'A', color: ColorsJE.dark_red }),
        new RichSpan({ content: 'B', color: ColorsJE.gold }),
        new RichSpan({ content: 'C', color: ColorsJE.black }),
        new RichSpan({ content: 'D', color: ColorsJE.blue }),
        new RichSpan({ content: 'E', color: ColorsJE.green }),

    )
    expect(strRainbow.renderFmc()).toBe('§4A§6B§0C§9D§aE')
    strRainbow.push(new RichSpan({ content: 'F', }))
    strRainbow.push(new RichSpan({ content: 'G', color: ColorsJE.green }))
    expect(strRainbow.renderFmc()).toBe('§4A§6B§0C§9D§aE§rF§aG')
    expect(strSame.renderFmc()).toBe('§4§l§oABCD§aE')
    strSame[4] = new RichSpan({ content: 'E', color: ColorsJE.green, })
    expect(strSame.renderFmc()).toBe('§4§l§oABCD§r§aE')

})