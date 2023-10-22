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

By default, only utilities that can have expressions across browsers are available. In order to access additional utilities that may not exist in all browsers, like [rounding](/examples#rounded-bars) and [custom sizes](/examples#custom-sizes), you can add the `nocompatible` flag to the configuration.

```javascript
module.exports = {
    // ...
    plugins: [
        // ...
        require('tailwind-scrollbar')({ nocompatible: true }),
    ],
};
```

## Usage

[See the examples](/examples)
