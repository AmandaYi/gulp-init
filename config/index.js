const gulp = require("gulp")
const { series, parallel } = gulp
const Core = require("./core");
const development = require("./development");
const production = require("./production")
// 处理全部的路径配置
const config = {
    output: "./build/",
    srcDir: "./src/",
    assets: {
        fonts: "./src/assets/fonts/",
        images: "./src/assets/images/",
    },
    static: "./src/static/",
    css: "./src/css/",
    js: "./src/js/",
    less: "./src/less",
    sass: "./src/sass",
}
exports.config = config
module.exports = function (mode) {
    // 选择 development 或 production 之中的一个
    switch (mode) {
        case "development": {
            return DevelopCompile(config)
            break
        }
        case "production": {
            return ProductionCompile(config)
            break
        }
        default: {
            return DevelopCompile(config)
            break
        }
    }
}


function DevelopCompile(config) {
    let { HTMLCompile, CSSCompile, JSCompile, LESSCompile, SASSCompile } = development(config)
    return series(HTMLCompile, CSSCompile, JSCompile, LESSCompile, SASSCompile,Core.WatchCompile(HTMLCompile))
}

function ProductionCompile(config) {
    return series()
}