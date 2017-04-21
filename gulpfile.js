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
    gulp.src([BACKEND_SOURCE_PATH + '/frontendSource/**/*'])
        .pipe(gulp.dest(BUILD_PATH + '/shop-backend/frontendSource'));
    gulp.src([BACKEND_SOURCE_PATH + '/webpackConfig/**/*'])
        .pipe(gulp.dest(BUILD_PATH + '/shop-backend/webpackConfig'));
}

gulp.task('copy-backend-resources', function () {
    return copyBackendResources();
});

gulp.task('copy-frontend-resources', function () {
    return gulp.src([FRONTEND_SOURCE_PATH + '/resources/**/*'])
        .pipe(gulp.dest(BACKEND_SOURCE_PATH + '/frontendSource/resources'));
});

gulp.task('clean-dist', function () {
    return gulp.src(['./dist/*', '!' + BUILD_PATH + '/shop-api'], {read: false})
        .pipe(clean());
});

gulp.task('clean-frontend-source-dist', function () {
    return gulp.src(BACKEND_SOURCE_PATH + '/frontendSource/*', {read: false})
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

gulp.task('populate-prod-db', function() {
    return run('mongo ./data/scripts/populate-prod-db.js')
        .exec()
        .pipe(gulp.dest('./data/output'))
})

gulp.task('populate-dev-db', function() {
    return run('mongo ./data/scripts/populate-local-db.js')
        .exec()
        .pipe(gulp.dest('./data/output'))
})

gulp.task('build-api', ['clean-dist-api'], function() {
    gulp.src([API_SOURCE_PATH + '/views/*'])
        .pipe(gulp.dest(BUILD_PATH + '/shop-api/views'));
    gulp.src([API_SOURCE_PATH + '/img/**/*'])
        .pipe(gulp.dest(BUILD_PATH + '/shop-api/img'));
    gulp.src([API_SOURCE_PATH + '/public/**/*'])
        .pipe(gulp.dest(BUILD_PATH + '/shop-api/public'));
    return gulp.src([API_SOURCE_PATH + '/**/*.js'])
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['es2015', "stage-2"]
        }))
        .pipe(sourcemaps.write('./maps',{includeContent:true, sourceRoot:'../../src/shop-api'}))
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

gulp.task('compile-dev', ['clean-dist'], function(){
    return gulp.src([BACKEND_SOURCE_PATH + '/**/*.js',
            '!' + BACKEND_SOURCE_PATH + '/public/**/*',
            '!' + BACKEND_SOURCE_PATH + '/frontendSource/**/*',
            '!' + BACKEND_SOURCE_PATH + '/webpackConfig/**/*'])
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['react', 'es2015', "stage-2"]
        }))
        .pipe(sourcemaps.write('./maps',{includeContent:true, sourceRoot:'../../src/shop-backend'}))
        .pipe(gulp.dest(BUILD_PATH + '/shop-backend'));
})

gulp.task('build-shop', function(callback) {
    return runSequence('build-frontend-dev', 'build-frontend-source',
        'compile-dev', 'copy-frontend-resources', 'copy-backend-resources',
        callback);
});

gulp.task('build-backend', function(callback) {
    return runSequence('compile-dev', 'copy-frontend-resources', 'copy-backend-resources',
        callback);
});

gulp.task('build-frontend-source', ['clean-frontend-source-dist'], function() {
    var res =  gulp.src([FRONTEND_SOURCE_PATH + '/src/**/*.js'])
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['react', 'es2015', "stage-2"]
        }))
        .pipe(sourcemaps.write('./maps',{includeContent:true, sourceRoot:'../../../../src/shop-frontend/src'}))
        .pipe(gulp.dest(BACKEND_SOURCE_PATH + '/frontendSource/src'));
    return res;
});
