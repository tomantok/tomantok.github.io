---
title: "Why you should write documentation?"
date: 2022-08-28
description: "Writing documentation is one of the most important elements of a programmer's work. There are several reasons why you should do it."
---

Do you like writing documentation? Neither do I. But there are several reasons why you should do it. Your efforts put into doing this will pay off later.

{{% toc %}}

Writing documentation is like doing your taxes, but with more technical jargon. Who wants to do that? :face_with_rolling_eyes: It turns out that the topic of documentation is terribly difficult for programmers - it is often treated "with little care" and dismissed with comments like "I write my code so clearly that no more explanations are needed!" or "No one ever reads it anyway!". 

However, documentation is one of the most important elements of a programmer's work. Here's why.

## Why is it worth writing documentation?

Creating documentation should be an integral part of programmers' work. Starting from working on a software project, you should first describe the basic assumptions of it. In the later phase of work, comments in the code are important. The ones that tell what a given part of code does and how to use it. Finally, don't forget to create user documentation or any other collective document summarizing the project and serving as a good starting point for people who will work on your project in the future.

Sounds like an awful lot of work, right? And that's probably why many programmers hate writing documentation. They treating it as one of the hated chores, writing it rather carelessly and poorly. However, it's really worth writing documentation for these few reasons:

### It'll come in handy later

In a few months, you won't remember what that line of code was supposed to do.

Programmers have it in common that they write a lot of code, and their skills are constantly improving - the code written six months ago usually looks much worse than the one written now. At the same time, it is often the case that you are working on different projects/modules at the same time. There's no way you'll know what this feature is all about after half a year! Especially if you don't write in a structured way but in the style of so-called spaghetti code.

Therefore, one of the most important reasons for creating documentation is to write it for yourself.

### You want your project to be used by others

If you want someone to use your work, they need to know how. Now think about board games - game authors write very extensive manuals. So that anyone who buys the game can read and understand how to play it. And your development project should also provide users with equally clear instructions.

Well-written user documentation also saves your time, because you do not have to answer the same questions of confused users many times. You simply refer them to the appropriate place in the documentation, where they will find all the information, tips and examples.

### You won't always be working alone

The bigger software projects get, the more hands are needed to maintain and develop them. When you work for a software company, you're likely to be working in a group of people. And yes, there is a good chance that you will split one project into smaller parts and you will be doing something completely different than your teammate, but you will almost certainly have to work together at some point. And it is for such situations that it is good to have internal documentation, i.e. one that will briefly guide other programmers through the project. And it will allow them to quickly get used to the subject and start working productively.

## How to write documentation?

### Automate

You're a programmer, so you're probably used to the fact that if you don't like something or some activities are repetitive and tedious, you try to automate them. You can do the same with documentation. There are many different tools available to process your code and comments on functions, classes, and methods. Then they produce readable and properly formatted text, which you can then use on your project page. Good comments in the code are essential here.

### Write the easy way

The documentation is not about showing great eloquence and using the most difficult possible expressions to describe a given program or selected solution. What's more, this type of text actually makes it even harder to understand the problem! Therefore, it is better to use as simple descriptions as possible, without unnecessary difficulties - as if you were explaining your work to a person who is just joining the team and has no knowledge about a given technology or project.

The simpler you can explain what your code does and how to use it, the more value your documentation brings to the user.

### Write before you even start coding

Part of the documentation - especially information about selected solutions and a description of why the decisions were made - is good to be described before you start writing the code.

Many ideas look great in your head, but when you describe your ideas, you'll be able to analyze them better, notice additional factors, and come up with a more thoughtful solution.

## Elements of good documentation

### User's (external)

The purpose of user documentation is to introduce your program to potential users, describe what problem it solves and how to use the tool. So it's a good idea to start with a summary of information about the project - what your program is for, how to install it, etc.

Then, it is worth describing in more detail how your code works - if it is a library that can be used by other programmers, provide a description of all functions, how it works. Be sure to add a section about requirements, i.e. what dependencies, additional libraries or packages are necessary.

Another important element of the user documentation are the usage examples. Give examples of situations in which your program can be used and how to do it. If necessary, include sample code and describe in detail all parameters that can be specified.

Finally, add a section of frequently asked questions, in which you will systematically collect more examples and answers to questions. Your documentation should also include contact information. In case of problems or questions, users need to know how to notify you.

### Developer's (internal)

If you work in a team that contributes to the software, the user documentation will probably not be enough. Also, comments in the code, while important, are not enough. Start by creating a "quick start guide", i.e. a short guide that will allow a person unfamiliar with the project to start working effectively in a short time. The guide may contain a description of the solutions used and their configuration as well as the assumptions and principles of code writing.

Important elements of internal documentation are also:
- references to the entry points of the source code (e.g. to implemented libraries or the main program code)
- links to unit tests and integration tests along with information on how best to perform them
- information about available tools (any tools useful for debugging, information about where to find program logs, etc.)
- list of needed tools and additional configuration files useful during work
- code style, i.e. a file describing the style in which a given code should be maintained (e.g. whether braces start in a new line and whether spaces or tabs are used)
- descriptions of potential bugs (if there are already known bugs and ways to fix them temporarily, it's worth mentioning them - you don't want everyone to spend their precious time debugging the code all over again)
- what does deployment and other operations related to code maintenance should look like

## Useful tools

Below you will find a list of tools that may be useful to you when working on user documentation or internal documentation.

- [Github Wiki](https://guides.github.com/features/wikis/) - a site loved by developers, it allows you to easily create wiki pages for your projects. It allows you to easily format the text and link to individual pages and repositories, and it is very easy to maintain, and above all - it is an inseparable part of the project repository. It is well suited for writing user documentation or internal documentation for developers working on a given project.
- [Github Pages](https://pages.github.com/) - for complex projects, Github also gives you the ability to create project landing pages, where you can also easily add documentation for users.
- [ReadTheDocs](https://readthedocs.org/) - a great tool for generating documentation based on comments in the code. The document created in this way can then be exported to various formats - HTML, PDF, ePub. Also it allows you to save several versions of the documentation.
- [NaturalDocs](https://www.naturaldocs.org/) - another tool for generating documentation based on specially formatted comments. It generates clear HTML and is available for 21 programming languages (but you can extend it of yourself).



