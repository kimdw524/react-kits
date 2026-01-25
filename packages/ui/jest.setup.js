/* global beforeAll */
import '@testing-library/jest-dom';
import '@vanilla-extract/css/disableRuntimeStyles';

beforeAll(() => {
  const portal = document.createElement('div');
  portal.setAttribute('id', 'container');
  document.body.appendChild(portal);
});
