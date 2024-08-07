---
title: "Programmer, be lazy!"
date: 2018-01-18
description: "Laziness is one of the most important things for a programmer. You should learn it as soon as possible."
---

After logical thinking, problem-solving skills, and programming language knowledge, laziness is one of the most important things for a programmer. You should learn it as soon as possible.

## What?!

Yes, laziness should be one of the basic skills of a programmer. And both the junior and the senior developer who builds large project in assembler (if such developers exist :grinning_face_with_smiling_eyes:).

However, I'm not talking about the type of laziness you may have in mind. When you won't do this because it's boring. Or you won't do that because playing on Xbox is more fun for you.

Instead, I'm referring to the creative type of laziness that is about finding the most efficient way of doing something. It's about taking the time to find the best approach or the best tool for a job that will save you time and energy in the long run.

{{% callout type="info" %}}
> “I choose a lazy person to do a hard job. Because a lazy person will find an easy way to do it.”<br>
> — <cite>Bill Gates</cite>
{{% /callout %}}

In software industry, we have to solve problems and create new solutions. As in any other job, there are a lot of boring and monotonous activities that must be done but hardly anyone wants to do them. You may ask yourself how to eliminate them from your live?

## Lazy programmer's tricks

Here are my tried and tested tricks that may not seem very useful at first glance. But in the long run, they saved me a lot of tedious, unproductive work.

### 1. Tests

It is important to understand what tests are and how they can be helpful if done correctly. It may seem that writing unit tests contradicts the idea of a lazy programmer. You have to write additional code, which does not introduce any new functionality. However, tests allow you to save time when looking for a bug and developing the application at a later stage. If you write well-written automated tests, you can control regression without having to constantly click on the application to check if there are any errors.

### 2. Building automation

The days of manually installing applications and libraries on the server are long gone. Now we have Docker and some other tools that make our work easier. Even when using them, remember to keep the documentation updated so that new users don't have trouble setting up the environment. Also, if operating in this environment requires the use of several commands, it is worth putting them into a separate makefile (package.json) to group them under one command.

### 3. Use libraries/components

Thanks to the Github platform, we have access to many ready-made solutions that we can use for free. It is worth taking advantage of this instead of trying to reinvent the wheel. In 90% of cases, such a library is enough, which will save us a lot of time that we would have to spend on its correct implementation. The remaining 10% are situations when we need an unusual application or we have not found anything that meets the project's requirements. Of course, don't overdo it, and downloading tons of tiny libraries like `is-odd`, `is-even`, `is-number`, etc. may do more harm than good.

### 4. Use the right tools

For the most common tasks related to software development, there are a dedicated CLIs to streamline the process of creating, refactoring, expanding, building and deployment the application. In basic situations, we won't need to create our own tools, and we really shouldn't.

There are thousands of these little tools/scripts to improve our work. My current favorite is [Prettier](https://www.npmjs.com/package/prettier), which formats source code. It's a plain NPM package and we can configure it as package scripts so that everyone will have the same formatted code. In addition, we can attach a formatting check to our CI on Github. This means that we don't have to think about formatting because we have one command that will fix everything and even if we forget it will be checked when doing PR to the repository.

### 5. Master your IDE

Modern IDEs are real combine harvesters that offer a range of functionalities. At first, it's hard to find your way around all these keyboard shortcuts, possible configurations or hundreds of plug-ins and extensions. It's worth spending some time getting used to the programming environment and learning how to use it effectively. For example, learn keyboard shortcuts, configure the environment, or add your own code snippets. You'll be able to code faster and more efficiently. After all, you spend most of your work day using this IDE.

## Benefits

It may seem like you have to do a lot of work to be a lazy programmer :grinning_face_with_smiling_eyes:. However, after mastering all these elements, it turns out that we have much more time for other activities. And work becomes more pleasant.
