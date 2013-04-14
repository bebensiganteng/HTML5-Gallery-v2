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
                    'src/js/app/utils',
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
                    'src/js/app/utils',
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
        // php: {
        //     dist: {
        //         options: {
        //             port: '5000',
        //             hostname: '0.0.0.0'
        //         }
        //     }
        // },
        // FUTURE: change this 
        // https://github.com/anodynos/uRequire
        requirejs: {
            compile: {
                options: {
                    baseUrl: ".",
                    appDir: "src",
                    dir: "dist",
                    mainConfigFile: "src/js/main.js",
                    paths: {
                        jquery: "empty:",
                    },
                    map: {
                        '*': {
                                'text': 'libs/text',
                                'json': 'libs/json',
                                'libs/pixi': 'libs/pixi',
                                'libs/backbone': 'libs/backbone-min',
                                'libs/underscore': 'libs/underscore',
                                'libs/jquery.transit': 'libs/jquery.transit.min',
                                'libs/stately': 'libs/Stately',
                                'libs/preloadjs': 'libs/preloadjs-0.3.0.min',
                                'libs/jquery.lazyload': 'libs/jquery.lazyload.min',
                                'libs/tweenlite': 'libs/TweenLite.min',
                                'libs/easepack': 'libs/EasePack.min',
                                'libs/jquery.keyframes': 'libs/jquery.keyframes'
                            }
                    },
                    shim: {
                            'libs/jquery.keyframes': {
                                deps: ['jquery']
                            },
                            'libs/jquery.transit': {
                                deps: ['jquery']
                            },
                            'libs/jquery.lazyload': {
                                deps: ['jquery']
                            },
                            'libs/tweenlite': {
                                deps: ['jquery']
                            },
                            'libs/backbone': {
                                deps: ['libs/underscore', 'jquery'],
                                exports: 'Backbone'
                            },
                            'libs/underscore': {
                                exports: '_'
                            }
                    },
                    optimize: 'uglify2',
                    generateSourceMaps: true,
                    preserveLicenseComments: false,
                    modules: [{
                        name: 'js/main'
                    }]
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
        'requirejs'
    ])
}