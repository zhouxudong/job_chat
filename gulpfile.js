'use strict';
var gulp = require("gulp");
var path = require("path");
var jshint = require("gulp-jshint");
var htmlmin = require("gulp-htmlmin");
var uglify = require("gulp-uglify")
var concat = require("gulp-concat");
var loadPlugins = require("gulp-load-plugins");
var pump = require("pump");
var notify = require("gulp-notify");
var cleancss = require("gulp-clean-css");
var imagemin = require("gulp-imagemin");
var babel = require("gulp-babel");
var less = require("gulp-less");
var LessAutoprefix = require('less-plugin-autoprefix');
var autoprefix = new LessAutoprefix({ browsers: ['last 2 versions'] });
var concatCss = require('gulp-concat-css');

var $ = loadPlugins();


//检测js代码、规范
gulp.task("lint", () => {
    gulp.src([
        'asset/js/home.js'
    ])
    .pipe(jshint())
    .pipe(jshint.reporter("default"))
    .pipe(notify({message: "js lint task is success!"}))
})


//合并压缩less文件
gulp.task("commonStyle", () => {
    pump([
        gulp.src([
            'asset/css/base.css',
            'asset/less/*.less'
        ]),
        less({
            plugins: [autoprefix]
        }),
        concatCss("common.min.css"),
        cleancss(),
        gulp.dest("public/css")

    ])
})
//压缩单页js
gulp.task("js_single", () => {
    pump([
        gulp.src([
            'asset/js/home.js'
        ]),
        uglify(),
        gulp.dest("public/js")
    ])
})


//合并压缩js文件
gulp.task("js", () => {
    pump([
        gulp.src([
            'asset/js/es5-sham.min.js',
            'asset/js/es5-shim.min.js'
        ]),
        concat("aio.min.js"),
        uglify(),
        gulp.dest("public/js"),
    ],function(){
        console.log("js concat and uglify is success!")
    })
});

//常量
gulp.task('const', () => {
    pump([
        gulp.src([
            'const/*.js'
        ]),
        concat('const.min.js'),
        babel({
            presets: ['es2015']
        }),
        gulp.dest("public/js")
    ])
})

gulp.task('default', function() {
    // 将你的默认的任务代码放在这
    gulp.run("lint", "commonStyle", "js_single");
});