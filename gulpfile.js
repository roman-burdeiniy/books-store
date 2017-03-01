/**
 * Created by roman_b on 1/16/2017.
 */
var gulp = require('gulp');
var run = require('gulp-run');
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');
var exec = require('child_process').exec;
var clean = require('gulp-clean');
var runSequence = require('run-sequence');

const BUILD_PATH = './dist';
const SOURCE_PATH = './src';
const API_SOURCE_PATH = SOURCE_PATH + '/shop-api';
const BACKEND_SOURCE_PATH = SOURCE_PATH + '/shop-backend';
const FRONTEND_SOURCE_PATH = SOURCE_PATH + '/shop-frontend';

function copyBackendResources(){
    gulp.src([BACKEND_SOURCE_PATH + '/bin/**/*'])
        .pipe(gulp.dest(BUILD_PATH + '/shop-backend/bin'));
    gulp.src([BACKEND_SOURCE_PATH + '/public/**/*'])
        .pipe(gulp.dest(BUILD_PATH + '/shop-backend/public'));
    gulp.src([BACKEND_SOURCE_PATH + '/views/*'])
        .pipe(gulp.dest(BUILD_PATH + '/shop-backend/views'));
    gulp.src([BACKEND_SOURCE_PATH + '/img/**/*'])
        .pipe(gulp.dest(BUILD_PATH + '/shop-backend/img'));
}

gulp.task('clean-dist', function () {
    return gulp.src(['./dist/*', '!' + BUILD_PATH + '/shop-api'], {read: false})
        .pipe(clean());
});

gulp.task('clean-dist-api', function () {
    return gulp.src('./dist/shop-api/*', {read: false})
        .pipe(clean());
});

gulp.task('populate-test-db', function() {
    return run('mongo ./data/scripts/populate-db.js')
        .exec()
        .pipe(gulp.dest('./data/output'))
})

gulp.task('populate-dev-db', function() {
    return run('mongo ./data/scripts/populate-db.js')
        .exec()
        .pipe(gulp.dest('./data/output'))
})

gulp.task('build-api', ['clean-dist-api'], function() {
    gulp.src([API_SOURCE_PATH + '/views/*'])
        .pipe(gulp.dest(BUILD_PATH + '/shop-api/views'));
    gulp.src([API_SOURCE_PATH + '/img/**/*'])
        .pipe(gulp.dest(BUILD_PATH + '/shop-api/img'));
    return gulp.src([API_SOURCE_PATH + '/**/*.js'])
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['es2015', "stage-2"]
        }))
        .pipe(sourcemaps.write('./maps',{includeContent:true, sourceRoot:'../../src'}))
        .pipe(gulp.dest(BUILD_PATH + '/shop-api'));
});

gulp.task('build-frontend-dev', function(done) {
    exec('npm --prefix ./src/shop-frontend run build-dev', function(error, stdout, stderr) {
        if(error) {
            console.log(error, stderr);
        }
        console.log("frontend built");
        gulp.src([FRONTEND_SOURCE_PATH + '/build/**/*'])
            .pipe(gulp.dest(BACKEND_SOURCE_PATH + '/public'));
        done();
    });
});

gulp.task('prepare-build-dev', function(callback) {
    runSequence('clean-dist', 'build-frontend-dev',
        callback);
});

gulp.task('build-dev', ['prepare-build-dev'], function() {
    var res =  gulp.src([BACKEND_SOURCE_PATH + '/**/*.js',
            '!' + BACKEND_SOURCE_PATH + '/public/**/*',
            '!' + BACKEND_SOURCE_PATH + '/config/**/*'])
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['es2015', "stage-2"]
        }))
        .pipe(sourcemaps.write('./maps',{includeContent:true, sourceRoot:'../../src'}))
        .pipe(gulp.dest(BUILD_PATH + '/shop-backend'));
    copyBackendResources();
    return res;
});
