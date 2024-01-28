---
slug: /
sidebar_position: 1
---

# Introduction

`tailwind-scrollbar` is a plugin for [Tailwind CSS](https://tailwindcss.com) that adds styling utilities for scrollbars with cross-browser support.

## Motivation

There are currently two competing standards for styling scrollbars amongst browsers: the [scrollbar-width](https://developer.mozilla.org/en-US/docs/Web/CSS/scrollbar-width) and [scrollbar-color](https://developer.mozilla.org/en-US/docs/Web/CSS/scrollbar-color) properties used by Firefox and newer Chromium-based browsers, and the [::-webkit-scrollbar](https://developer.mozilla.org/en-US/docs/Web/CSS/::-webkit-scrollbar) family of pseudoelements used by everything else. This plugin defines a single API for configuring both standards at once from within Tailwind.

### What this plugin isn't

#### A scrollbar triggering tool

This plugin _styles_ scrollbars; it does not force them to appear. Use typical CSS techniques to get the scrollbar in place (e.g. the `overflow-*` family of utilities), and then use the utilities in this plugin to style it from there.

#### A fully custom scrollbar

This plugin is intented to unify existing browser APIs; it's not meant to create fully custom scrollbar elements. As such, it is limited to some extent in terms of what kinds of scrollbars it can create.

#### Perfect cross-browser replication

Scrollbars in different browsers and operating systems look different and have different degrees of customizability. This plugin won't make them look exactly the same; it will just help you ensure that they don't clash with your site's theme.

## License

This project is licensed under the [MIT License](https://github.com/adoxography/tailwind-scrollbar/blob/main/LICENSE).
