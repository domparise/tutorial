module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'src/<%= pkg.name %>.js',
        dest: 'build/<%= pkg.name %>.min.js'
      }
    },
    jshint: {
      src: '*.js'
    },
    watch: {
        jade: {
            files: ['views/**'],
            options: {
                livereload: true,
            },
        },
        js: {
            files: ['public/js/**', 'app/**/*.js'],
            tasks: ['jshint'],
            options: {
                livereload: true,
            },
        },
        html: {
            files: ['views/**'],
            options: {
                livereload: true,
            },
        },
        css: {
            files: ['public/css/**'],
            options: {
                livereload: true
            }
        }
    },
    nodemon: {
      dev: {
        options: {
          file: 'rpubsub.js',
          args: [],
          ignoredFiles: ['README.md', 'node_modules/**', '.DS_Store'],
          watchedExtensions: ['js'],
          watchedFolders: ['.'],
          debug: true,
          delayTime: 1,
          env: {
            PORT: 3000
          },
          cwd: __dirname
          }
        }
    },
    concurrent: {
        tasks: ['nodemon', 'watch'],
        options: {
            logConcurrentOutput: true
        }
    },
    jade: {
      options: {
        pretty: true,
        src: 'views/layout.jade',
        dest: 'views/layout.jade'
      }
    },
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-contrib-jade');

  grunt.registerTask('default', ['jshint', 'concurrent']);
};