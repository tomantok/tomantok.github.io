---
title: "jQuery Deferred and Promise objects"
date: 2014-07-27
description: "How Deferred and Promise objects in jQuery can help with AJAX calls."
---

The jQuery Deffered and Promise objects are most often used for asynchronous AJAX calls. They can be very useful. Let's look at a simple code example that implements such a call using the jQuery library:

```javascript
$.ajax({
    url: '/actions/get',
    data: {
        index: 1
    },
    type: 'POST',
    success: function(result){
        alert('success with result: ' + result);
    },
    error: function(){
        alert('error');
    }
});
```

The above solution is well known to everyone. It allows you to pass two callback functions, handling the AJAX call completed with success and error. However, such an interface is not standard, and this approach makes it impossible to register more than one callback.

## How to do it better?

This is where the ```deferred``` object comes in handy. Let's see what the jQuery documentation tells us about it:

> The Deferred object, introduced in jQuery 1.5, is a chainable utility object created by calling the ```jQuery.Deferred()``` method. It can register multiple callbacks into callback queues, invoke callback queues, and relay the success or failure state of any synchronous or asynchronous function. [^1]

[^1]: [Deferred Object in jQuery Documentation](https://api.jquery.com/category/deferred-object/)

So as you can see, this is a special object that allows you to register many callback functions to callback queues. It also allows you to call these queues and pass success and failure status to each synchronous and asynchronous operation.

## Example

We already know the definition. But it's better to see how it works in practice. Below is the simplest example that can be:

```javascript
var def = $.Deferred();

def.done(function (result) {
    alert(result);
}).done(function (value){
    alert('and... ' + value);
});

def.resolve('done!');
```

As you can see, we create the ```deferred``` object by calling a special constructor available in the jQuery global object. Then we register a callback function - in the example we register such a callback for the case when the operation succeeds. You may have noticed that the ```done``` function is called twice here. This is how subsequent callbacks are registered. In the last line, we see an example of using such a callback chain - in this case, all callback functions registered with the ```done()``` function will be called and a parameter (or parameters) will be passed to them, which will be passed to the ```resolve``` function.

## Error handling

Example for the error situation below:

```javascript
var def = $.Deferred();

def.fail(function (result) {
    alert(result);
}).fail(function (value){
    alert('and... ' + value);
});

def.reject('error!');
```

As you can see, we call ```fail``` instead of ```done```, and we call ```reject``` instead of ```resolve```. Now, let's move on to the most important feature of this object, the ```promise()``` function.

## ```promise``` function

The ```promise()``` function of the ```deferred``` object returns another special object (named the same as the function that returns it). This object is very similar to the ```deferred``` object, but it only has functions responsible for registering callbacks, but does not allow for state control (such as ```resolve``` or ```reject```). It allows others to register callback functions to our function, but at the same time prevents us from controlling the state.

Anyway, see for yourself how it works with an example:

```javascript
function test() {
    var def = $.Deferred();

    setTimeout(function(){
        def.resolve('done!');
    }, 3000);

    return def.promise();
}

test().done(function(value){
    alert(value);
});
```

The ```test()``` function creates a ```deferred``` object. Then the ```resolve``` function is called - however it is called with a delay. Finally, we return the ```promise``` object. We could just return a ```deferred``` object here, but then someone who would call this function could change this object (call ```resolve``` / ```reject```, for example). Here it can only record callbacks.

Finally, we put our code into practice. As ```test()``` returns a ```promise``` object, we can record callbacks on it that will handle the asynchronous operation.

## Usage with AJAX function

The jQuery ```ajax``` function also returns a ```promise``` object, so we can use it the same way! Let's see what it would look like for the ```ajax``` function call from the beginning of the entry:

```javascript
var result = $.ajax({
    url: '/actions/get',
    data: {
        index: 1
    },
    type: 'POST'
});

result.done(function (value){
     alert('success with result: ' + value);
});

result.fail(function (value){
    alert('error');
});
```

It is worth learning how to use jQuery Deffered and Promise objects. They give more possibilities than described in this post.

It's also worth to read about the [```pipe()```](https://api.jquery.com/deferred.pipe/) or [```$.when()```](https://api.jquery.com/jquery.when/) functions.




