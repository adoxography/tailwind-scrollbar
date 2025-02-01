---
sidebar_position: 2
---

# Migrating to v4

`tailwind-scrollbar@^4.0.0` supports Tailwindcss v4, but there are some **breaking changes** to be aware of.

### `hover:` and `active:`

In v3, hover and active variants could be applied with Tailwind's built-in `hover:` and `active:` (e.g. `hover:scrollbar-thumb-red-100`). In v4, this has different, arguably more predictable, semantics: an element with `hover:scrollbar-thumb-red-100` will cause its scrollbar's thumb to change colour when the **element** is hovered, not the scrollbar's thumb.

Let's be honest, though, that's probably not what you're after. To apply variants just to the scrollbar's thumb, use `scrollbar-hover:` and `scrollbar-active:`. If, for some reason, you're wanting to apply these variants to the track or corner elements, `scrollbar-track-hover:`, `scrollbar-track-active:`, `scrollbar-corner-hover:`, and `scrollbar-corner-active:` are there for you.

**In most cases, globally replacing `hover:scrollbar` with `scrollbar-hover:scrollbar` and `active:scrollbar` with `scrollbar-active:scrollbar` should be enough.**
