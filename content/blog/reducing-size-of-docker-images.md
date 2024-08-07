---
title: "Reducing the size of Docker images"
date: 2022-12-17
description: "Images for Docker containers can be really heavy. You can significantly reduce their size by using these simple tricks."
---

Images for Docker containers can be really heavy. You can find images weighing up to 5 GB or more. It can be a problem, both for developers using Docker locally and for those setting up apps in production.

In this post I'll show you a few simple ways to reduce the size of Docker images.

## Why such a size?

The Docker container simulates a separate operating system for virtualization purposes. Therefore, it must first of all contain the operating system (usually Linux), the libraries necessary to run the service, and the service itself (build or source code). However, as it turns out - we don't always need all this in the container at the final stage, which is deploy.

## What weighs the most?

It really depends on the environment and runtime of our application. In the case of applications using Node.js, the problem will certainly be the size of the node_modules folder containing the dependencies of our project. Also, in many cases, Linux images alone can weigh up to 300-400 MB.

How can you make them smaller?

### 1. Clean it up

At the beginning, you should remove unnecessary files from the image, i.e. those that are not used by the build process, runtime, or developer in the container terminal. Another examples are documentation, local environment configuration files (e.g. virtual environment in Python) or files related to DevOps, such as Dockerfile itself or service configurations in services such as AWS or Heroku . We can place the appropriate files in the .dockerignore file, so that the Docker daemon does not copy them to the image during building, or copy only selected files in the Dockerfile itself.

### 2. The base image

Okay, we've removed a few megabytes from our image, but what if the base image alone weighs, for example, 0.5GB? With the help comes Linux Alpine, which is a Linux base image, which size is only 5MB. This is a great base for images that should contain only what is necessary. From [hub.docker.com](https://hub.docker.com) we are able to download Python, Node, Golang and many other images. Their size is much smaller due to the fact that they are based on Linux Alpine.

For comparison:

- **python:3.10-rc-bullseye** is around 332MB of size
- **python:3.10.0-alpine** is only 16MB of size
- **node:20.5.0-bookworm-slim** is around 76MB of size
- **node:20.5.0-alpine** is only 52MB

Images tagged as *slim* will also work well. However in most cases Alpine remains the lightest option.

### 3. Dependencies

Dependencies make up a significant portion of our image size. So it doesn't make sense to install dependencies that we don't need in the production image. We need to focus on the dependency installation command in our Dockerfile. Solutions will vary depending on language and package manager we are using. In the case of Node and Yarn, we distinguish between regular and development dependencies (e.g. testing libraries). If we're adding a library needed by developers, we should use:
```
npm install <package-name> --save-dev
```

Then the installed library goes to the devDependencies category in package.json and is ignored if during a NPM installation, we pass the --production option, like this:

```
npm install --production
```

In the case of projects using Python and the default manager (pip), it may be a good idea to separate some of the dependencies from requirements.txt to requirements_dev.txt, so that only necessary packages are installed when building the image.

### 4. Multi-stage build

Docker offers us an interesting feature - multi-stage build. This is a method of building an image with multiple intermediate images. This way, we can create a build layer that contains all the dependencies needed for building and installing, and a deploy layer that just contains the code and dependencies needed for running the application. Here's how it's done in Dockerfile:

```
FROM <image>:<tag> as build-stage
... here we install temporary dependencies, compile the code, etc.

FROM <image>:<tag>
... here we copy only needed files from build-stage
CMD [...]
```

We copy files between stages using:

```
COPY --from=<stage name, build-stage> <src> <dest>
```

By doing this, we can save a lot of space in the final image.

## Conclusion

The use of the above methods may significally reduce the size of the Docker image. There are many other methods, but they often depend on the technologies used or the exact requirements of a given project. However, as you can see, the right configuration saves a lot of space on the disk or in the cloud.


