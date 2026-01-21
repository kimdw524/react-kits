import { fireEvent, render, screen } from '@testing-library/react';

import { uiTest } from '../../tests';
import {
  Card,
  CardContent,
  CardHeader,
  CardInteraction,
  CardThumbnail,
} from './';

describe('Card 컴포넌트', () => {
  uiTest(Card, 'Card');
  uiTest(CardContent, 'CardContent');
  uiTest(CardInteraction, 'CardInteraction');
  uiTest(CardThumbnail, 'CardThumbnail');
  uiTest(CardHeader, 'CardHeader');

  it('CardInteraction을 클릭하면 onClick이 호출되어야 한다', () => {
    const handleClick = jest.fn();
    render(
      <Card onClick={handleClick}>
        <CardInteraction>Click</CardInteraction>
      </Card>,
    );

    fireEvent.click(screen.getByText('Click'));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
