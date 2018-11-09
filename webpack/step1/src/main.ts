
// // 通过 CommonJS 规范导入 CSS 模块
require('./main.scss');
// // 通过 CommonJS 规范导入 show 函数
// const show = require('./show.js');
// // 执行 show 函数
// show('Webpack888');


// show.ts
// 操作 DOM 元素，把 content 显示到网页上
// 通过 ES6 模块规范导出 show 函数
// 给 show 函数增加类型检查 
// export function show(content: string) {
//     window.document.getElementById('app').innerText = 'Hello,' + content;
// }
// main.ts
// 通过 ES6 模块规范导入 show 函数
// import 'main.scss'
import { show } from './show';
// 执行 show 函数
show('Webpack000');