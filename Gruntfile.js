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
    grunt.registerTask('build', ['clean', 'jshint', 'html2js', 'concat', 'uglify']);
    //'bgShell:sbtcompile' , 'copy'


    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' + '<%= pkg.homepage ? " * " + pkg.homepage + "\\n" : "" %>' + ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;\n' + ' * Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %>\n */\n',
        builddir: "ng-modules/build",
        distdir: "ng-modules/dist",
        pubdir: "public/ng-modules",
        modules: {
            core: {
                src: "ng-modules/core"
            },
            home: {
                src: "ng-modules/home"
            },
            projects: {
                src: "ng-modules/projects"
            },
            crm: {
                src: "ng-modules/crm"
            }
        },
        clean: ['<%= builddir %>', '<%= distdir %>', '<%= pubdir %>'],
        jshint: {
            files: ['ng-modules/**/*.js', 'Gruntfile.js'],
            options: {
                curly: true,
                eqeqeq: true,
                immed: true,
                latedef: true,
                newcap: true,
                noarg: true,
                sub: true,
                boss: true,
                eqnull: true,
                globals: {}
            }
        },
        html2js: {
            options: {
                base: '.',
                rename: function(moduleName) {
                    return '/' + moduleName;
                }
            },
            core: {
                src: ['<%= modules.core.src %>/**/*.tpl.html'],
                dest: '<%= builddir %>/core/templates.js',
                module: 'core.templates'
            },
            home: {
                src: ['<%= modules.home.src %>/**/*.tpl.html'],
                dest: '<%= builddir %>/home/templates.js',
                module: 'home.templates'
            },
            projects: {
                src: ['<%= modules.projects.src %>/**/*.tpl.html'],
                dest: '<%= builddir %>/projects/templates.js',
                module: 'projects.templates'
            },
            crm: {
                src: ['<%= modules.crm.src %>/**/*.tpl.html'],
                dest: '<%= builddir %>/crm/templates.js',
                module: 'crm.templates'
            }
        },
        concat: {
            core: {
                src: ['<%= modules.core.src %>/**/*.js', '<%= builddir %>/core/**/*.js'],
                dest: '<%= distdir %>/core.js'
            },
            home: {
                src: ['<%= modules.home.src %>/**/*.js', '<%= builddir %>/home/**/*.js'],
                dest: '<%= distdir %>/home.js'
            },
            projects: {
                src: ['<%= modules.projects.src %>/**/*.js', '<%= builddir %>/projects/**/*.js'],
                dest: '<%= distdir %>/projects.js'
            },
            crm: {
                src: ['<%= modules.crm.src %>/**/*.js', '<%= builddir %>/crm/**/*.js'],
                dest: '<%= distdir %>/crm.js'
            }
        },
        uglify: {
            options: {
                banner: "<%= banner %>"
            },
            core: {
                src: ['<%= distdir %>/core.js'],
                dest: '<%= pubdir %>/core.min.js'
            },
            home: {
                src: ['<%= distdir %>/home.js'],
                dest: '<%= pubdir %>/home.min.js'
            },
            project: {
                src: ['<%= distdir %>/projects.js'],
                dest: '<%= pubdir %>/projects.min.js'
            },
            crm: {
                src: ['<%= distdir %>/crm.js'],
                dest: '<%= pubdir %>/crm.min.js'
            }
        },
        copy: {
            all: {
                files: [{
                    dest: '<%= pubdir %>',
                    src: '**',
                    expand: true,
                    cwd: '<%= distdir %>/'
                }]
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