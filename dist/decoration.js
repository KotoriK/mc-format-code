"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decorations2Styles = exports.getEmptyDecoration = exports.addDecoration = exports.decorations2Fmc = exports.getFmc = exports.decoration2FmcMap = exports.DECORATE_TYPE_COUNT = exports.DecorationType = void 0;
var DecorationType;
(function (DecorationType) {
    DecorationType[DecorationType["BOLD"] = 0] = "BOLD";
    DecorationType[DecorationType["ITALIC"] = 1] = "ITALIC";
    DecorationType[DecorationType["DELETE_LINE"] = 2] = "DELETE_LINE";
    DecorationType[DecorationType["UNDER_LINE"] = 3] = "UNDER_LINE";
    DecorationType[DecorationType["OBUFUSCATED"] = 4] = "OBUFUSCATED";
})(DecorationType = exports.DecorationType || (exports.DecorationType = {}));
exports.DECORATE_TYPE_COUNT = Object.entries(DecorationType).length / 2;
/* 代码	官方名称
MOTD代码
§0	黑色	\u00A70
§1	深蓝色	\u00A71
§2	深绿色	\u00A72
§3	湖蓝色	\u00A73
§4	深红色	\u00A74
§5	紫色	\u00A75
§6	金色	\u00A76
§7	灰色	\u00A77
§8	深灰色	\u00A78
§9	蓝色	\u00A79
§a	绿色	\u00A7a
§b	天蓝色	\u00A7b
§c	红色	\u00A7c
§d	粉红色	\u00A7d
§e	黄色	\u00A7e
§f	白色	\u00A7f
§g  硬币金	\u00A7g
§k	随机字符	\u00A7k
§l	粗体	\u00A7l
§m	删除线	\u00A7m
§n	下划线	\u00A7n
§o	斜体	\u00A7o
§r	重置文字样式	\u00A7r
\n	换行	\n */
exports.decoration2FmcMap = {
    [DecorationType.BOLD]: 'l',
    [DecorationType.DELETE_LINE]: 'm',
    [DecorationType.ITALIC]: 'o',
    [DecorationType.OBUFUSCATED]: 'k',
    [DecorationType.UNDER_LINE]: 'n'
};
const getFmc = (type) => '§' + exports.decoration2FmcMap[type];
exports.getFmc = getFmc;
function decorations2Fmc(decorations) {
    let prefix = '';
    for (const [bit, bool] of decorations.entries()) {
        if (bool === true) {
            prefix += exports.getFmc(bit);
        }
    }
    return prefix;
}
exports.decorations2Fmc = decorations2Fmc;
function addDecoration(to, from) {
    if (to == undefined) {
        to = from;
    }
    for (const index in from) {
        if (from[index] === true) {
            to[index] = true;
        }
    }
}
exports.addDecoration = addDecoration;
const getEmptyDecoration = () => new Array(exports.DECORATE_TYPE_COUNT).fill(false);
exports.getEmptyDecoration = getEmptyDecoration;
function decorations2Styles(decorations) {
    if (decorations == undefined)
        return;
    const entries = [];
    if (decorations[DecorationType.BOLD] === true)
        entries.push(["textWeight", "bold"]);
    if (decorations[DecorationType.ITALIC] === true)
        entries.push(['fontStyle', 'italic']);
    if (decorations[DecorationType.DELETE_LINE] === true)
        entries.push(['textDecoration', 'line-through']);
    if (decorations[DecorationType.UNDER_LINE] === true)
        entries.push(['textDecoration', 'underline']);
    //if (decorations[DecorationType.OBUFUSCATED] === true) 
    return Object.fromEntries(entries);
}
exports.decorations2Styles = decorations2Styles;
