import { useRef } from 'react';

import { act, render, screen } from '@testing-library/react';

import { useHasAppeared } from '.';

describe('useHasAppeared', () => {
  it('viewport 내에 한 번이라도 보여졌으면 true를 반환한다.', () => {
    let intersectionCallback:
      | ((param: { isIntersecting: boolean }[]) => void)
      | undefined;

    class IntersectionObserverMock {
      constructor(callback: typeof intersectionCallback) {
        intersectionCallback = callback;
      }
      observe = jest.fn();
      unobserve = jest.fn();
      disconnect = jest.fn();
    }

    Object.defineProperty(window, 'IntersectionObserver', {
      writable: true,
      configurable: true,
      value: IntersectionObserverMock,
    });

    const TestComponent = () => {
      const ref = useRef<HTMLDivElement>(null);
      const { hasAppeared } = useHasAppeared(ref);

      return (
        <div ref={ref} data-testid="target">
          {hasAppeared ? 'true' : 'false'}
        </div>
      );
    };

    render(<TestComponent />);

    act(() => {
      intersectionCallback?.([{ isIntersecting: false }]);
    });
    expect(screen.getByTestId('target')).toHaveTextContent('false');

    act(() => {
      intersectionCallback?.([{ isIntersecting: true }]);
    });
    expect(screen.getByTestId('target')).toHaveTextContent('true');

    act(() => {
      intersectionCallback?.([{ isIntersecting: false }]);
    });
    expect(screen.getByTestId('target')).toHaveTextContent('true');
  });
});
