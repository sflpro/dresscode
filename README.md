[![Build Status](https://travis-ci.org/sflpro/dresscode.svg?branch=master)](https://travis-ci.org/sflpro/dresscode)

# DressCode - React component library

DressCode is [SFL](https://sflpro.com/)'s own take on component libraries, implemented using [React](https://reactjs.org).

# About DressCode

DressCode is an attempt to use the latest and the best CSS has to offer today and stay as close to HTML5 semantics and APIs as possible when designing React components.

# Demo

All components have corresponding [StoryBook](https://storybook.js.org/) files. To view and play around with available components you can run StoryBook locally (we are working on creating a hosted version):

```sh
# clone the repo
git clone git@github.com:sflpro/dresscode.git

# move inside the project directory
cd ./dresscode

# install dependencies
npm ci

# run storybook server
npm run storybook
```

## Architecture

DressCode is a collection of raw JS and CSS files that are not bundled or transpiled (except JSX to ES5 transpilation). This means that the build system on the user's side should be configured respectively to make needed transpilations and conversions.

### React and JS

The library is basically a collection of React components with heavy usage of [React Hooks](https://reactjs.org/docs/hooks-intro.html).

### CSS

All configuration for styles is done via [CSS custom properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties). The library implies usage of [postcss](https://postcss.org/) and [postcss-preset-env](https://preset-env.cssdb.org/) to enable next-gen CSS features.

# Usage

To use any of components, you need to first import the JS module:

```js
import { Button } from '@sflpro/dresscode/lib/Button';

export default function HelloWorld() {
  return (
    <Button>Click me!</Button>
  );
}
```

The `@sflpro/dresscode/lib/Button` module will itself import `@sflpro/dresscode/lib/Button/button.css` for styling, which means you have to configure your bundler to support `.css` imports. It's also highly recommended to add CSS Modules to your build pipeline to avoid naming collisions.

Here is an example configuration for [webpack](https://webpack.js.org/):

```js
{
  test: /\.(css)$/,
  use: [
    {
      loader: MiniCssExtractPlugin.loader,
    },
    {
      loader: 'css-loader',
      options: {
        importLoaders: 1,
        modules: true,
        localIdentName: '[name]__[local]___[hash:base64:5]',
      },
    },
    {
      loader: 'postcss-loader',
      options: {
        config: {
          path: `${__dirname}/postcss.config.js`,
        },
      },
    },
  ],
}
```

And here is an example of PostCSS config:

```js
module.exports = {
  plugins: {
    'postcss-mixins': {
      mixinsFiles: [
        'node_modules/@sflpro/dresscode/lib/mixins/grid.css',
        'node_modules/@sflpro/dresscode/lib/mixins/typography.css',
        'node_modules/@sflpro/dresscode/lib/fonts.css',
        './static/assets/css/customMixins.css',
      ],
    },
    'postcss-preset-env': {
      importFrom: [
        'node_modules/@sflpro/dresscode/lib/defaults.css',
        './static/assets/css/colorScheme.css',
        './static/assets/css/defaults.css',
        './static/assets/css/customMedia.css',
        './static/assets/css/main.css',
      ],
      features: {
        'nesting-rules': true,
        'custom-properties': {
          preserve: false,
        },
        'custom-media-queries': true,
      },
    },
  },
};
```

`defaults.css`, `colorScheme.css` and `defaults.css` provide CSS custom property globals, via which theme configuration is done.

```css
:root {
  --primary-color: var(--violet-300);
  --primary-color-light: var(--violet-100);
  --primary-color-dark: var(--violet-400);

  --success-color: var(--green-300);
  --warning-color: var(--yellow-300);
  --error-color: var(--red-300);
  --error-color-dark: var(--red-400);

  --text-default-color: var(--neutral-900);

  ...
}
```
