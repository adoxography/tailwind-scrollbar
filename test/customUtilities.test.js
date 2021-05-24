const { diffOnly } = require('./util');

test('it generates rounded states', async () => {
  const css = await diffOnly({
    theme: {
      borderRadius: {
        DEFAULT: '0.25rem',
        md: '0.375rem'
      },
      scrollbar: theme => ({
        rounded: ['border-radius', theme('borderRadius')]
      })
    }
  });

  expect(css).toMatchInlineSnapshot(`
    "

      + .scrollbar-thumb-rounded::-webkit-scrollbar-thumb {
      +   border-radius: 0.25rem;
      + }
      +
      + .scrollbar-track-rounded::-webkit-scrollbar-track {
      +   border-radius: 0.25rem;
      + }
      +
      + .scrollbar-thumb-rounded-md::-webkit-scrollbar-thumb {
      +   border-radius: 0.375rem;
      + }
      +
      + .scrollbar-track-rounded-md::-webkit-scrollbar-track {
      +   border-radius: 0.375rem;
      + }
      +

    "
`);
});

test('it generates custom utilities', async () => {
  const css = await diffOnly({
    theme: {
      scrollbar: {
        foo: ['height', { DEFAULT: 0, 1: '1px' }]
      }
    }
  });

  expect(css).toMatchInlineSnapshot(`
    "

      + .scrollbar-thumb-foo-1::-webkit-scrollbar-thumb {
      +   height: 1px;
      + }
      +
      + .scrollbar-track-foo-1::-webkit-scrollbar-track {
      +   height: 1px;
      + }
      +
      + .scrollbar-thumb-foo::-webkit-scrollbar-thumb {
      +   height: 0;
      + }
      +
      + .scrollbar-track-foo::-webkit-scrollbar-track {
      +   height: 0;
      + }
      +

    "
`);
});

test('it allows components to be specified in custom utilities', async () => {
  const css = await diffOnly({
    theme: {
      scrollbar: {
        foo: ['height', { DEFAULT: 0 }, 'thumb'],
        bar: ['width', { DEFAULT: '1px' }, 'track'],
        baz: ['margin', { DEFAULT: '2px' }, 'all']
      }
    }
  });

  expect(css).toMatchInlineSnapshot(`
    "

      + .scrollbar-thumb-foo::-webkit-scrollbar-thumb {
      +   height: 0;
      + }
      +
      + .scrollbar-track-bar::-webkit-scrollbar-track {
      +   width: 1px;
      + }
      +
      + .scrollbar-thumb-baz::-webkit-scrollbar-thumb {
      +   margin: 2px;
      + }
      +
      + .scrollbar-track-baz::-webkit-scrollbar-track {
      +   margin: 2px;
      + }
      +

    "
`);
});
