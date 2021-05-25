const { diffOnly } = require('./util');

test('it generates button utilities', async () => {
  const css = await diffOnly({}, { webkitButtons: true });

  expect(css).toMatchInlineSnapshot(`
  "

    + .scrollbar-buttons {
    +   --scrollbar-button-bg: var(--scrollbar-track);
    +   --scrollbar-arrow-up: url('data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' fill='#374151'><polygon points='50,00 0,50 100,50'/></svg>');
    +   --scrollbar-arrow-down: url('data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' fill='#374151'><polygon points='0,0 100,0 50,50'/></svg>');
    +   --scrollbar-arrow-right: url('data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' fill='#374151'><polygon points='0,0 0,100 50,50'/></svg>');
    +   --scrollbar-arrow-left: url('data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' fill='#374151'><polygon points='100,100 100,0 50,50'/></svg>');
    + }
    +
    + .scrollbar-buttons::-webkit-scrollbar-button {
    +   background-color: var(--scrollbar-button-bg);
    +   background-repeat: no-repeat;
    + }
    +
    + .scrollbar-buttons.scrollbar::-webkit-scrollbar-button {
    +   background-size: 10px;
    + }
    +
    + .scrollbar-buttons.scrollbar::-webkit-scrollbar-button:vertical {
    +   height: 16px;
    + }
    +
    + .scrollbar-buttons.scrollbar::-webkit-scrollbar-button:vertical:increment {
    +   background-position: center 5px;
    + }
    +
    + .scrollbar-buttons.scrollbar::-webkit-scrollbar-button:vertical:decrement {
    +   background-position: center 6px;
    + }
    +
    + .scrollbar-buttons.scrollbar::-webkit-scrollbar-button:horizontal {
    +   width: 16px;
    + }
    +
    + .scrollbar-buttons.scrollbar::-webkit-scrollbar-button:horizontal:increment {
    +   background-position: 6px center;
    + }
    +
    + .scrollbar-buttons.scrollbar::-webkit-scrollbar-button:horizontal:decrement {
    +   background-position: 0 center;
    + }
    +
    + .scrollbar-buttons.scrollbar-thin::-webkit-scrollbar-button {
    +   background-size: 6px;
    + }
    +
    + .scrollbar-buttons.scrollbar-thin::-webkit-scrollbar-button:vertical {
    +   height: 8px;
    + }
    +
    + .scrollbar-buttons.scrollbar-thin::-webkit-scrollbar-button:vertical:increment {
    +   background-position: center 2px;
    + }
    +
    + .scrollbar-buttons.scrollbar-thin::-webkit-scrollbar-button:vertical:decrement {
    +   background-position: center 2px;
    + }
    +
    + .scrollbar-buttons::-webkit-scrollbar-button:vertical:increment {
    +   background-image: var(--scrollbar-arrow-down);
    + }
    +
    + .scrollbar-buttons::-webkit-scrollbar-button:vertical:decrement {
    +   background-image: var(--scrollbar-arrow-up);
    + }
    +
    + .scrollbar-buttons::-webkit-scrollbar-button:horizontal:increment {
    +   background-image: var(--scrollbar-arrow-right);
    + }
    +
    + .scrollbar-buttons::-webkit-scrollbar-button:horizontal:decrement {
    +   background-image: var(--scrollbar-arrow-left);
    + }
    +
    + .scrollbar-button-bg-black {
    +   --scrollbar-button-bg: #000000;
    + }
    +
    + .scrollbar-arrows-black {
    +   --scrollbar-arrow-up: url('data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' fill='#000000'><polygon points='50,00 0,50 100,50'/></svg>');
    +   --scrollbar-arrow-down: url('data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' fill='#000000'><polygon points='0,0 100,0 50,50'/></svg>');
    +   --scrollbar-arrow-right: url('data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' fill='#000000'><polygon points='0,0 0,100 50,50'/></svg>');
    +   --scrollbar-arrow-left: url('data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' fill='#000000'><polygon points='100,100 100,0 50,50'/></svg>');
    + }
    +
    + .scrollbar-button-bg-indigo {
    +   --scrollbar-button-bg: #5c6ac4;
    + }
    +
    + .scrollbar-arrows-indigo {
    +   --scrollbar-arrow-up: url('data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' fill='#5c6ac4'><polygon points='50,00 0,50 100,50'/></svg>');
    +   --scrollbar-arrow-down: url('data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' fill='#5c6ac4'><polygon points='0,0 100,0 50,50'/></svg>');
    +   --scrollbar-arrow-right: url('data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' fill='#5c6ac4'><polygon points='0,0 0,100 50,50'/></svg>');
    +   --scrollbar-arrow-left: url('data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' fill='#5c6ac4'><polygon points='100,100 100,0 50,50'/></svg>');
    + }
    +
    + .scrollbar-button-bg-indigo-dark {
    +   --scrollbar-button-bg: #202e78;
    + }
    +
    + .scrollbar-arrows-indigo-dark {
    +   --scrollbar-arrow-up: url('data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' fill='#202e78'><polygon points='50,00 0,50 100,50'/></svg>');
    +   --scrollbar-arrow-down: url('data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' fill='#202e78'><polygon points='0,0 100,0 50,50'/></svg>');
    +   --scrollbar-arrow-right: url('data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' fill='#202e78'><polygon points='0,0 0,100 50,50'/></svg>');
    +   --scrollbar-arrow-left: url('data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' fill='#202e78'><polygon points='100,100 100,0 50,50'/></svg>');
    + }
    +

  "
`);
});
