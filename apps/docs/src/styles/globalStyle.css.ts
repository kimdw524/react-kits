import { fontFace, globalStyle } from '@vanilla-extract/css';

import './theme.css';

const pretendard = fontFace({
  src: 'url("/fonts/PretendardVariable.woff2")',
});

globalStyle('*', {
  fontFamily: pretendard,
  outline: 'none',
});

globalStyle('header', {
  position: 'sticky',
  top: '0',
  zIndex: '10',
});

globalStyle('main', {
  isolation: 'isolate',
});
