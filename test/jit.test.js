const path = require('path');
const { generatePluginCss, testUnlessVersion } = require('./util');

testUnlessVersion('1.9')('it works in jit mode', async () => {
  const css = await generatePluginCss({
    mode: 'jit',
    purge: [path.resolve(__dirname, './jit-mode.html')]
  });

  expect(css).toMatchInlineSnapshot(`
    ".scrollbar {
        --scrollbar-track: initial;
        --scrollbar-thumb: initial;
        scrollbar-color: var(--scrollbar-thumb) var(--scrollbar-track);
        overflow: overlay;
    }
    .scrollbar.overflow-x-hidden {
        overflow-x: hidden;
    }
    .scrollbar.overflow-y-hidden {
        overflow-y: hidden;
    }
    .scrollbar::-webkit-scrollbar-track {
        background-color: var(--scrollbar-track);
    }
    .scrollbar::-webkit-scrollbar-thumb {
        background-color: var(--scrollbar-thumb);
    }
    .scrollbar {
        scrollbar-width: auto;
    }
    .scrollbar::-webkit-scrollbar {
        width: 16px;
        height: 16px;
    }
    .scrollbar-thumb-indigo {
        --scrollbar-thumb: #5c6ac4 !important;
    }
    .hover\\\\:scrollbar-track-black::-webkit-scrollbar-track:hover {
        --scrollbar-track: #000000 !important;
    }
    .hover\\\\:scrollbar-thumb-indigo-dark::-webkit-scrollbar-thumb:hover {
        --scrollbar-thumb: #202e78 !important;
    }"
`);
});
