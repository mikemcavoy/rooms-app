import { global } from '.';

export const globalStyles = global({
  '@import': [
    `'https://fonts.googleapis.com/css2?family=Heebo:wght@400;700&display=swap'`,
  ],
  '*': {
    fontFamily: 'Heebo',
  },
  'body, h1, h2, h3, h4, p, figure, blockquote, dl, dd': {
    margin: '0px',
  },
  body: {
    backgroundColor: '$grey500',
    textRendering: 'optimizeSpeed',
  },
  'html, body, main, #root': {
    height: '100%',
  },
});
