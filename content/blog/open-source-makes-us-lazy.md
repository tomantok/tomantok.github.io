---
title: "Open Source makes us lazy"
date: 2019-11-14
description: "As programmers, we use a lot of open source libraries, frameworks, and other tools every day. This makes us a bit lazy and we write low-quality code."
---

As programmers, we use a lot of open source libraries, frameworks, and other tools every day. React, Angular, Vue, Node.js, GoLang, Laravel - too many to list. Thanks to the work of individual programmers and entire teams, we can use these solutions for free and speed up our daily work.

But don't you think this makes us a bit lazy? I guess you could say that.

And sometimes we become too dependent on someone else's code.

## What's the problem?

Isn't it often the case that, when you are writing code and encounter a problem, your first thought is "Maybe there's a library for that?".

I have nothing against small libraries that provide specific solutions. But should a few lines of code be packed as an npm package? And then downloaded as dependency to a project?

The npm package system has made it easier for developers to share code and collaborate on projects without having to reinvent the wheel. However, it has also made it easier for developers to download and install libraries without considering whether the library is actually necessary or appropriate for their project.

Here is an example. This is what the whole code of the [is-even](https://github.com/jonschlinkert/is-even) library looks like:

```JavaScript
var isOdd = require('is-odd');

module.exports = function isEven(i) {
  return !isOdd(i);
};
```

So we add a new library to the project to invert the number value. And it turns out that this library is used by over 3,000 repositories according to Github ([link to the source](https://github.com/jonschlinkert/is-number/network/dependents)). Don't you think that's a bit too much for such a one-liner? Moreover, is-odd depends on another library - 'is-number'. There are 6 million repositories on Github that depend on this library. 

I keep wondering why instead of copy-and-paste a small function, we decide to download another dependency over which we have no control. I guess it's just human nature to look for shortcuts, even when they don't actually save us any time! And then there are memes that by downloading `node_modules` we download half of the internet. :grinning_face_with_smiling_eyes:

![Node.js modules meme](/img/blog/node-modules-69777663.jpg)

Now let's take another thing. There is something we can call an interface to an interface to an interface to a library. 

As an example, I will give the mongoose and mongodb libraries. Mongodb is the official library for connecting to the MongoDB database from the creators, while mongoose is a wrapper on mongodb and provides another layer of abstraction. Probably an interface for mongoose can be found on Github. 

The problem with such interfaces occurs when the original solution (in this case, the MongoDB database) has a bug or a new feature  (which we of course need). And now, depending on how many such interfaces we have, the time in which we'll get this new feature extends from very quickly to never (if the library is no longer being developed). And just like in my example, mongodb, as it is from the creators, will get a fix very soon, in mongoose we will have to wait because:

1. depends on mongodb
2. it may turn out that it is necessary to rewrite part of the abstraction that did not include, for example: some parameter or situation.

## Control over package.json

In fact, my purpose here is to encourage you to think about what you include in our projects. When you're adding a new dependency, think about whether you really need yet another library to perform a simple task. Maybe it can be done with a simple function, or by copying the code from the library we want to use, e.g. is-even, is-odd, etc. There are several advantages of such an approach:

* full control - we can modify the code to fit our needs  
* greater security - the less external dependencies we have, the higher security of our code
* smaller size of node_modules 

On [bundlephobia.com](https://bundlephobia.com/) you can check the size of the library and how many dependencies it has. A very useful tool when you have two libraries and you have to choose one of them. It is best to choose the one with the smallest size and the minimum number of dependencies. Also if you are considering a library that adds another interface, ask yourself if you really need it. Because if you don't use it fully or you see that there will be problems with something, maybe it's worth using the original solution?



