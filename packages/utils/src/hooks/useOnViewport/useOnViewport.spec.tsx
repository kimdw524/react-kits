import { useRef, useState } from 'react';

import { act, render, screen } from '@testing-library/react';

import { useOnViewport } from '.';

describe('useOnViewport', () => {
  it('viewport 내에 보이는 경우 callback 함수가 호출되고 사라지면 cleanup 함수가 호출된다.', () => {
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
      const [isInViewport, setIsInViewport] = useState<boolean>(false);

      useOnViewport(
        () => {
          setIsInViewport(true);

          return () => setIsInViewport(false);
        },
        { targetRef: ref, threshold: 0 },
      );

      return (
        <div ref={ref} data-testid="target">
          {isInViewport ? 'true' : 'false'}
        </div>
      );
    };

    render(<TestComponent />);

    act(() => {
      intersectionCallback?.([{ isIntersecting: true }]);
    });
    expect(screen.getByTestId('target')).toHaveTextContent('true');

    act(() => {
      intersectionCallback?.([{ isIntersecting: false }]);
    });
    expect(screen.getByTestId('target')).toHaveTextContent('false');
  });
});
