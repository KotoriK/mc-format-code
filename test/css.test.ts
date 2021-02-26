import { transformToCSS } from "../src/css";

test('transformToCSS',()=>{
    expect(transformToCSS({textDecorationSkipInk:'-moz-initial'})).toBe('text-decoration-skip-ink:-moz-initial;')
})