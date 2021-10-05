"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformToCSS = void 0;
const decamelize_1 = __importDefault(require("decamelize"));
function transformToCSS(prop) {
    if (prop == undefined)
        return '';
    return Object.entries(prop).map(([key, value]) => `${decamelize_1.default(key, { separator: '-' })}:${value};`).join('');
}
exports.transformToCSS = transformToCSS;
