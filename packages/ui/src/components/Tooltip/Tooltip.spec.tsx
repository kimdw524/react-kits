import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

import { Tooltip } from '#components';

import { TestProvider } from '../../tests';

describe('Tooltip 컴포넌트', () => {
  const content = 'tooltip content';

  test('child 요소에 hover가 발생했을 때만 Tooltip을 렌더링한다.', async () => {
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
});
