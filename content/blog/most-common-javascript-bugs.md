---
title: "4 most common JavaScript bugs"
date: 2014-12-08
description: "Let's look at some reasons why it's quite easy for even an experienced developer to make mistake when writing JavaScript code."
---

If you are buidling web applications JavaScript is indisputably the language you use most often. In many people's opinion, it is the best programming language. (Unless you're a Python fanboy, in which case JavaScript is definitely the worst! :face_with_tears_of_joy:)

As much as I like JavaScript, its flexibility makes it easy to make simple mistakes. This happened to me quite often at the beginning due to the fact that I also use other more strongly typed programming languages on a daily basis.

Most problems related to writing code in JavaScript result from ignorance of the nuances of this language. Let's take a look at some reasons why it's pretty easy to make a mistake when writing Javascript code.

## 1. Variable scope

The assumption that variables are only available within a block of code enclosed by curly braces is one of the most common mistakes.

```JavaScript
var x = 1;

if (x === 1) {
    var y = 2;
}

alert(y);
```

A trivial example, but for some people it can be confusing... In a language such as C#, the above operation would be impossible - an error would occur at the compilation stage. But not in JavaScript! The number `2` will be displayed because, in JavaScript, the scope of variables is always the scope of function. A variable created inside curly braces is therefore also visible outside of it.

## 2. Transferring declarations

Another thing to keep in mind is something called hoisting. In JavaScript it is possible to use many `var` statements scattered throughout the code, but in fact they are treated as if they were declared at the top of the current scope.

```JavaScript
function myfunc () {
    alert(x);
    var x = 'some text';
    alert(x);
}

myfunc();
```

The above code will first output `undefined`, then `some text`. You'd expect an exception to be thrown instead. Well, no, because the declaration was moved to the beginning of function. The above code is actually identical to the following:

```JavaScript
function myfunc () {
    var x;
    alert(x);
    x = 'some text';
    alert(x);
}

myfunc();
```
Thus, all variables should be declared at the beginning of a function to avoid unnecessary surprises! It's also good to initialize them right away since it doesn't happen automatically like in other programming languages. 

## 3. Problems with `this`

This problem often occurs i.a. when using callback functions that are also methods of an object. Here's an example:

```JavaScript
var test = {};
test.text = 'some text',
test.showDeferred = function(){
    alert(this.text);
};

setTimeout(test.showDeferred, 100);
```

The above code will output (with a delay) the text `undefined`. Why? Well, because the context of the call matters, and in the example above, the context of calling the `test.showDeferred` function is the global space - the `setTimeout` function belongs to this space and calls the callback functions in it. One solution to this problem may be to use the `apply`/`call`/`bind` function:

```JavaScript
var test = {};
test.text = 'some text',
test.showDeferred = function(){
    alert(this.text);
};

setTimeout(test.showDeferred.bind(test), 100);
```

## 4. Comparison operators

Something that causes a lot of problems are, comparison operators, which behave a little differently than in other programming languages.

When comparing two values using operators like `==` or `!=` JavaScript apply implicit casting. Therefore, the type of variable is not entirely important. Let's look at an example:

```JavaScript
alert(false == '0');
alert(null == undefined);
alert("\t\r\n" == 0);
alert('' == 0);
```

All of the above statements return `true`. So in most cases use operators like `===` or `!==`. They check both type and value. So their operation is more predictable.

## Summary

These are just the 4 most common (in my opinion) mistakes made by JavaScript programmers. But there are so many more that I could have added. Like forgetting to include the semicolon at the end of a line of code :winking_face:.

Most of the complaints about JavaScript come from ignorance about how the language works and about some rules that apply to it. Of course these problems are very easy to solve.
