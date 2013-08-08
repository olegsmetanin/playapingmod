module.exports = function(grunt) {

    // https://github.com/angular-app/angular-app/blob/master/client/gruntFile.js
    // https://github.com/yearofmoo-articles/AngularJS-Testing-Article

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-html2js');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-bg-shell');

    grunt.registerTask('default', ['build']);
    grunt.registerTask('build', ['clean', 'jshint', 'html2js', 'concat', 'uglify', 'copy']);
    //'bgShell:sbtcompile' , 'copy'


    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' + '<%= pkg.homepage ? " * " + pkg.homepage + "\\n" : "" %>' + ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;\n' + ' * Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %>\n */\n',
        modulesdir: "ng-app/modules",
        builddir: "<%= modulesdir %>/build",
        distdir: "<%= modulesdir %>/dist",
        pubdir: "public/ng-app",

        modules: {
            core: {
                src: "<%= modulesdir %>/core"
            },
            home: {
                src: "<%= modulesdir %>/home"
            },
            crm: {
                src: "<%= modulesdir %>/crm"
            }
        },
        clean: ['<%= builddir %>', '<%= distdir %>', '<%= pubdir %>'],
        jshint: {
            files: ['<%= modulesdir %>/**/*.js', 'Gruntfile.js'],
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
            crm: {
                src: ['<%= modules.crm.src %>/**/*.tpl.html'],
                dest: '<%= builddir %>/crm/templates.js',
                module: 'crm.templates'
            }
        },
        concat: {
            js: {
                src: [
                    "ng-app/components/jquery-1.9.1/jquery.min.js",
                    "ng-app/components/jquery-ui-1.10.3/ui/minified/jquery-ui.min.js",
                    "ng-app/components/bootstrap-2.3.2/js/bootstrap.min.js",
                    "ng-app/components/select2-3.4.1/select2.min.js",
                    "ng-app/components/angular-1.0.7/angular.min.js",
                    "ng-app/components/angular-mocks/angular-mocks.js",
                    "ng-app/components/angular-ui-router-0.0.1/release/angular-ui-router.min.js",
                    "ng-app/components/angular-ui-date-0.0.3/src/date.js",
                    "ng-app/components/angular-ui-select2-0.0.2/src/select2.js",
                    "ng-app/components/angular-ui-bootstrap-0.5.0/ui-bootstrap-0.5.0.min.js",
                    "ng-app/components/angular-ui-bootstrap-0.5.0/ui-bootstrap-tpls-0.5.0.min.js"
                ],
                dest: '<%= pubdir %>/js.min.js'
            },
            styles: {
                src: [
                    "ng-app/components/bootstrap-2.3.2/css/bootstrap.min.css",
                    "ng-app/components/bootstrap-2.3.2/css/bootstrap-responsive.min.css",
                    "ng-app/components/select2-3.4.1/select2.css",
                    "ng-app/components/jquery-ui-1.10.3/themes/smoothness/jquery-ui.css",
                    "ng-app/assets/ago-filter-builder.css"
                ],
                dest: "<%= pubdir %>/css/styles.min.css"
            },
            core: {
                src: ['<%= modules.core.src %>/**/*.js', '<%= builddir %>/core/**/*.js'],
                dest: '<%= distdir %>/core.js'
            },
            home: {
                src: ['<%= modules.home.src %>/**/*.js', '<%= builddir %>/home/**/*.js'],
                dest: '<%= distdir %>/home.js'
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
            crm: {
                src: ['<%= distdir %>/crm.js'],
                dest: '<%= pubdir %>/crm.min.js'
            }
        },
        copy: {
            bootstrap: {
                files: [{
                    cwd: 'ng-app/components/bootstrap-2.3.2/img',
                    dest: '<%= pubdir %>/img',
                    src: '**',
                    expand: true
                }]
            },
            select2: {
                files: [{
                    cwd: 'ng-app/components/select2-3.4.1/',
                    dest: '<%= pubdir %>/css',
                    src: ['*.png','*.gif'],
                    expand: true
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