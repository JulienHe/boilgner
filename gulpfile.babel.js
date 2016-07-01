'use strict';

/* Load modules & packages */

import gulp from 'gulp';
import gulpAddSrc from 'gulp-add-src';
import autoprefixer from 'autoprefixer';
import cached from 'gulp-cached';
import changed from 'gulp-changed';
import imagemin from 'gulp-imagemin';




/* Constants  */

/* directories of the project */
const dirs = {
  src: 'src',
  dest: 'dist'
};

const scssPaths = {
  src: `${dirs.src}/scss/application.scss`,
  dest: `${dirs.dest}/styles/`
};


gulp.task('default', () =>
	gulp.src(dirs.src + '/img/*')
		.pipe(imagemin())
		.pipe(gulp.dest(dirs.dest + '/img'))
);
