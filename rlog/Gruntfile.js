module.exports = function(grunt) {

  var pkg = grunt.file.readJSON('package.json');

  grunt.initConfig({
    pkg: pkg,

    connect: {
      server: {
        options: {
          port: 8888,
          keepalive: true,
          hostname: "*",
        },
      },
    },

    uglify: {
      options: {
        banner: '// <%= grunt.template.today("yyyy-mm-dd HH:MM") %>\n',
        preserveComments : "some",
        compress: {
          drop_console: true
        }
      },
      main: {
        files: {
          './dist/v1.js' : [
            './dist/<%=pkg.version%>-dev.js'
          ]
        }
      }
    },
    copy: {
      main: {
        src: 'src/rlog.js',
        dest: 'dist/<%=pkg.version%>-dev.js',
        options: {
          process: function (content, srcpath) {
            return content.replace(/@VERSION@/gm, pkg.version);
          },
        },
      },
    },

    clean : ['./dist/']
  });

  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.registerTask('default', ['clean', 'copy:main', 'uglify:main']);
  grunt.registerTask('server', ['connect:server']);

};