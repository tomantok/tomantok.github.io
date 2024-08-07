---
title: "JavaScript: toString() vs valueOf()"
date: 2014-03-03
description: "What is the real difference between toString() and valueOf() methods? And when will JavaScript use one method and when the other?"
---

The difference between `toString()` and `valueOf()` is simple: the former is used to convert an object to a string, and the latter to a ~~number~~ primitive value (thus a string or a number). The obvious ends there. When will JavaScript use one method and when the other?

Let's assume we're going to use the following variables:

```JavaScript
var
    s = {
        toString: function() { return "abc"; }
    },
    v = {
        valueOf: function() { return "123"; }
    },
    sv = {
        toString: function() { return "zyx"; },
        valueOf: function() { return 987; }
    };
```

As you can see, we have a variable defining only `toString()`, a second defining only `valueOf()`, and a third defining both methods.

## Operator +

The `+` operator is used for concatenation and addition. JavaScript will prefer `valueOf()` whenever possible.

```JavaScript
> s + v + sv
'abc123987'
```

So:
- when only the `toString()` method is defined, it is used,
- when only the `valueOf()` method is defined, it is used,
- when both methods are defined, `valueOf()` is used.

## Array.prototype.join()

The `join()` method is used to combine the elements of an array into one string. **Only** the `toString()` method will be used on elements.

```JavaScript
> [s, v, sv].join()
'abc[object Object]zyx'
```

So:
- when only the `toString()` method is defined, it is used
- when only the `valueOf()` method is defined, the prototype `toString()` method is used
- when both methods are defined, `toString()` is used
