---
title: "How to make jQuery faster"
date: 2015-07-23T22:25:41+02:00
description: "6 proven tips on how to achieve the maximum speed of jQuery applications."
---

There's nothing better than fast web applications, smooth user experiences and quick loading times. I will share with you 6 proven tips on how to achieve maximum speed when manipulating DOM element tree in an jQuery application.

## 1. Use ID
One of the simplest tips you can find in jQuery documentation is to use (where possible) selectors that search the DOM tree by element `ID`.

```JavaScript
$('#test').css('color', 'red');
```

The reason for this is simple - if we use the element `ID`, the jQuery simply uses the built-in `getElementById()` function instead of using the [Sizzle](http://sizzlejs.com/) selector engine. Obviously this function is faster. 

## 2. Right-to-left optimization

As recommended by the jQuery documentation, we should write selectors based on the "right to left" principle, which means putting the most specific element definitions on the right side of the selector.

```JavaScript
$('#test p.text').css('color', 'red');
```

This is due to the way the Sizzle engine works. It first analyzes what is on the right side of the selector, and then limits the results with what is on the left side.

## 3. Use specific tag names

If you absolutely have to look for elements by class name, 
this way is better

```JavaScript
$('p.text').css('color', 'red');
```

than this:

```JavaScript
$('.text').css('color', 'red');
```

This is because jQuery, knowing the name of the HTML tag, will first use the built-in function `getElementsByTagName()` (which is obviously faster), and only then will it use Sizzle to limit the results to the given class name.

## 4. Use selectors with context

To speed up the search for HTML elements using jQuery selectors, we can use context (of course, if we know it). Very often it is forgotten that such an option exists at all:

```JavaScript
$('p.text', '#test').css('color', 'red');
```

As you can see, as the second parameter of the `$()` function, we pass the second selector and it is the context for the first selector. Of course, this is especially fast if the context is a selector using an element ID (see tip **1**).

Instead of the context, you can also use the find() function.

```JavaScript
$('#test').find('p.text').css('color', 'red');
```

## 5. Always assign a selector to a variable

Or at least whenever you use it more than once:

```JavaScript
var text = $('#test').find('p.text');

text.css('color', 'red');
text.click(function() {
	alert('Done!');
});
```

In this way, you will protect yourself from unnecessary, multiple searches of the DOM tree only to find the same element over and over again.

## 6. Use chaining

A tip directly related to the previous one. jQuery allows you to run multiple jQuery commands, one after the other, on the same element.

```JavaScript
$('#test')
	.find('p.text')
	.css('color', 'red')
	.click(function() {
		alert('Done!');
	});
```

This way, browsers do not have to find the same element more than once. Tips **5** and **6** should be used interchangeably, depending on which is more suitable for the problem at the moment.




