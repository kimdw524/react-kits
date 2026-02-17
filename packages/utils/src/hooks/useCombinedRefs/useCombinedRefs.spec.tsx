import { forwardRef, useEffect, useRef, useState } from 'react';

import { render, screen } from '@testing-library/react';

import { useCombinedRefs } from '.';

describe('useCombinedRefs', () => {
  const Child = forwardRef<HTMLDivElement>((_, ref) => {
    const localRef = useRef<HTMLDivElement>(null);
    const combinedRef = useCombinedRefs<HTMLDivElement>(localRef, ref);
    const [hasLocalRef, setHasLocalRef] = useState(false);

    useEffect(() => {
      setHasLocalRef(localRef.current !== null);
    }, []);

    return (
      <>
        <div ref={combinedRef} data-testid="target" />
        <div data-testid="has-local-ref">{hasLocalRef ? 'true' : 'false'}</div>
      </>
    );
  });
  Child.displayName = 'Child';

  it('부모가 ref를 전달하면 부모 ref와 내부 ref가 같은 요소를 가리킨다', () => {
    const parentRef = { current: null as HTMLDivElement | null };

    render(<Child ref={parentRef} />);

    expect(parentRef.current).toBe(screen.getByTestId('target'));
    expect(screen.getByTestId('has-local-ref').textContent).toBe('true');
  });

  it('부모가 ref를 전달하지 않아도 내부 ref만으로 정상 동작한다', () => {
    render(<Child />);

    expect(screen.getByTestId('has-local-ref').textContent).toBe('true');
  });
});
