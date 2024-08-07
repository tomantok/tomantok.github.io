---
title: How to remove "npm fund" message
date: 2020-01-29
description: "A guide on how to permanently remove the \"npm fund\" message from your terminal."
---

If you have `npm` version 6.13.0 or above, you've probably seen this message while running `npm install`:

```
$ npm install

x packages are looking for funding
  run `npm fund` for details
```

What is this all about?

The packages for npm are created by the open source community. Hence, like any project, they needs financial support. But you probably don't need to see this message every single time you run `npm`, right?

**Here is a way to remove this message**

You can add a `--no-fund` flag every time you run `npm install`.

A better way is to disable this message globally. To do it execute this command:

```
npm config set fund false
```

This will add `fund=false` to your `~/.npmrc` global file at your $HOME directory ([more on the npmrc file](https://docs.npmjs.com/files/npmrc)). Now funding message is permanently disabled.

