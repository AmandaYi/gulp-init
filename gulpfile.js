// 判断环境
const mode = "development" // development or production
const config = require("./config/")(mode);
// 这里得到全部的任务队列
exports.default = config;

// const configTmp = {
//     output: "./build/",
//     srcDir: "./src/",
//     assets: {
//         fonts: "./src/assets/fonts/",
//         images: "./src/assets/images/",
//     },
//     static: "./src/static/",
//     css: "./src/css/",
//     js: "./js/js/",
// }
// // // html


// // js
// function JSCompile() { }

// // 静态资源
// function StaticCopy() {
// }


// function defaultComplie() {

// }







