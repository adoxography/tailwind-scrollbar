---
sidebar_position: 3
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

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

:::warning
The lastest version of `tailwind-scrollbar` (v4) is only compatible with `tailwindcss` v4. If you're using `tailwindcss` v3, you'll need to use `tailwind-scrollbar` v3.
:::

2. Add the plugin to your Tailwind config

<Tabs groupId="config">
    <TabItem value="css" label="New CSS Config" default>
        ```css
        @import 'tailwindcss';

        /* ... */

        @plugin 'tailwind-scrollbar';
        ```
    </TabItem>
    <TabItem value="js" label="Legacy JavaScript Config">
        ```javascript
        module.exports = {
            // ...
            plugins: [
                // ...
                require('tailwind-scrollbar'),
            ],
        };
        ```
    </TabItem>
</Tabs>

## Configuration

### `nocompatible`

By default, only utilities that can have expressions across browsers are available. In order to access additional utilities that may not exist in all browsers, like [rounding](/examples#rounded-bars) and [custom sizes](/examples#custom-sizes), you can add the `nocompatible` flag to the configuration. You may need to also set the [preferred strategy](#preferredstrategy) to `pseudoelements` for `nocompatible` utilities to take effect in newer browsers.

<Tabs groupId="config">
    <TabItem value="css" label="New CSS Config" default>
        ```css
        @import 'tailwindcss';

        /* ... */

        @plugin 'tailwind-scrollbar' {
            nocompatible: true;
        }
        ```
    </TabItem>
    <TabItem value="js" label="Legacy JavaScript Config">
        ```javascript
        module.exports = {
            // ...
            plugins: [
                // ...
                require('tailwind-scrollbar')({ nocompatible: true }),
            ],
        };
        ```
    </TabItem>
</Tabs>

### `preferredStrategy`

The default scrollbar strategy used by the plugin is to prefer the standards-track properties (`scrollbar-width` and `scrollbar-color`) and fall back to pseudoelements only when standards-track properties are not supported. Although this strategy is encouraged, it does have drawbacks: available features are limited compared to the pseudoelement strategy, and some browser/OS combinations ignore scrollbar properties entirely. If you'd prefer to default to the pseudoelement strategy instead, pass `preferredStrategy: 'pseudoelements'` to the plugin configuration. Note that since Firefox does not support pseudoelements at all, it will continue to use standards-track properties.

<Tabs groupId="config">
    <TabItem value="css" label="New CSS Config" default>
        ```css
        @import 'tailwindcss';

        /* ... */

        @plugin 'tailwind-scrollbar' {
            preferredStrategy: 'pseudoelements';
        }
        ```
    </TabItem>
    <TabItem value="js" label="Legacy JavaScript Config">
        ```javascript
        module.exports = {
            // ...
            plugins: [
                // ...
                require('tailwind-scrollbar')({ preferredStrategy: 'pseudoelements' }),  // default: 'standard'
            ],
        };
        ```
    </TabItem>
</Tabs>

:::tip
If you're using multiple configuration options, make sure you get the syntax right. It should look like this:

<Tabs groupId="config">
    <TabItem value="css" label="New CSS Config" default>
        ```css
        @import 'tailwindcss';

        /* ... */

        @plugin 'tailwind-scrollbar' {
            nocompatible: true;
            preferredStrategy: 'pseudoelements';
        }
        ```
    </TabItem>
    <TabItem value="js" label="Legacy JavaScript Config">
        ```javascript
        module.exports = {
            // ...
            plugins: [
                // ...
                require('tailwind-scrollbar')({
                    nocompatible: true,
                    preferredStrategy: 'pseudoelements',
                }),
            ],
        };
        ```
    </TabItem>
</Tabs>
:::

## Usage

[See the examples](/examples)
