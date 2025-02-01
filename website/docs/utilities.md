---
sidebar_position: 5
---

# Complete list of utilities/variants

## Base utilities
These utilities initialize scrollbar styling. You always need one of them, even if you're using custom widths.

| Utility     | Effect | Notes |
|-------------|--------|-------|
| <span className="whitespace-nowrap">`scrollbar`</span> | Enables custom scrollbar styling, using the default width | On Firefox, this is `scrollbar-width: auto`. Chrome is hard coded to `16px` for consistency. |
| <span className="whitespace-nowrap">`scrollbar-thin`</span> | Enables custom scrollbar styling, using the thin width | On Firefox, this is `scrollbar-width: thin`. Chrome is hard coded to `8px` for consistency. |
| <span className="whitespace-nowrap">`scrollbar-none`</span> | Hides the scrollbar completely | Because of browser quirks, this cannot be used to hide an existing styled scrollbar - i.e. `scrollbar hover:scrollbar-none` will not work. |

## Colour utilities
All of the asterisks can be replaced [with any tailwind colour](https://tailwindcss.com/docs/customizing-colors#using-custom-colors), including [arbitrary values](https://tailwindcss.com/docs/adding-custom-styles#using-arbitrary-values) and [opacity modifiers](https://tailwindcss.com/docs/background-color#changing-the-opacity). With the exception of the width utilities, all utilities are inherited by child elements.

| Utility     | Effect | Notes |
|-------------|--------|-------|
| <span className="whitespace-nowrap">`scrollbar-thumb-*`</span> | Sets the colour of the scrollbar thumb | |
| <span className="whitespace-nowrap">`scrollbar-track-*`</span> | Sets the colour of the scrollbar track | |
| <span className="whitespace-nowrap">`scrollbar-corner-*`</span> | Sets the colour of the scrollbar corner | The corner will only appear if you have both vertical and horizontal scrollbars. |

## Nocompatible utilities
These styles are only available in [`nocompatible` mode](/getting-started#configuration). They won't have any effect on standards-track scrollbars, such as those used by Firefox or by Chrome/Edge by default.

| Utility     | Effect | Notes |
|-------------|--------|-------|
| <span className="whitespace-nowrap">`scrollbar-w-*`</span> | Sets the width of vertical scrollbars | The asterisk can be replaced with any Tailwind [width setting](https://tailwindcss.com/docs/width), including arbitrary values. Only applies to scrollbars styled with `scrollbar` (not `scrollbar-thin`). |
| <span className="whitespace-nowrap">`scrollbar-h-*`</span> | Sets the height of horizontal scrollbars | The asterisk can be replaced with any Tailwind [height setting](https://tailwindcss.com/docs/height), including arbitrary values. Only applies to scrollbars styled with `scrollbar` (not `scrollbar-thin`). |
| <span className="whitespace-nowrap">`scrollbar-thumb-rounded-*`</span> | Rounds a scrollbar thumb's corners | The asterisk can be replaced with any Tailwind [rounded setting](https://tailwindcss.com/docs/border-radius#using-custom-values), including arbitrary values. |
| <span className="whitespace-nowrap">`scrollbar-track-rounded-*`</span> | Rounds a scrollbar track's corners | See above, but for the track |
| <span className="whitespace-nowrap">`scrollbar-corner-rounded-*`</span> | Rounds a scrollbar corner's corners | See above, but for the corner pseudoelement created when both horizontal and vertial scrollbars are present |

## Variants

:::warning
These variants are not available in `tailwind-scrollbar`@v3. Use the built-in `hover:` and `active:` instead.
:::

These variants don't have any effect on standards-track scrollbars, such as those used by Firefox or by Chrome/Edge by default. The responsibility of styling hover and active states is assumed by the browser in that scenario.

| Variant                   | Effect                                                   |
| ------------------------- | -------------------------------------------------------- |
| `scrollbar-hover:`        | Applies a utility when the scrollbar's thumb is hovered  |
| `scrollbar-active:`       | Applies a utility when the scrollbar's thumb is active   |
| `scrollbar-track-hover:`  | Applies a utility when the scrollbar's track is hovered  |
| `scrollbar-track-active:` | Applies a utility when the scrollbar's track is active   |
| `scrollbar-corner-hover:` | Applies a utility when the scrollbar's corner is hovered |
