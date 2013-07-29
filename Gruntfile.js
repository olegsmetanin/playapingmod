module.exports = function(grunt) {

    // https://github.com/angular-app/angular-app/blob/master/client/gruntFile.js

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-html2js');
    grunt.loadNpmTasks('grunt-bg-shell');

    grunt.registerTask('default', ['build']);
    grunt.registerTask('build', ['clean', 'html2js', 'concat']);
    //'bgShell:sbtcompile'

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        builddir: "modules/build",
        distdir: "public/modules",
        modules: {
            core: {
              src: "modules/core",
              dest: '<%= distdir %>/core.js'
            },
            demands: {
              src: "modules/demands",
              dest: '<%= distdir %>/demands.js'
            }
        },
        clean: ['<%= builddir %>', '<%= distdir %>'],
        html2js: {
            options: {
            },
            core: {
                options: {
                    base: '.'
                },
                src: ['<%= modules.core.src %>/**/*.tpl.html'],
                dest: '<%= builddir %>/core/templates.js',
                module: 'core.templates'
            },
            demands: {
                options: {
                    base: '.'
                },
                src: ['<%= modules.demands.src %>/**/*.tpl.html'],
                dest: '<%= builddir %>/demands/templates.js',
                module: 'demands.templates'
            },
        },

        concat: {
            core: {
                src: ['<%= modules.core.src %>/**/*.js', '<%= builddir %>/core/**/*.js'],
                dest: '<%= modules.core.dest %>'
            },
            demands: {
                src: ['<%= modules.demands.src %>/**/*.js', '<%= builddir %>/demands/**/*.js'],
                dest: '<%= modules.demands.dest %>'
            }

        },
        bgShell: {
            _defaults: {
                bg: true
            },
            sbtcompile: {
                cmd: './sbt compile',
                bg: false
            }
        }
    });


};