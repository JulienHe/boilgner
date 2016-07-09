# boilgner ![Travis build](https://travis-ci.org/JulienHe/boilgner.svg?branch=master)
Boilerplate for front-end designer. It's now my regular boilerplate for my projects with [Gulp.js](http://gulpjs.com/).
If you use it, do not hesitate to send me an email and tell me if you like it or not, I'm open to talk about this little piece of code.

* Concatenates JS files.
* Compiles Sass files and automatically [adds vendor prefixes](https://github.com/ai/autoprefixer).
* Exports both minified and expanded JS and CSS files with header info.
* Cleans up file directories.
* Includes a `.travis.yml` file for continuous integration with [TravisCI](https://travis-ci.org).

**In This Documentation**

1. [Getting Started](#getting-started)
2. [File Structure](#file-structure)
3. [Working with the Source Files](#working-with-the-source-files)
4. [Continuous Integration](#continuous-integration)
5. [License](#license)

## Getting Started

### Dependencies
Make sure these are installed first.

* [Node.js](http://nodejs.org)
* [Gulp](http://gulpjs.com) `sudo npm install -g gulp`

## Testing
```gulp```

## File Structure

```
boilgner/
|—— dist/
|   |—— css/
|   |   |—— application.css
|   |—— img/
|   |   |—— # image files
|   |—— js/
|   |   |—— main.js
|—— src/
|   |—— fonts/
|   |   |—— # fonts files
|   |—— img/
|   |   |—— # image files
|   |—— js/
|   |   |—— hello.js
|   |   |—— main.js
|   |—— scss/
|   |   |—— application.scss
|   |   |—— dev/
|   |   |   |—— _dev.scss
|   |—— img/
|   |   |—— # static files and folders
|   |—— index.html
|—— .travis.yml
|—— gulfile.js
|—— package.json
|—— README.md
```

## Working with the Source Files

### Sass

Sass files are located in `src` > `scss`. Gulp generates minified and unminified CSS files. It also includes [autoprefixer](https://github.com/postcss/autoprefixer), which adds vendor prefixes for you if required by the last two versions of a browser.

### JavaScript

JavaScript files are located in the `src` > `js` directory.

### Images

Image files placed in the `src` > `img` directory will be copied as-is into the `dist` > `img` directory.
You can add image(s) in the `src` directory and [gulp-imagemin](https://github.com/sindresorhus/gulp-imagemin) will optimize it.

## Continuous Integration

### Travis CI

This boilerplate includes a configuration file for [Travis CI](http://docs.travis-ci.com/user/getting-started/), a continuous integration service for GitHub.

The `.travis.yml` file is pre-configured for the boilerplate's build system. Even if you add files or update the Gulp tasks, you shouldn't need to change anything for it to work.


## License

The code is available under the [MIT License](LICENSE.md).
