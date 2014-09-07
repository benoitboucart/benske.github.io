/**
 * Libs import
 * --> How to install? npm install --save-dev gulp-minify-html
 * @type {[type]}
 */
var gulp = require('gulp'),
    path = require('path'),
    
    // Bump: update version number
    //bump = require('gulp-bump'),

    // Git
    //git = require('gulp-git'),

    // Bower ? 
    //bower = require('gulp-bower'),

    // CSS
    compass = require('gulp-compass'),
    minifyCSS = require('gulp-minify-css'),

    // JS BUILD
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    //rev = require('gulp-rev'),

    // HTML
    // minifyHTML = require('gulp-minify-html'),
    htmlmin = require('gulp-htmlmin'),

    // Browser sync
    browserSync = require('browser-sync'),

    // Import files
    // fileinclude = require('gulp-file-include'),
    //notify = require("gulp-notify"),
    pkg = require('./package.json')

;


var dist              = '_source/'
    , dirPublic       = '/'
    , distAssets      = dist + dirPublic + 'assets/'
    , distStylesheets = distAssets + 'css/'
    , distJavascripts = distAssets + 'js/'
    , distImages      = distAssets + 'img/'

    , deploy          = '_deploy/' //benske.github.io/'

    , src = ''
    , srcStylesheets = src + 'sass/'
    , srcJavascripts = src + 'js/'
    , srcTemplates   = src + 'templates/'
;

// -->
// Bower
// <--
// gulp.task('bower', function() {
//   bower()
//     .pipe(gulp.dest('lib/'))
// });

// -->
// Bump version number
// <--
// gulp.task('bump', function () {
//   return gulp.src(['./package.json', './bower.json'])
//     .pipe(bump())
//     .pipe(gulp.dest('./'));
// });
// // Init a git repo
// gulp.task('init', function(){
//   git.init();
// });
// // Add files
// gulp.task('add', function(){
//   gulp.src('./*')
//   .pipe(git.add());
// });
// // Commit files
// gulp.task('commit', function(){
//   gulp.src('./*', {buffer:false})
//   .pipe(git.commit('initial commit', {args: "-v"}));
// });
// // Push to remote repo
// gulp.task('push', function(){
//   git.push('origin', 'master').end();
// });
// gulp.task('tag', ['bump'], function () {
//   var pkg = require('./package.json');
//   var v = 'v' + pkg.version;
//   var message = 'Release ' + v;

//   git.commit(v, message);
//   git.tag(v, message);
//   git.push();/*'origin', 'master', '--tags'*/
//   // return gulp.src('./')
//   //   .pipe(git.push('origin', 'master', '--tags'))
//   //   .pipe(gulp.dest('./'));
// // });
// // Run git push with options
// // branch is the remote branch to push to
// gulp.task('push', function(){
//   git.push('origin', 'master', {args: " -f"})
//   .end();
// });

// -->
// Compass & SASS
// <--
gulp.task('compass', function() {
    gulp.src(srcStylesheets + '*.scss')
        .pipe(compass({
            css: distStylesheets,
            sass: srcStylesheets,
            image: distImages,
            logging: true
        }))
            .on('error', function(err) {
                // Would like to catch the error here
                console.log('Compass error')
                console.log(err);
            })
        .pipe(minifyCSS())
        .pipe(gulp.dest(distStylesheets))
        /*.pipe(browserSync.reload({stream:true}))*/;
});

// // -->
// // File include
// // <--
// gulp.task('fileinclude', function() {
//     return gulp.src(path.join(srcTemplates, '*.tpl.html'))
//             .pipe(fileinclude())
//             .pipe(rename({extname: ""}))
//             .pipe(rename({extname: ".html"}))
//             .pipe(gulp.dest(dist))
//             .pipe(notify({message: 'Includes: included'}));
// });

// -->
// HTML
// <--
gulp.task('html', ['jekyll'], function() {
    // --> Gulp-minify-html
    // gulp.src('*.html')
    //     .pipe(minifyHTML())
    //     .pipe(gulp.dest(dist));

    // --> Minhtml
    gulp.src([path.join(deploy, '*.html'),path.join(deploy, '*/*/*/*.html')]/*'*.html'*/)
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest(deploy))
        .pipe(browserSync.reload({stream:true, once: true}));
});

// -->
// Browser Sync
// <--
gulp.task('browser-sync', function() {
    browserSync.init(null/*[
        path.join(distStylesheets, '*.css'),
        path.join(distJavascripts, '*.js'),
        path.join(dist, '*.html')
    ]*/, {
        server: {
            baseDir: "./" + deploy
        }
    });
});
// Reload all Browsers
gulp.task('bs-reload', function () {
    browserSync.reload();
});

// -->
// js
// Concatenate & JS build
// <--
gulp.task('js', function () {
    gulp.src([srcJavascripts + 'plugins.js', srcJavascripts + 'main.js'])
        .pipe(concat(pkg.name + '.js'))
        .pipe(gulp.dest(distJavascripts))
        .pipe(rename(pkg.name + '.min.js'))
        .pipe(uglify())
        //.pipe(size())
        .pipe(gulp.dest(distJavascripts))
        /*.pipe(browserSync.reload({stream:true, once: true}))*/;
});

// --->
// Rev (ad hash to file)
// -->
// gulp.task('rev', function() {
//   return gulp.src(['./' + distJavascripts+"*.js", './' + distStylesheets+"*.css"])
//     .pipe(rev())
//     .pipe(gulp.dest('dist'))
//     .pipe(rev.manifest())
//     .pipe(gulp.dest('dist'));
// });

// -->
// Default task
// <--
gulp.task('jekyll', ['js', 'compass'], function (gulpCallBack){
    var spawn = require('child_process').spawn;
    // After build: cleanup HTML
    var jekyll = spawn('jekyll', ['build'], {stdio: 'inherit'});

    jekyll.on('exit', function(code) {
        gulpCallBack(code === 0 ? null : 'ERROR: Jekyll process exited with code: '+code);
    });

    // jekyll.stdout.on('data', function (data) {
    //     console.log('stdout: ' + data);
    // });

    // gulp.watch({glob: deploy}, function(files) {
    //     // update files in batch mode
    //     return files.pipe(browserSync.reload({stream:true}));
    // });
});

// -->
// Default task
// <--
gulp.task('default', ['compass', 'js', 'html', 'browser-sync'/*, 'html''*/], function (event) {
   console.log('Event type: ' + event.type); // added, changed, or deleted
   console.log('Event path: ' + event.path); // The path of the modified file

    // gulp.watch([
    //     'public/stylesheets/scss/**',
    //     'public/javascripts/*.js',
    //     '*.html',
    //     '!dist/**'
    // ], function(event) {
    //     gulp.run('build');
    // });
    // --> CSS
    gulp.watch(srcStylesheets+"**", ['html'/*'compass', 'html'*/]);
    --> HTML
    gulp.watch([
        path.join(dist, '*.html'),
        path.join(dist, '*/*.html'),
        path.join(dist, '*/*.md')
    ], ['html']);
    // --> Ruby
    gulp.watch(path.join(dist, '*/*.rb'), ['html']);
    // --> JS
    gulp.watch(srcJavascripts+"*.js", [/*'js', */'html']);

});