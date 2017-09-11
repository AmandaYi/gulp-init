var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var less        = require('gulp-less');
var reload      = browserSync.reload;
// 错误阻止

var plumber = require('gulp-plumber');

// 静态服务器 + 监听 scss/html 文件
gulp.task('serve', ['less'], function() {

    browserSync.init({
        server: "./",
        port:"1111"
    });

    gulp.watch("./less/*.less", ['less']);
    gulp.watch("./*.html").on('change', reload);
});

// scss编译后的css将注入到浏览器里实现更新
gulp.task('less', function() {
    return gulp.src("./less/*.less")
    	.pipe(plumber())
        .pipe(less())
        .pipe(gulp.dest("./css/"))
        .pipe(reload({stream: true}));
});

gulp.task('default', ['serve']);
