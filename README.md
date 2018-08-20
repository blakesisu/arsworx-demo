# Sisu React Boilerplate

## Stack

### Client
- [React](https://facebook.github.io/react/) - Build reactive UI's with ease
- [React Router](https://github.com/ReactTraining/react-router) - Declarative routing for React
- [Redux](http://redux.js.org/) - Manage the application state by enforce unidirectional data flows. Including:
	-  Hot reloadable state
	-  Time-travel debugging
	-  State persistence
	-  Undo/Redo
	-  Sync state through network
- [Immer](https://github.com/mweststrate/immer) - Create the next immutable state by mutating the current one
- [Axios](https://github.com/mzabriskie/axios) - Promise based HTTP client to connect to API
- [Lodash](https://lodash.com/) - Utility library (cherry-picking select methods)
- [Modernizr](https://modernizr.com) - Browser feature detection (touch-events)

### Development

- [Create React App](https://github.com/facebook/create-react-app) - Create React apps with no build configuration
- [Yarn](https://yarnpkg.com/en/) - Improved dependency management
- [Webpack](https://webpack.github.io) - Automatic common module chunk bundling and tree shaking
- [Babel](https://babeljs.io/) - Use the latest ECMAScript features
- [Sass](http://sass-lang.com/) - Easier CSS dev with variables, nesting, partials, import, mixins, inheritance, and operators
- [PostCSS](http://postcss.org/) - Autoprefix CSS
- [ESLint](http://eslint.org/) - Catch syntax and style issues

## Quick Start

1. Install [Node v6.9+](https://nodejs.org/en/) globally if you don't have it already
1. Install [Yarn](https://yarnpkg.com/) globally if you don't have it already
1. Clone or download this repo
1. Using terminal change directories to the project root `cd /path/to/root`
1. Install dependencies by running `yarn`
1. Run any of the available commands found below

## Commands

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](#running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](#deployment) for more information.

### `yarn format`

Format the code using [Prettier](https://prettier.io/docs/en/editors.html)


### `yarn set-links`

Runs script to establish symlinks between git and the custom git hooks in the `.custom-hooks` directory

### `yarn severe-links`

Runs script to destroy symlinks between git and the custom git hooks in the `.custom-hooks` directory

Format the code using [Prettier](https://prettier.io/docs/en/editors.html)

## Directory Structure

- **docs** - Documentation
- **public** - Static files
  - `index.html` - The root HTML file that loads everything
  - `manifest.json` - Service worker definition
- **src** - Development files that will be compiled using Webpack/Babel
  - **components** - React components grouped by the areas of the application that they are used
    - **_shared** - Components that are shared throughout the app (buttons, headers, footers, etc...)
    - **\<area-of-app\>** - eg. Home, About
      - **\<ComponentName\>** - PascalCase name of component
        - `ComponentName.js` - React component
        - `ComponentName.test.js` - Tests for this component
        - `ComponentName.css` - Styles for this component
    - `App.js` - Root of React app
    - `App.test.js` - Tests for root app
    - `App.css` - Global styles for the app
  - **constants** - Constants, can be groups into files by type (ActionTypes.js, NotificationTypes.js, etc..)
  - **images** - Images imported by React components and/or their SCSS
  - **services** - Stand-alone, non-React JavaScript modules (utilities, etc...)
  - **store** - Redux files
    - **middleware** - Custom middleware
    - **modules** - Action Creators and Reducers organized in single files
      - **app** - App specific state (filters, loading, current user)
      - **db** - Data that the application needs to show, use, or modify (usually comes from server)
      - **vendor** - Third party Redux (redux-forms, react-redux-router, etc...)
    - `store.js` - Combines all the reducers and middleware to create the store
  - **svgs** - SVG files that will be used inline
  - `index.js` - Bootstraps the main application
- `dotfiles` - Various configs for different parts of the stack

# Development

## Git

Never make edit directly to the `master` branch.

Work on a local copy of the `develop` branch or, even better, create a new `feature/my-new-feature` or `bugfix/my-bug` branch that you then merged into `develop`.

Run `yarn test` before trying to merge branches into `develop` or `master` to catch any errors that will cause the build to fail.

Once your changes are in the `develop` branch and passing the tests, open a merge request to merge `develop` into the `master` branch.

## Styles

### BEM
Keep your CSS specificity in check by following the [BEM methodology](http://getbem.com/introduction/).

### SASS
We are using [SASS as a preprocessor](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#adding-a-css-preprocessor-sass-less-etc). The down side to this is you get a duplicate `.css` file generated along side the `.scss` file.

Edit the `.scss`, but import the `.css` file.

```js
// .js
import './App.css';
```

You can also import shared `.scss` files.

```scss
// .scss
@import 'components/_vars.scss'; // assuming src/components/_vars.scss
@import 'nprogress/nprogress'; // importing a css file from the nprogress node module
```

## JavaScript

For generic JavaScript follow the [AirBnB JavaScript Style Guide](https://github.com/airbnb/javascript).

### Redux

#### Persist

Select parts of the Redux store are saved to local storage using `redux-persist`

If you are running to strange errors after modifying the structure of you reducer you may have an old version of the state tree cached in local storage.

To clear the cache, in the `src/index.js` file, un-comment the following line, refreshing the page, then comment it back out again.

```
// persistor.purge();
```

Or even easier you can install the [Clear Session Chrome Extension](https://chrome.google.com/webstore/detail/clear-session/maejjihldgmkjlfmgpgoebepjchengka) to clear out your local storage for the site with one click.

If you update code and want to make sure there are no 'migration' errors, especially when pushing code to server, increment the 'version' number in the `src/index.js` file to force a purge for a client machine.

### Templates

Use the template files found in `docs/templates` as the starting point for your React components.

### Linting

More info to come.

### Code Formatting

[Prettier](https://github.com/prettier/prettier) has been setup to format the code whenever a commit is made. See the `precommit` script in the `package.json`.

You can also format your code by running the `yarn format` command.

It's recommended to integrate Prettier in your favorite editor. Read the section on [Editor Integration](https://prettier.io/docs/en/editors.html) on the Prettier GitHub page.


### Imports

The `.env` file in the root sets `NODE_PATH=src/` so you can import files relative to the `/src` directory:

```javascript
// inside src/components/path/to/deep/Component.js

import foo from 'services/Foo' // => src/services/Foo
```

### Modernizr

A custom build of [Modernizr](https://modernizr.com) is included and can be accessed through the window object

```js
if (window.Modernizr.touchevents) {
  // has touch events
} else {
  // no touch events
}
```

### SVGs

Currently SVGs can only be used as images:

```jsx
import MyIcon from 'svgs/my-icon.svg';

const MyComponent = () => (
  <div>
    <img src={MyIcon} />
  </div>
);
```

Once this [pull request](https://github.com/facebook/create-react-app/pull/3718) merges you will be able to use them inline:

```jsx
import { ReactComponent as MyIcon } from 'svgs/my-icon.svg';

const MyComponent = () => (
  <div>
    <MyIcon />
  </div>
);
```
