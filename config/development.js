const gulp = require("gulp")
const { src, dest, watch } = gulp

const htmlmin = require('gulp-htmlmin');
const cleanCss = require("gulp-clean-css");
const less = require('gulp-less');
const JSUglify = require("gulp-uglify");
const JSBabel = require('gulp-babel');
const SourceMaps = require('gulp-sourcemaps');
const Plumber = require('gulp-plumber');
// 自动加载
// const Livereload = require('gulp-livereload');
// const Connect = require('gulp-connect');
let SelfConfig = {
    HtmlminOptions: {
        html5: true,// html5 规范
        minifyCSS: true,// 压缩css， 可能的值，是true, false, options, function(text,type), 具体参看clean-css
        minifyJS: false,// 压缩js，  可能的值，是true, false, options, function(text,type), 具体参看UglifyJS
        collapseWhitespace: false,// 折叠全部的标签， 也就是压缩
        sortAttributes: false,// 按照属性的频率排序
        collapseBooleanAttributes: true, // 省略布尔值
    },
    CleanCssOption: {
        advanced: "",// 是否合并选择器
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
    LessOptions: {
        javascriptEnabled: true, // javascript 支持
        ieCompat: true // ie8支持
    },
    SassOptions: {

    },
    JSUglifyOptions: {

    },
    JSBabelOptions: {
        presets: ['@babel/env']
    },
    // 自动加载
    ConnectOptions: {
        port: 8888,
        livereload: true,
        root: ['src', 'build'],
    }
}

module.exports = function (config) {
    return {
        // html
        HTMLCompile: function () {
            return src(`${config.srcDir}*.html`)
                .pipe(Plumber())
                .pipe(htmlmin(SelfConfig.HtmlminOptions))
                .pipe(dest(config.output))
      
        },
        // css
        CSSCompile: function () {
            return src(`${config.css}*.css`)
                .pipe(Plumber())
                .pipe(cleanCss(SelfConfig.CleanCssOption))
                .pipe(dest(`${config.output}css/`))
        },
        // js
        JSCompile: function () {
            return src(`${config.js}*.js`)
                .pipe(Plumber())
                // 调试地图
                .pipe(SourceMaps.init())
                .pipe(JSBabel(SelfConfig.JSBabelOptions))
                .pipe(JSUglify(SelfConfig.JSUglifyOptions))
                .pipe(SourceMaps.write(`./map/`))
                .pipe(dest(`${config.output}js/`))
        },
        // 专门处理LESS
        LESSCompile: function () {
            return src([`${config.css}/*.less`])
                .pipe(Plumber())
                .pipe(SourceMaps.init())
                .pipe(less(SelfConfig.LessOptions))
                .pipe(SourceMaps.write(`./map/`))
                .pipe(dest(`${config.output}css`))
        },
        // 处理SASS
        SASSCompile: function () {
            return src([`${config.css}/*.scss`, `${config.css}/*.sass`])
                .pipe(Plumber())
                .pipe(SourceMaps.init())
                .pipe(less(SelfConfig.SassOptions))
                .pipe(SourceMaps.write(`./map/`))
                .pipe(dest(`${config.output}css`))
        },
  
 
    }
}





