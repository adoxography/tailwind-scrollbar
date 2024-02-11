---
sidebar_position: 2
---

# Getting Started

## Installation

1. Add the package to your project
```bash
# npm
npm install --save-dev tailwind-scrollbar
# yarn
yarn add -D tailwind-scrollbar
# pnpm
pnpm add -D tailwind-scrollbar
```

2. Add it to the plugins array of your Tailwind config

```javascript
module.exports = {
    // ...
    plugins: [
        // ...
        require('tailwind-scrollbar'),
    ],
};
```

## Configuration

### `nocompatible`

By default, only utilities that can have expressions across browsers are available. In order to access additional utilities that may not exist in all browsers, like [rounding](/examples#rounded-bars) and [custom sizes](/examples#custom-sizes), you can add the `nocompatible` flag to the configuration. You may need to also set the [preferred strategy](#preferredstrategy) to `pseudoelements` for `nocompatible` utilities to take effect in newer browsers.

```javascript
module.exports = {
    // ...
    plugins: [
        // ...
        require('tailwind-scrollbar')({ nocompatible: true }),
    ],
};
```

### `preferredStrategy`

The default scrollbar strategy used by the plugin is to prefer the standards-track properties (`scrollbar-width` and `scrollbar-color`) and fall back to pseudoelements only when standards-track properties are not supported. Although this strategy is encouraged, it does have drawbacks: available features are limited compared to the pseudoelement strategy, and some browser/OS combinations ignore scrollbar properties entirely. If you'd prefer to default to the pseudoelement strategy instead, pass `preferredStrategy: 'pseudoelements'` to the plugin configuration. Note that since Firefox does not support pseudoelements at all, it will continue to use standards-track properties.

```javascript
module.exports = {
    // ...
    plugins: [
        // ...
        require('tailwind-scrollbar')({ preferredStrategy: 'pseudoelements' }),  // default: 'standard'
    ],
};
```

## Usage

[See the examples](/examples)
