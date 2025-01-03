---
sidebar_position: 3
---

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

The scollbar colour utilities are inherited, so if you want to use the same colours on every custom scrollbar, you can define them at a high-level element (e.g. `html`) and then simply add `scrollbar` or `scrollbar-thin` to each scrollbar you'd like to apply custom styling to.

<div className="scrollbar-thumb-sky-700 scrollbar-track-sky-300 scrollbar-hover:scrollbar-thumb-sky-700 scrollbar-active:scrollbar-thumb-sky-700">
    <div className="scrollbar-thin h-32 overflow-y-scroll">
        <div className="h-64 bg-slate-400"></div>
    </div>
</div>

```html
<html className="scrollbar-thumb-sky-700 scrollbar-track-sky-300">
    <!-- ... -->
    <div className="scrollbar-thin h-32 overflow-y-scroll">
        <div className="h-64 bg-slate-400"></div>
    </div>
    <!-- ... -->
</html>
```

## Variants

`hover:` and `active:` variants will be honoured in most browsers, but be aware that Firefox applies its own hover and active styling instead.

All browsers are compatible with `dark:` variants.

<div className="scrollbar-hover:scrollbar-thumb-sky-500 scrollbar-active:scrollbar-thumb-sky-400 h-32 scrollbar scrollbar-thumb-slate-700 scrollbar-track-slate-300 overflow-y-scroll">
    <div className="h-64 bg-slate-400"></div>
</div>

```html
<div class="scrollbar-hover:scrollbar-thumb-sky-500 scrollbar-active:scrollbar-thumb-sky-400 h-32 scrollbar scrollbar-thumb-slate-700 scrollbar-track-slate-300 overflow-y-scroll">
    <div class="h-64 bg-slate-400"></div>
</div>
```

## Custom colours

The colour utilities can accept colours in any format Tailwind's native colour utilities like `bg-*` can, including [custom colours](https://tailwindcss.com/docs/customizing-colors#adding-additional-colors) and [arbitrary values](https://tailwindcss.com/docs/customizing-colors#arbitrary-values).

<div className="scrollbar-thumb-custom scrollbar-track-custom-light scrollbar-hover:scrollbar-thumb-[#059669] scrollbar-active:scrollbar-thumb-emerald-500/50 scrollbar h-32 overflow-y-scroll">
    <div className="h-64 bg-slate-400"></div>
</div>

```html
<div class="scrollbar-thumb-custom scrollbar-track-custom-light scrollbar-hover:scrollbar-thumb-[#059669] scrollbar-active:scrollbar-thumb-emerald-500/50 scrollbar h-32 overflow-y-scroll">
    <div class="h-64 bg-slate-400"></div>
</div>
```

```javascript title="tailwind.config.js"
module.exports = {
    // ...
    theme: {
        extend: {
            colors: {
                custom: {
                    DEFAULT: '#10B981',
                    light: '#D1FAE5',
                },
            },
        },
    },
};
```

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

*These utilities only work in `nocompatible` mode, and have no effect in Firefox. See [configuration](/getting-started#configuration).*

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

*These utilities only work in `nocompatible` mode, and have no effect in Firefox. See [configuration](/getting-started#configuration).*

The `scrollbar-w-*` and `scrollbar-h-*` utilities can be used to fine-tine the width and height of scrollbars. Note that these only have effects on vertical and horizontal scrollbars, respectively, and can only be used with the `scrollbar` utility (not `scrollbar-thin`).

<div className="scrollbar-w-8 scrollbar scrollbar-thumb-slate-700 scrollbar-track-slate-300 h-32 overflow-y-scroll scrollbar-hover:scrollbar-thumb-slate-700 scrollbar-active:scrollbar-thumb-slate-700">
    <div className="h-64 bg-slate-400"></div>
</div>

```html
<div class="scrollbar-w-8 scrollbar scrollbar-thumb-slate-700 scrollbar-track-slate-300 h-32 overflow-y-scroll">
    <div class="h-64 bg-slate-400"></div>
</div>
```
