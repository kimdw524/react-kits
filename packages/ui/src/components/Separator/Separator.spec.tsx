import { render, screen } from '@testing-library/react';

import { Separator } from './';

describe('Separator 컴포넌트', () => {
  test('child가 1개인 경우 separator를 렌더링 하지 않는다.', () => {
    render(
      <Separator separator={<span data-testid="sep">|</span>}>
        <span data-testid="child">A</span>
      </Separator>,
    );

    expect(screen.getByTestId('child')).toBeInTheDocument();
    expect(screen.queryByTestId('sep')).toBeNull();
  });

  test('여러 개의 children인 경우 separator를 children 개수 - 1 만큼 렌더링 한다.', () => {
    render(
      <Separator separator={<span data-testid="sep">|</span>}>
        <span data-testid="child">A</span>
        <span data-testid="child">B</span>
        <span data-testid="child">C</span>
      </Separator>,
    );

    expect(screen.getAllByTestId('child')).toHaveLength(3);

    expect(screen.getAllByTestId('sep')).toHaveLength(2);
  });

  test('separator를 children 사이에 렌더링 한다.', () => {
    render(
      <Separator separator={<span data-testid="sep">|</span>}>
        <span>A</span>
        <span>B</span>
        <span>C</span>
      </Separator>,
    );

    const container = screen.getByText('A').parentElement!;
    expect(container.textContent).toBe('A|B|C');
  });
});
