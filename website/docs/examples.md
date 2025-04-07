---
sidebar_position: 4
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Examples

## Minimal example

It's a good idea to start with an element that already has a scrollbar. Begin custom styling by adding either the `scrollbar` or `scrollbar-thin` utilities, then add a `scrollbar-thumb-*` and (optionally) a `scrollbar-track-*` utility to define your scrollbar colours.

<div className="scrollbar scrollbar-thumb-sky-700 scrollbar-track-sky-300 h-32 overflow-y-scroll scrollbar-hover:scrollbar-thumb-sky-700 scrollbar-active:scrollbar-thumb-sky-700">
    <div className="h-64 bg-slate-400"></div>
</div>

```html
<div class="scrollbar scrollbar-thumb-sky-700 scrollbar-track-sky-300 h-32 overflow-y-scroll">
    <div class="h-64 bg-slate-400"></div>
</div>
```

## Global scrollbar colours

Instead of having to add colour utilities to every element that needs a scrollbar, you can define defaults in your CSS configuration file and then simply add `scrollbar` or `scrollbar-thin` to each scrollbar you'd like to apply custom styling to.

:::warning
This only works in `tailwind-scrollbar`&GreaterEqual;4.1. If you're using v3, you can achieve a similar effect by applying colour utilities to a high-level element (e.g. `:root`, `html`, `body`).
:::

<div className="scrollbar-thin h-32 overflow-y-scroll">
    <div className="h-64 w-screen bg-slate-400"></div>
</div>

```css
:root {
    --scrollbar-thumb: var(--color-sky-700);
    --scrollbar-thumb-hover: var(--color-sky-500);
    --scrollbar-thumb-active: var(--color-sky-400);
    --scrollbar-track: var(--color-sky-300);
    --scrollbar-track-hover: var(--color-teal-200);
    --scrollbar-track-active: var(--color-teal-100);
    --scrollbar-corner: var(--color-pink-300);
}
```

```html
<div className="scrollbar-thin h-32 overflow-scroll">
    <div className="h-64 w-screen bg-slate-400"></div>
</div>
```

:::note
If you define _any_ colour utilities on an element, _all_ defaults set this way will be ignored on that element.
:::

## Variants
Use the `scrollbar-hover:` and `scrollbar-active:` variants to apply utilties when the scrollbar's thumb is hovered or active, respectively. Note that only scrollbars that are being [styled using pseudoelements](/getting-started#preferred-strategy) will pay attention to these variants; standards-track scrollbars (like those used in FireFox exclusively and in Chrome/Edge by default) deal with hover and active states on their own.

:::warning
If you're using `tailwind-scrollbar`@v3, use the built-in `hover:` and `active:` variants instead of `scrollbar-hover:` and `scrollbar-active:`.
:::

<div className="scrollbar-hover:scrollbar-thumb-sky-500 scrollbar-active:scrollbar-thumb-sky-400 h-32 scrollbar scrollbar-thumb-slate-700 scrollbar-track-slate-300 overflow-y-scroll">
    <div className="h-64 bg-slate-400"></div>
</div>

```html
<div class="scrollbar-hover:scrollbar-thumb-sky-500 scrollbar-active:scrollbar-thumb-sky-400 h-32 scrollbar scrollbar-thumb-slate-700 scrollbar-track-slate-300 overflow-y-scroll">
    <div class="h-64 bg-slate-400"></div>
</div>
```

## Custom colours

The colour utilities can accept colours in any format Tailwind's native colour utilities like `bg-*` can, including [custom colours](https://tailwindcss.com/docs/colors#customizing-your-colors) and [arbitrary values](https://tailwindcss.com/docs/adding-custom-styles#using-arbitrary-values).

<div className="scrollbar-thumb-custom scrollbar-track-custom-light scrollbar-hover:scrollbar-thumb-[#059669] scrollbar-active:scrollbar-thumb-emerald-500/50 scrollbar h-32 overflow-y-scroll">
    <div className="h-64 bg-slate-400"></div>
</div>

```html
<div class="scrollbar-thumb-custom scrollbar-track-custom-light scrollbar-hover:scrollbar-thumb-[#059669] scrollbar-active:scrollbar-thumb-emerald-500/50 scrollbar h-32 overflow-y-scroll">
    <div class="h-64 bg-slate-400"></div>
</div>
```

<Tabs groupId="config">
    <TabItem value="css" label="New CSS Config" default>
        ```css
        @import 'tailwindcss';

        /* ... */

        @theme {
            --color-custom: #d1fae5;
            --color-custom-light: #10b981;
        }
        ```
    </TabItem>
    <TabItem value="js" label="Legacy JavaScript Config">
        ```javascript
        module.exports = {
            // ...
            theme: {
                extend: {
                    colors: {
                        custom: {
                            DEFAULT: '#10b981',
                            light: '#d1fae5',
                        },
                    },
                },
            },
        };
        ```
    </TabItem>
</Tabs>

## Corners

When you have both a vertical and horizontal scrollbar, you'll end up with an empty box in the bottom right corner. You can use the `scrollbar-corner-*` utilities to colour this region as you would `scrollbar-thumb-*`.

<div className="scrollbar-corner-sky-500 scrollbar scrollbar-thumb-slate-700 scrollbar-track-slate-300 h-32 overflow-scroll scrollbar-hover:scrollbar-thumb-slate-700 scrollbar-active:scrollbar-thumb-slate-700">
    <div className="h-64 w-[100vw] bg-slate-400"></div>
</div>

```html
<div class="scrollbar-corner-sky-500 scrollbar scrollbar-thumb-slate-700 scrollbar-track-slate-300 h-32 overflow-scroll">
    <div class="h-64 w-[100vw] bg-slate-400"></div>
</div>
```

## Rounded bars

*These utilities only work in `nocompatible` mode, and have no effect on standards-track scrollbars. See [configuration](/getting-started#configuration).*

The `scrollbar-*-rounded-*` family of utilities can be applied to the `thumb`, `track`, or `corner` components, and work in the same was as Tailwind's native `rounded-*` utilities. Custom values and arbitrary values are permitted.

<div className="scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar scrollbar-thumb-slate-700 scrollbar-track-slate-300 h-32 overflow-y-scroll scrollbar-hover:scrollbar-thumb-slate-700 scrollbar-active:scrollbar-thumb-slate-700">
    <div className="h-64 bg-slate-400"></div>
</div>

```html
<div class="scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar scrollbar-thumb-slate-700 scrollbar-track-slate-300 h-32 overflow-y-scroll">
    <div class="h-64 bg-slate-400"></div>
</div>
```

## Custom sizes

*These utilities only work in `nocompatible` mode, and have no effect on standards-track scrollbars. See [configuration](/getting-started#configuration).*

The `scrollbar-w-*` and `scrollbar-h-*` utilities can be used to fine-tine the width and height of scrollbars. Note that these only have effects on vertical and horizontal scrollbars, respectively, and can only be used with the `scrollbar` utility (not `scrollbar-thin`).

<div className="scrollbar-w-8 scrollbar scrollbar-thumb-slate-700 scrollbar-track-slate-300 h-32 overflow-y-scroll scrollbar-hover:scrollbar-thumb-slate-700 scrollbar-active:scrollbar-thumb-slate-700">
    <div className="h-64 bg-slate-400"></div>
</div>

```html
<div class="scrollbar-w-8 scrollbar scrollbar-thumb-slate-700 scrollbar-track-slate-300 h-32 overflow-y-scroll">
    <div class="h-64 bg-slate-400"></div>
</div>
```
