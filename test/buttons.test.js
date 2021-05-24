const { diffOnly } = require('./util');

test('it generates button utilities', async () => {
  const css = await diffOnly({}, { webkitButtons: true });

  expect(css).toMatchInlineSnapshot(`
  "

    + .scrollbar-buttons::-webkit-scrollbar-button {
    +   background-color: var(--scrollbar-track);
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
    +   background-image: url('data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' fill='rgb(73, 73, 73)'><polygon points='0,0 100,0 50,50'/></svg>');
    + }
    +
    + .scrollbar-buttons::-webkit-scrollbar-button:vertical:decrement {
    +   background-image: url('data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' fill='rgb(73, 73, 73)'><polygon points='50,00 0,50 100,50'/></svg>');
    + }
    +

  "
`);
});
