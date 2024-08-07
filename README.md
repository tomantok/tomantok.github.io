This website is built using [Hugo](https://gohugo.io/) v0.111.3+extended.

### Installation

```
$ npm i
```

### Local Development

```
$ npm run watch
$ hugo server --bind=0.0.0.0 -D --disableFastRender
```

This command starts a local development server with live reload.

### Build

```
$ npm run build
$ hugo --cleanDestinationDir --minify
```

This command generates static static content into the `public` directory.
