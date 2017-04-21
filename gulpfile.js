'use strict';
var gulp = require("gulp");
var path = require("path");
var jshint = require("gulp-jshint");
var htmlmin = require("gulp-htmlmin");
var uglify = require("gulp-uglify")
var concat = require("gulp-concat");
var loadPlugins = require("gulp-load-plugins");
var fileinclude = require("gulp-file-include");
var pump = require("pump");
var notify = require("gulp-notify");
var cleancss = require("gulp-clean-css");
var imagemin = require("gulp-imagemin"),
    pngquant = require("imagemin-pngquant"),
    spritesmith = require("gulp.spritesmith");
var babel = require("gulp-babel");
var less = require("gulp-less");
var LessAutoprefix = require('less-plugin-autoprefix');
var autoprefix = new LessAutoprefix({ browsers: ['last 2 versions'] });
var concatCss = require('gulp-concat-css');
var browserSync = require("browser-sync").create();
var gulpif = require("gulp-if");
var config = require("./config");

var port = process.env.PORT || config.dev.port;
var NODE_ENV = process.env.NODE_ENV || "dev";
var $ = loadPlugins();

var isProd = NODE_ENV === "production";

//热部署监听\
gulp.task("serve", () => {
    browserSync.init({
        proxy: `localhost:${port}/home.html`
    })
    gulp.watch("asset/js/**/*.js", ["lint", "js"]);    //检测、合并
    gulp.watch("asset/less/**/*.less", ["less"]);       //编译、合并less
    gulp.watch("asset/html/style/**/*.css", ["html"]);  //但页面需要的css改变，合并到html
    //gulp.watch("view/**.html").on("change", browserSync.reload);
    gulp.watch("asset/images/*.{png, jpg, gif, ico}", ["imagemin"]);    //图片压缩
});


//检测js代码、规范
gulp.task("lint", () => {
    gulp.src([
        'asset/js/**／*.js'
    ])
    .pipe(jshint())
    .pipe(jshint.reporter("default"))
    .pipe(notify({message: "js lint task is success!"}))
});

//合并小图
// gulp.task("sprite", () => {
//     var spriteData = gulp.src([
//         "asset/images/1.png",
//         "asset/images/2.png",
//         "asset/images/3.png",
//         "asset/images/4.png",
//         "asset/images/5.png"
//     ]).pipe(spritesmith({
//         imgName: 'srpite.png',
//         cssName: 'sprite.css'
//     }));
//     return spriteData.pipe(gulp.dest("public/images/"));
// })

//压缩image
gulp.task("imagemin", () => {
    pump([
        gulp.src("asset/images/*.{jpg,png,gif,ico}"),
        imagemin({
            progressive: true,
            use: [pngquant()]
        }),
        gulp.dest("public/images")
    ],function (err) {
        handleError(err,'imagemin')
    })
});

//编译压缩合并html
gulp.task("html", () => {
    pump([
        gulp.src([
            "asset/html/**/*.html",
            "asset/html/!{style,include}/*.html"
        ]),
        fileinclude({
            prefix: '@@',
            basepath: '@file'
        }),
        gulp.dest("view")
    ],function (err) {
        handleError(err,"html");
    })
});

//压缩单页css
var css_single = function () {
    pump([
        gulp.src("asset/less/pageless/**/*.less"),
        less({
            plugins: [autoprefix]
        }),
        cleancss(),
        gulp.dest("asset/html/style")
    ],function (err) {
        if(err){
            console.error(err["message"]);
            console.error(err['extract']);
        }else{
            console.log("css_single is success");
        }
    })
};
//css module
var css_concat_task = function () {
    pump([
        gulp.src([
            "asset/less/pageless/task/*.less"
        ]),
        less({
            plugins: [autoprefix]
        }),
        concatCss("task.min.css"),
        cleancss(),
        gulp.dest("public/css")
    ],function (err) {
        if(err){
            throw err;
        }else{
            console.log("css_concat_task");
        }
    })
};

//合并压缩less文件
gulp.task("less", () => {
    pump([
        gulp.src([
            'asset/css/base.css',
            'asset/less/button.less',
            'asset/less/form.less',
            'asset/less/common.less',
            'asset/less/header.less'
        ]),
        less({
            plugins: [autoprefix]
        }),
        concatCss("common.min.css"),
        cleancss(),
        gulp.dest("public/css")
    ], function (err) {
        if(err){
            console.error(err["message"]);
            console.error(err['extract']);
        }else{
            console.log("commonCSS is success");
            css_single();
            css_concat_task();
        }
    })
});


//压缩单页js
var js_single = function () {
    pump([
        gulp.src([
            'asset/js/pagejs/*.js'
        ]),
        gulpif(isProd, uglify()),
        gulp.dest("public/js")
    ], handleError)
};

//合并压缩js文件
gulp.task("js", () => {
    pump([
        gulp.src([
            'asset/js/es5-sham.min.js',
            'asset/js/es5-shim.min.js',
            'asset/js/util.js',
            'asset/js/public.js'
        ]),
        concat("aio.min.js"),
        gulpif(isProd, uglify()),
        gulp.dest("public/js")
    ],function(err){
        if(err){
            console.error(err["message"]);
            console.error(err['extract']);
        }else{
            console.log("js concat aio.min.js is success");
            js_single();
        }
    })
});

//常量
// gulp.task('const', () => {
//     pump([
//         gulp.src([
//             'const/*.js'
//         ]),
//         concat('const.min.js'),
//         babel({
//             presets: ['es2015']
//         }),
//         gulp.dest("public/js")
//     ])
// });

gulp.task("default", ["serve"]);

function handleError(err,task,fn) {
    if(err){
        console.error(err["message"]);
        console.error(err['extract']);
    }else{
        console.log(task + " is success");
        if(fn && typeof fn === "function") fn();
    }
}