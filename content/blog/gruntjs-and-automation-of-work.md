---
title: "Grunt.js and automation of work"
date: 2015-02-19
description: "How Grunt.js can help developers automate the same tedious tasks."
---

Working as a web application developer, there are certainly quite often situations when you are forced to perform the same tedious activities, such as: minifying files, compressing images, validating JS code, etc.
They are not the most pleasant aspects of a web developer's job and they take a lot of time.

Fortunately, the Grunt.js tool and its add-ons come to our aid.

Grunt.js is a task runner in which we can create a list of tasks (using ready-made ones or write your own) executed after running the appropriate command. This allows us to save a lot of time, automate our work and get rid of sometimes boring and tedious work. For example: SCSS compilation, CSS minification, JS error checking and much more.

The installation and configuration is very simple, although it requires some time and ideas on what we can improve (and we always can).

First, let's prepare our environment.

## What you need:
- Node.js - install the latest version. It will automatically add PATH to the console so that we can install modules with the command `npm install`.
- Grunt.js - after installing Node.js, execute the command `npm install -g grunt-cli` in the console.

## Let's start

We will divide the tasks into 2 environments - development and production. In the first one, there will be tasks performed with each change in the file, while in the production one, we will take care of slimming the files.

### Development environment

First, let's make things easier with SCSS. Let's take a look at the structure of tasks in Grunt. It may be scary, but don't worry - the whole thing is very simple!

```JavaScript
module.exports = function(grunt) {
    // Project configuration
    grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    task: {
        options: {

        },
        operations: {

        }
    }
  });
   grunt.loadNpmTasks('grunt-module'); // we load our modules
   grunt.registerTask('default', ['default task']); // tasks that are to be performed after typing grunt in the console
};
```

It would be good to explain here what the Gruntfile.js file is made of. The structure of the files is usually the same, it differs in tasks.

In the 4th line: `pkg: grunt.file.readJSON('package.json')`, we have a reference to the package.json file - this file contains information about which modules we use. Let's not worry about it for now.

Next is the initialization of the task. Tasks can be found on [Gruntjs.com](https://gruntjs.com/) or [npmjs.com](https://www.npmjs.com/).

The first thing to do is to compile the SCSS files. I'll use libsass for this - it's definitely faster than sass. We will download the grunt-libsass task with the command `npm install grunt-libsass --save-dev` (the `--save-dev` note adds the package to the package.json file, so it's worth using it). Time to create a task.

```JavaScript
libsass: { // main task
    files: {
        expand: true,
        src: ['css/style.scss'], // files on which the task is to be performed by default
        dest: '', // where to save the compiled css files (in this case it is the location of the original file)
        ext: '.css' // extension of output file
    }
},
```

The full list of settings is usually on the package page or on the author's github.

Now we need to tell grunt to load our task: `grunt.loadNpmTasks('grunt-libsass');` Now all you have to do is run `grunt libsass` to compile our files.

But it's still not enough. Why wouldn't it compile as soon as the file is written? And any in the folder with our *.scss* files?

And with the help comes the obligatory task: `watch`. Install: `npm install grunt-contrib-watch --save-dev`, configure:

```JavaScript
watch: {
    scss: { // we can specify any name
        files: ['css/*.scss'], // we define files to work with
        tasks: ['libsass'] // the tasks we perform on them
    }
}
```

Load the task: `grunt.loadNpmTasks('grunt-contrib-watch');`

Add watch to the default tasks (executed after running the grunt command grunt: `grunt.registerTask('default', ['watch']);`

Save, run grunt in the console and from now on, every modification of the *.scss* file in the *css* folder will cause automatic compilation.

Here is our entire gruntfile.js file:

```JavaScript
module.exports = function (grunt) {
    'use strict';
    grunt.initConfig({
        libsass: {
            files: {
                expand: true,
                src: ['css/style.scss'],
                dest: '',
                ext: '.css'
            }
        },
        watch: {
            libsass: {
                files: ['css/*.scss', 'css/**/*.scss'],
                tasks: ['libsass']
            }
        }
    });

    // loading selected modules for Grunt.js
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-libsass');

    // registering the default set of tasks for Grunt.js
    grunt.registerTask('default', ['watch']);
}; 
```

We can also define our tasks: `grunt.registerTask('task', ['task1', 'task2', 'task3']);`. It is similar with the execution of a single task and subtask: `grunt libsass` made us everything from libsass, but `grunt libsass:files` only what is in files.

Also add task grunt-notify to be notified of successful or failed compilation, after all we don't look at consoles all the time.

### Production environment

When generating a production environment, we should care about reducing the file size as much as possible - they do not have to be readable. With one command, we will deal with the issue of minifying css, js and html files. I'm assuming you're using `@import` in scss, so I'm skipping the file linking.

We will use the grunt-contrib-compressor task, it will work perfectly and is very easy to use. Everything cleaned and slimmed down will be kept in the dist folder. Here is the task:

```JavaScript
compressor:{
    css:{
        files: {
            'dist/css/style.css': ['css/style.css']
        }
    },
    js:{
        options: {
            mangle: true
        },
        files:grunt.file.expandMapping(['js/*.js','js/*/*.js'], '', {
            rename: function(base,file) {
                return 'dist/'+file;
            }
        })
    },
    html:{
        options:{
            removeComments: true,
            collapseWhitespace: true
        },
        files:{
            'dist/index.html': ['index.html']
        }
    }
},
```

I leave you a modification to do - minification of all HTML files :winking_face:.

At the end, our Gruntfile.js should look like this:

```JavaScript
module.exports = function (grunt) {
  'use strict';
  grunt.initConfig({
      libsass: {
          files: {
              expand: true,
              src: ['css/style.scss', 'css/icons.scss', 'css/modules/**/*.scss'],
              dest: '',
              ext: '.css'
          }
      },
      notify: {
          watch: {
              options: {
                  title: 'Done!',
                  message: 'Good job, no errors found!'
              }
          }
      },
      compressor:{
          css:{
              files: {
                  'dist/css/style.css': ['css/style.css']
              }
          },
          js:{
              options: {
                  mangle: true
              },
              files:grunt.file.expandMapping(['js/*.js','js/*/*.js'], '', {
                  rename: function(base,file) {
                      return 'dist/'+file;
                  }
              })
          },
          html:{
              options:{
                  removeComments: true,
                  collapseWhitespace: true
              },
              files:{
                  'dist/index.html': ['index.html']
              }
          }
      },
      watch: {
          libsass: {
              files: ['css/*.scss', 'css/**/*.scss'],
              tasks: ['libsass', 'notify']
          }
      }
  });
  
  // loading selected modules for Grunt.js
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-compressor');
  grunt.loadNpmTasks('grunt-libsass');
  grunt.loadNpmTasks('grunt-notify');

  // registering the default set of tasks for Grunt.js
  grunt.registerTask('default', ['watch', 'notify']);
  grunt.registerTask('prod', ['compressor', 'notify']);
};
```
