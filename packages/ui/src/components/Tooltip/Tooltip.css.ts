import { styleWithLayer } from '#styleUtils';

export const tooltip = styleWithLayer({
  position: 'fixed',
  backgroundColor: '#000',
  color: '#fff',
  zIndex: 100,

  top: '50%',
  left: '0',

  pointerEvents: 'none',
});
