/**
 * Created by roman_b on 3/13/2017.
 */
var gulp = require('gulp');
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');

gulp.task('build-babel', function() {
    var res =  gulp.src(['./src' + '/**/*.js'])
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['react', 'es2015', "stage-2"]
        }))
        .pipe(sourcemaps.write('./maps',{includeContent:true, sourceRoot:'../../src'}))
        .pipe(gulp.dest('../../dist/shop-backend/public/server-side-build'));
    return res;
});