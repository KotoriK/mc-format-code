import { parseFmc } from "../src/fmc"
import { RichSpan } from "../src/span"
import { RichString } from "../src/str"
import { strPlain2Styled } from "./teststr"

test('fmc parse', () => {
    expect(parseFmc('')).toStrictEqual(new RichString())
    expect(parseFmc('§')).toStrictEqual(new RichString(new RichSpan('§')))
    expect(parseFmc('abc§l§o123')).toStrictEqual(strPlain2Styled)
    expect(parseFmc('abc§l§o§l§o§l§o§l§o123')).toStrictEqual(strPlain2Styled)
    expect(parseFmc('§§abc§l§o123')).toEqual(new RichString(new RichSpan('§§abc'), strPlain2Styled[1]))
})