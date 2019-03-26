const gulp = require("gulp")
const { src, dest, watch } = gulp
module.exports = {
    // 监听编译函数
    WatchCompile: function (fallback) {
       return function(){
        WatcherEarnest (watch(["./src/*.html"]),fallback)
       }
    },
}

// 细微的监听
function WatcherEarnest (watcher,fallback){
    watcher.on("change",function(path,stats){
        console.log(`${path}改变了`)
        fallback()
    })
}




// reg可以是空
function CopyResources(route, reg = '', bundle) {
    // 如果没有传入打包之后的路径，那么就和原路径一样
    if (isString(bundle)) {
        bundle = route
    }
    return src(route)
        .pipe(dest(result));
}
// 是不是字符串
function isString(str) {
    if (typeof str == "string") {
        return true
    }
    return false
}
