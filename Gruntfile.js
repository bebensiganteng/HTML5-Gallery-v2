/*

Config references
-------------------
- https://github.com/chaplinjs/chaplin/blob/master/Gruntfile.coffee
- https://github.com/thanpolas/superstartup/blob/master/Gruntfile.js

*/

var path = require('path');

module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-contrib-coffee');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-stylus');
    grunt.loadNpmTasks('grunt-regarde');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-php');
    grunt.loadNpmTasks('grunt-contrib-livereload');

    var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;

    var folderMount = function folderMount(connect, point) {
        return connect.static(path.resolve(point));
    };

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        regarde: {
            // TODO: use template engine like JADE?
            // https://github.com/gruntjs/grunt-contrib-jade
            html: {
                files: ['**/*.html'],
                tasks: ['livereload']
            },
            php: {
                files: ['**/*.php'],
                tasks: ['livereload']
            },
            scripts: {
                files: ['**/*.coffee'],
                tasks: ['coffee', 'livereload']
            },
            style: {
                files: ['**/*.styl'],
                tasks: ['stylus', 'livereload']
            }
        },
        // Backbone structure
        coffee: {
            all:{
                expand:true,
                cwd:[
                    'src/js',
                    'src/js/app/collection',
                    'src/js/app/controllers',
                    'src/js/app/models',
                    'src/js/app/views',
                    'src/js/app/views/pc',
                    'src/js/app/views/mobile'
                ],
                src:['**/*.coffee'],
                dest:[
                    'src/js',
                    'src/js/app/collection',
                    'src/js/app/controllers',
                    'src/js/app/models',
                    'src/js/app/views',
                    'src/js/app/views/pc',
                    'src/js/app/views/mobile'
                ],
                ext:'.js'
            }
        },
        stylus: {
            compile: {
                files: {
                    'src/css/main.css': ['src/css/*.styl']
                }
            }
        },
        connect: {
            livereload: {
                options: {
                    port: 8000,
                        middleware: function(connect) {
                            return [lrSnippet, folderMount(connect, '.')];
                }
            }
          }
        },
        php: {
            dist: {
                options: {
                    port: '5000',
                    hostname: '0.0.0.0'
                }
            }
        },
        // FUTURE: change this 
        // https://github.com/anodynos/uRequire
        requirejs: {
            options: {
                baseUrl: "src",
                mainConfigFile: "src/js/main.js"
            },
            production: {
                options: {
                    out: "path/to/production.js"
                }
            },
            development: {
                options: {
                    out: "path/to/development.js"
                }
            }
        }
    })

    grunt.registerTask('default',[ 
        'coffee', 
        'stylus'
    ])

    // If you want to use connect
    grunt.registerTask('development', [
        'livereload-start',
        'connect:livereload',
        'regarde'
    ])

    // TODO: doesnt work, fix later
    // grunt.registerTask('development', [
    //     'php',
    //     'regarde'
    // ])
    
    grunt.registerTask('production', [
        'requirejs:production'
    ])
}