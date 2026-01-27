import { styleWithLayer } from '#styleUtils';

export const cardInteraction = styleWithLayer({
  position: 'relative',
  overflow: 'clip',

  height: '100%',

  cursor: 'pointer',
  userSelect: 'none',
});
