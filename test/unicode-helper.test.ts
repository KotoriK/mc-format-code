import { escapeSpecialChar } from "../src/unicode-helper"

test('unicode-helper: 正确处理汉字',()=>{
    expect(escapeSpecialChar('§4你好fmc')).toBe('\\u00a74\\u4f60\\u597dfmc')
})

test('unicode-helper: 正确处理假名',()=>{
    expect(escapeSpecialChar('だaれe')).toBe('\\u3060a\\u308ce')
})
test('unicode-helper: 控制字符',()=>{
    expect(escapeSpecialChar('\b\f\n\r\t\v\0')).toBe('\\u0007\\u0008\\u000c\\u000a\\u000d\\u0009\\u000b\\u0000')
})
test('unicode-helper: 可读字符边界',()=>{
    expect(escapeSpecialChar(' ~\u001f\u007f')).toBe(' ~\\u001f\\u007f')
})
test('unicode-helper: SMP',()=>{
    expect(escapeSpecialChar('𠀾a')).toBe('\\ud840\\udc3ea')
})