# mc-format-code
A TypeScript-written library for encode/decode Minecraft Formatting Code.
一个解析/编码Minecraft中的格式代码的，使用TypeScript编写的库。
## Why this package?
- 分别支持基岩版、Java版各自的解析方式（Java版暂未完成）
- 自带类型注释
- 支持转换到HTML（§k以外）
## 用法/Usage
### parseFmt 解析格式代码
```ts
import {parseFmc} from 'mc-format-code'
const result = parseFmc('§o§2Hello §r§lMinecraft')
console.log(result)
/**expect:
 * RichString(2) [
  RichSpan {
    content: 'Hello ',
    color: Color {
      name: 'dark_green',
      fmc: '2',
      cssBackColor: '#002A00',
      cssForeColor: '#00AA00'
    },
    decorations: [ false, true, false, false, false ]
  },
  RichSpan {
    content: 'Minecraft',
    color: undefined,
    decorations: [ true, false, false, false, false ]
  }
]
*/
```
### 编码格式代码
一段文本中每段相同样式的字段由```RichSpan```表示，```RichSpan```组成```RichString```。
使用```new RichString(new RichSpan('abc'),new RichSpan({content:'def'}))```来构造```RichString```。
调用```RichString.toFmt()```来编码成格式代码。
调用```RichString.toHTML()```来编码HTML。

### escapeSpecialChar 转义特殊字符
部分版本的Minecraft: Java Edition仅支持ASCII字符，Unicode字符需要转换成/u****的形式才能被正常解析。
[unicode-helper.ts](./src/unicode-helper.ts)中提供```escapeSpecialChar()```来执行转换。
