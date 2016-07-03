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
    distImg: `${paths.dist}/img`
}


/* Watch task */
gulp.task('watch', () => {
    livereload.listen();
    gulp.watch(assets.srcImg,['engine:images']);
    gulp.watch(scssPaths.src,['engine:styles']);
});


gulp.task('default', () => {

});


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
    gulp.src(scssPaths.src)
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'compressed', errLogToConsole: true
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
});


/*
    Process images
    --------
    Check if file(s) are deleted -> Deleted the from the dest folder
    Check if image(s) changed -> Only process those one
    Copy eveyrthing to the dest folder
    Log when it's done
*/

gulp.task('engine:images', () =>{
    gulp.src(paths.src + '/img/*')
        .pipe(deleted(assets.distImg, ["**/*"]))
        .pipe(changed(assets.distImg))
		.pipe(imagemin())
		.pipe(gulp.dest(assets.distImg))
        .on('end', () => {
            gutil.log(gutil.colors.green('Finished engine:images'));
        })
})
