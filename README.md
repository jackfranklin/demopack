# Demopack

Fire up a pre-configured, live reloading Webpack server that supports React, (S)CSS and files for quick demos and tutorials.

Like create-react-app, but without needing to create a new project and `npm install` all the things.

## Installation

You should install `demopack` globally so you can easily run it in a directory.

Unfortunately `demopack` is taken on npm, so you need to install the scoped version:

```
npm install --global @jackfranklin/demopack
yarn global add @jackfranklin/demopack
```

## Usage

Given a folder with the following file in it:

```js
// index.js
console.log('Hello World!');
```

Running `demopack` in that directory will:

- Fire up a Webpack server on port 8080 (or another free port).
- Generate an `index.html` file that loads your JavaScript.
- Parses any JavaScript (including JSX support) and SCSS for you.

## What Demopack supports

Demopack has the following Webpack loaders configured out of the box:

- `babel-loader` which parses `.js` and `.jsx` files. It runs using `babel-preset-env`, `babel-preset-react` and `babel-preset-stage-0`. This should mean any fancy JS you want to write should be supported :)
- `sass-loader`, `css-loader` and `style-loader` to load your CSS and SASS (but regular CSS works just fine). If you pass `--css-modules` CSS Modules will be supported.
- `file-loader` to load `gif`, `png`, `jpg` and `svg` files.

Demopack will run a small local server and will refresh automatically when you change files. Any errors are shown in the terminal and in the page.

If there's anything you think should be supported out of the box, feel free to open an issue and we can discuss it.

## Configuration

The goal of `demopack` is to be preconfigured out of the box, but there are some options you can configure. Running `demopack --help` will show you these:

```
Options:
  --help          Show help                                            [boolean]

  --version       Show version number                                  [boolean]

  --open-browser  Automatically open the browser when you run demopack. [default: true]

  --css-modules   Enable CSS Modules support.                   [default: false]

  --entry         The JavaScript file that demopack should build from. [default: "index.js"]
```

## Prior art / credit

- Thanks to Eduard and his work on [create-elm-app](https://github.com/halfzebra/create-elm-app) which I took a bunch of Webpack code from to make the Demopack terminal output super tidy.
- Thanks also to everyone behind [create-react-app](https://github.com/facebookincubator/create-react-app) which was the inspiration behind Demopack initially.
