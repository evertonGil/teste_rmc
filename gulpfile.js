var gulp = require('gulp')
	,imagemin = require('gulp-imagemin')
	,clean = require('gulp-clean')
	,uglify = require('gulp-uglify')
	,cssmin = require('gulp-cssmin')
	,htmlReplace = require('gulp-html-replace')
	,usemin = require('gulp-usemin')
	,browserSync = require('browser-sync')
	,less = require('gulp-less')
	,autoprefixer = require('gulp-autoprefixer');



gulp.task('copy',['clean', 'build-less'], function(){
	return gulp.src('dev/**/*')
	.pipe(gulp.dest('public'));
});

gulp.task('clean', function(){
	return gulp.src('public')
		.pipe(clean())
});

gulp.task('build-img',['copy', 'build-template'], function(){
	gulp.src('public/images/**/*')
		.pipe(imagemin())
		.pipe(gulp.dest('public/images'));
})

gulp.task('usemin', function(){
	gulp.src('public/**/*.html')
	.pipe(usemin({
		js: [uglify],
		css: [cssmin]
	}))
	.pipe(gulp.dest());
})

gulp.task('build-template', ['copy'], function(){ 
	return gulp.src('public/*.html')
		.pipe(clean())
		.pipe(htmlReplace({
			header: {
				src: gulp.src('public/templates/header.html'),
				tpl: '%s'
			},
			footer:{
				src: gulp.src('public/templates/footer.html'),
				tpl: '%s'
			},
			bannercases:{
				src: gulp.src('public/templates/banner-cases.html'),
				tpl: '%s'
			}
		}), 
		{
			keepBlockTags: true,
		})
		.pipe(gulp.dest('public'))
});

gulp.task('reload',['build-template'], function(){
	browserSync.reload();
});

gulp.task('build-less', function(){
	return gulp.src('dev/less/style.less')
    	.pipe(less().on('error', function(erro) {
              console.log('LESS, erro compilação: ' + erro.filename);
              console.log(erro.message);
            }))
    	.pipe(autoprefixer({
            browsers: ['last 20 versions'],
            cascade: false
        }))
    	.pipe(gulp.dest('dev/css'))
});

gulp.task('server', function() {
    browserSync.init({
        server: {
            baseDir: 'public'
        }
    });

    gulp.watch(['dev/**/*.less', 'dev/**/*.html','dev/**/*.js' ]).on('change', function(){
    	gulp.start('reload')
    });

});


