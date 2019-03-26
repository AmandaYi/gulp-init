const gulp = require("gulp")
const { src, dest } = gulp
const htmlmin = require('gulp-htmlmin');
const cleanCss = require("gulp-clean-css");
const JSUglify = require("gulp-uglify");
const JSBabel = require('gulp-babel');
let SelfConfig = {
    HtmlminOptions: {
        html5: true,// html5 规范
        minifyCSS: true,// 压缩css， 可能的值，是true, false, options, function(text,type), 具体参看clean-css
        minifyJS: true,// 压缩js，  可能的值，是true, false, options, function(text,type), 具体参看UglifyJS
        collapseWhitespace: true,// 折叠全部的标签， 也就是压缩
        sortAttributes: true,// 按照属性的频率排序
        collapseBooleanAttributes: true, // 省略布尔值
    },
    CleanCssOption: {
        advanced: true,// 是否合并选择器
        removeDuplicateRules: true, // 删除重复属性，但是不会去掉同样的选择器，只会合并重复的属性
        // compatibility:'ie9,-properties.merging' // 兼容性
        format: "beautify", // 去掉不规范的换行，整齐的格式化操作，开发环境beautify，生产环境false
        /** 
         * keep-breaks
         * body{color:red}
         * div{font-size:10px}
         * beautify
         * body {
         *   color: red
         * }
         * div {
         *   font-size: 10px
         * }
        */
    },
    JSUglifyOptions: {

    },
    JSBabelOptions: {
        presets: ['@babel/env']
    }
}

module.exports = function (config) {
    return {
        // html
        HTMLCompile: function () {
            return src(`${config.srcDir}*.html`)
                .pipe(htmlmin(SelfConfig.HtmlminOptions))
                .pipe(dest(config.output))
        },
        // css
        CSSCompile: function () {
            return src(`${config.css}*.css`)
                .pipe(cleanCss(SelfConfig.CleanCssOption))
                .pipe(dest(`${config.output}css/`))
        },
        // js
        JSCompile: function () {
            return src(`${config.js}*.js`)
                .pipe(JSBabel(SelfConfig.JSBabelOptions))
                .pipe(JSUglify(SelfConfig.JSUglifyOptions))
                .pipe(dest(`${config.output}js/`))
        }
    }
}




