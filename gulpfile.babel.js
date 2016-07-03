'use strict';

/* Load modules & packages */

import gulp             from    'gulp';
import gulpAddSrc       from    'gulp-add-src';
import autoprefixer     from    'gulp-autoprefixer';
import cached           from    'gulp-cached';
import changed          from    'gulp-changed';
import deleted          from    'gulp-deleted';
import imagemin         from    'gulp-imagemin';
import livereload       from    'gulp-livereload';
import plumber          from    'gulp-plumber';
import sass             from    'gulp-sass';
import sourcemaps       from    'gulp-sourcemaps';
import stream           from    'stream';
import gutil            from    'gulp-util';
import del              from    'del'; //Comging with gulp
import htmlmin          from    'gulp-htmlmin';
import babel            from    'gulp-babel';

/* Constants  */

/* Directories of the project */
const paths = {
  src: 'src',
  dist: 'dist'
};

const scssPaths = {
  src: `${paths.src}/scss/application.scss`,
  dist: `${paths.dist}/css/`
};

const assets = {
    srcImg: `${paths.src}/img/**/*`,
    distImg: `${paths.dist}/img`,
    srcJs: `${paths.src}/js/main.js`,
    disJs: `${paths.dist}/js/`,
}


/* Watch task */
gulp.task('watch', () => {
    livereload.listen();
    gulp.watch(assets.srcImg,['engine:html']);
    gulp.watch(scssPaths.src,['engine:styles']);
    gulp.watch(paths.src + '/*.html',['engine:html']);
})


/*

    Minify html
    --------
*/

gulp.task('engine:html', () => {
    return gulp.src(paths.src + '/*.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest(paths.dist + '/'))
        .on('end', () => {
            gutil.log(gutil.colors.yellow('Finished engine:html'));
        })
    livereload();
})

/*
    Styles tasks
    --------
    Create the sourcemaps
    Compile Sass -> Compressed & ErrorLog
    Prefix eveyrthing
    Sourcemaps in folder
    Css in dest folder
    Log when it's done
*/

gulp.task('engine:styles', () => {
    return gulp.src(scssPaths.src)
        .pipe(sourcemaps.init())
        .pipe(plumber(function(error) {
                // Output an error message
                gutil.log(gutil.colors.red('Error (' + error.plugin + '): ' + error.message));
                // emit the end event, to properly end the task
                this.emit('end');
            })
        )
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(autoprefixer({
                browsers: ['last 2 versions', '> 5%', 'ie >= 9', 'Firefox ESR'],
                cascade: false
            })
        )
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest(scssPaths.dist))
        .on('end', () => {
            gutil.log(gutil.colors.yellow('Finished engine:styles'));
        })
    livereload();
})


/*
    Process images
    --------
    Check if file(s) are deleted -> Deleted the from the dest folder
    Check if image(s) changed -> Only process those one
    Copy eveyrthing to the dest folder
    Log when it's done
*/

gulp.task('engine:images', () =>{
    return gulp.src(paths.src + '/img/*')
        .pipe(deleted(assets.distImg, ["**/*"]))
        .pipe(changed(assets.distImg))
		.pipe(imagemin())
		.pipe(gulp.dest(assets.distImg))
        .on('end', () => {
            gutil.log(gutil.colors.yellow('Finished engine:images'));
        })
})


/*

    Process Javascript

*/

gulp.task('engine:js', () => {
    return gulp.src(assets.srcJs)
    	.pipe(babel({
    		presets: ['es2015']
    	}))
    	.pipe(gulp.dest(assets.disJs))
        .on('end', () => {
            gutil.log(gutil.colors.yellow('Finished engine:js'));
        })
})


/* UTILS */
/*
    Clean
    --------
    Clean dist directory before build
*/

gulp.task('utils:clean', () => {
    del.sync([paths.dist+'/*'], {force: true});
    gutil.log(gutil.colors.yellow('Clean ' + paths.dist+ '/*' + ' directory!'));
})

/*
    Build engine
    --------
*/

gulp.task('init-build', () => {
    gutil.log(gutil.colors.red('Build starting'));
})

gulp.task('build', ['init-build','utils:clean','engine:html','engine:styles','engine:js','engine:images'], () => {
    gutil.log(gutil.colors.green('Congrats build finished!'));
})
