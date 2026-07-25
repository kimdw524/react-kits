import { render, screen, waitFor } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

import { Tooltip } from '#components';

import { TestProvider } from '../../tests';

describe('Tooltip component', () => {
  const content = 'tooltip content';
  const createRect = ({
    height,
    left,
    top,
    width,
  }: {
    height: number;
    left: number;
    top: number;
    width: number;
  }) =>
    ({
      bottom: top + height,
      height,
      left,
      right: left + width,
      top,
      width,
      x: left,
      y: top,
      toJSON: () => undefined,
    }) as DOMRect;

  test('renders the tooltip only while the child is hovered.', async () => {
    const user = userEvent.setup();

    render(
      <TestProvider>
        <Tooltip content={content}>
          <button>button</button>
        </Tooltip>
      </TestProvider>,
    );

    const button = screen.getByRole('button', { name: 'button' });

    await user.hover(button);
    expect(screen.queryByText(content)).toBeInTheDocument();

    await user.unhover(button);
    expect(screen.queryByText(content)).not.toBeInTheDocument();
  });

  test('keeps the tooltip inside the viewport when it would overflow.', async () => {
    const user = userEvent.setup();
    const getBoundingClientRect = jest
      .spyOn(HTMLElement.prototype, 'getBoundingClientRect')
      .mockImplementation(function () {
        if (this instanceof HTMLButtonElement) {
          return createRect({ height: 20, left: 180, top: 80, width: 20 });
        }

        if (this.textContent === content) {
          return createRect({ height: 20, left: 0, top: 0, width: 120 });
        }

        return createRect({ height: 0, left: 0, top: 0, width: 0 });
      });

    Object.defineProperty(document.documentElement, 'clientHeight', {
      configurable: true,
      value: 100,
    });
    Object.defineProperty(document.documentElement, 'clientWidth', {
      configurable: true,
      value: 200,
    });

    try {
      render(
        <TestProvider>
          <Tooltip content={content}>
            <button>button</button>
          </Tooltip>
        </TestProvider>,
      );

      const button = screen.getByRole('button', { name: 'button' });

      await user.hover(button);

      await waitFor(() => {
        expect(screen.getByText(content)).toHaveStyle({
          left: '190px',
          top: '56px',
          transform: 'translateX(calc(-50% + -58px))',
        });
      });
    } finally {
      getBoundingClientRect.mockRestore();
    }
  });

  test('centers the tooltip to the child when it fits in the viewport.', async () => {
    const user = userEvent.setup();
    const getBoundingClientRect = jest
      .spyOn(HTMLElement.prototype, 'getBoundingClientRect')
      .mockImplementation(function () {
        if (this instanceof HTMLButtonElement) {
          return createRect({ height: 20, left: 90, top: 20, width: 20 });
        }

        if (this.textContent === content) {
          return createRect({ height: 20, left: 0, top: 0, width: 80 });
        }

        return createRect({ height: 0, left: 0, top: 0, width: 0 });
      });

    Object.defineProperty(document.documentElement, 'clientHeight', {
      configurable: true,
      value: 100,
    });
    Object.defineProperty(document.documentElement, 'clientWidth', {
      configurable: true,
      value: 200,
    });

    try {
      render(
        <TestProvider>
          <Tooltip content={content}>
            <button>button</button>
          </Tooltip>
        </TestProvider>,
      );

      const button = screen.getByRole('button', { name: 'button' });

      await user.hover(button);

      await waitFor(() => {
        expect(screen.getByText(content)).toHaveStyle({
          left: '100px',
          top: '44px',
          transform: 'translateX(calc(-50% + 0px))',
        });
      });
    } finally {
      getBoundingClientRect.mockRestore();
    }
  });
});
