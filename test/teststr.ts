import { ColorsJE } from "../src/color"
import { RichSpan } from "../src/span"
import { RichString } from "../src/str"

export const strPlain2Styled = new RichString(new RichSpan({ content: 'abc' }), new RichSpan({ content: '123', decorations: [true, true, false, false, false,] }))
export const strSame = new RichString(
    new RichSpan({ content: 'A', color: ColorsJE.dark_red, decorations: [true, true, false, false, false,] }),
    new RichSpan({ content: 'B', color: ColorsJE.dark_red, decorations: [true, true, false, false, false,] }),
    new RichSpan({ content: 'C', color: ColorsJE.dark_red, decorations: [true, true, false, false, false,] }),
    new RichSpan({ content: 'D', color: ColorsJE.dark_red, decorations: [true, true, false, false, false,] }),
    new RichSpan({ content: 'E', color: ColorsJE.green, decorations: [true, true, false, false, false,] }),
)
export const strStyled2Plain = new RichString(new RichSpan({ content: 'abc', decorations: [true, true, false, false, false,] }), new RichSpan({ content: '123' }))
export const strStyled2OtherStyled = new RichString(new RichSpan({ content: 'abc', decorations: [true, true, false, false, false,] }), new RichSpan({ content: '123', decorations: [true, false, false, false, false,] }))
export const strStyle2MoreStyle = new RichString(
    new RichSpan({ content: 'A', decorations: [true, false, false, false, false,] }),
    new RichSpan({ content: 'B', decorations: [true, true, false, false, false,] }),
    new RichSpan({ content: 'C', decorations: [true, true, true, false, false,] }),
    new RichSpan({ content: 'D', decorations: [true, true, true, true, false,] }),
    new RichSpan({ content: 'E', decorations: [true, true, true, true, true,] }),

)