var gulp = require('gulp');
var rename = require('gulp-rename');
var replace = require('gulp-replace');

var compDir = './src/components/';
var defaultOrigin = 'Sample';
var origin = '';
var target = '';

function getPath() {
	return compDir + origin + '/*.*';
}

function exist(path) {
	try {
		var f = require(path);
		return true;
	} catch (err) {
		return false;
	}
}

function getRepStr(char, str) {
	if(char === char.toUpperCase()) {
		return str.slice(0, 1).toUpperCase() + str.slice(1);
	}
	return  str.slice(0, 1).toLowerCase() + str.slice(1);
}

gulp.task('copy', function(cb) {
	if(exist(compDir + target + '.js')) {
		console.log(' . . . . . error: component ' + target + ' exists');
		cb();
		return;
	}
	var rn = new RegExp('(' + origin.slice(0, 1).toUpperCase() + '|' + origin.slice(0, 1).toLowerCase() + ')' + origin.substr(1), 'g');
	return gulp.src(getPath())
		.pipe(rename(function(path) {
			if(path.basename === 'package') {
				return;
			}
			path.basename = target;
		}))
		.pipe(replace(rn, function(s0, s1){
			return getRepStr(s1, target);
		}))
		.pipe(gulp.dest(compDir));
});

gulp.task('genComp', function(cb) {
	target = process.argv[3].slice(2);
	origin = process.argv[4] && process.argv[4].slice(2) || defaultOrigin;
	console.log('from ', origin, ' to ', target);

	gulp.start('copy', function(err) {
		if(err) {
			console.log('error occurs:', err);
		} else {
			console.log('make new component successfully');
		}
		cb();
	});

});