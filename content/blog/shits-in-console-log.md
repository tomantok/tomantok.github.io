---
title: "Shits in console.log()"
date: 2014-03-21
description: "A short post about the console.log() function and how some programmers use it."
---

Today a short post about the `console.log()` function and how some programmers use it. From time to time in applications using JavaScript, it happens to see a 'shit' word in the console. Where does it come from and how to get rid of it?

Let's face it, everyone sometimes uses it to quickly check whether the faulty code really runs in a given place, and if so, on what values of variables it operates. Sure, that's what the debugger is for, but theory is theory and practice is practice.

Perhaps I have some skewed professional experience, but based on myself and a few colleagues, I have noticed that the most common form of a breakpoint substitute looks like this:

```JavaScript
console.log("oh, shit!");
```

There would be nothing wrong with this, if not for the fact that when the "debugging" session grows a bit, sometimes some of this test code is pushed to the repository, and sometimes even to production.

And if the user of your application opens browser's console and sees "shit" in it... yes :grimacing_face:.

Fortunately, there is [UglifyJS](https://www.npmjs.com/package/uglify-js), and in it the `drop_console` option. Calling the compressor manually just pass this option and the console problem is solved.

```
uglifyjs input.js --compress drop_console -o output.min.js
```

And even better, configure Grunt's task:

```JavaScript
uglify: {
    input: {
        options: {
            mangle: true,
            compress: {
                drop_console: true
            }
        },
        files: {
            "output.min.js": ["input.js"]
        }
    }
}
```
