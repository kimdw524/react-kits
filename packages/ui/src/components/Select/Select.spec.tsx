import { Profiler } from 'react';

import { fireEvent, render, screen, within } from '@testing-library/react';

import { Select, SelectOption } from '.';
import { TestProvider, uiTest } from '../../tests';

describe('Select 컴포넌트', () => {
  uiTest(Select, 'Select');

  const openOptionList = () => {
    const select = screen.getByTestId('select');
    fireEvent.click(select.firstElementChild as HTMLElement);
  };

  const getOption = (name: string) => {
    return within(
      document.getElementById('container') as HTMLElement,
    ).getByText(name);
  };

  it('클릭한 option의 내용이 Select에 보인다.', () => {
    render(
      <TestProvider>
        <Select data-testid="select">
          <SelectOption value="1">1번</SelectOption>
          <SelectOption value="2">2번</SelectOption>
        </Select>
      </TestProvider>,
    );

    const select = screen.getByTestId('select');

    openOptionList();
    fireEvent.click(getOption('2번'));
    expect(select).toHaveTextContent('2번');
  });

  it('새로운 option을 클릭하면 onChange 이벤트가 발생하고, form value, ref.value의 값이 바뀐다.', () => {
    const handleChange = jest.fn();

    render(
      <TestProvider>
        <form data-testid="form">
          <Select data-testid="select" name="select" onChange={handleChange}>
            <SelectOption value="1">1번</SelectOption>
            <SelectOption value="2">2번</SelectOption>
          </Select>
        </form>
      </TestProvider>,
    );

    openOptionList();
    const option2 = getOption('2번');
    const form = screen.getByTestId('form') as HTMLFormElement;

    fireEvent.click(option2);
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange.mock.calls[0][0]).toBe('2');
    expect(new FormData(form).get('select')).toBe('2');

    openOptionList();
    fireEvent.click(getOption('2번'));
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(new FormData(form).get('select')).toBe('2');

    openOptionList();
    fireEvent.click(getOption('1번'));
    expect(handleChange).toHaveBeenCalledTimes(2);
    expect(handleChange.mock.calls[1][0]).toBe('1');
    expect(new FormData(form).get('select')).toBe('1');
  });

  it('defaultValue의 값이 기본으로 보인다.', () => {
    render(
      <TestProvider>
        <Select data-testid="select" defaultValue="2">
          <SelectOption value="1">1번</SelectOption>
          <SelectOption value="2">2번</SelectOption>
        </Select>
      </TestProvider>,
    );

    const select = screen.getByTestId('select');

    expect(select).toHaveTextContent('2번');
  });

  it('supports controlled value changes.', () => {
    const handleChange = jest.fn();
    const renderSelect = (value: string) => (
      <TestProvider>
        <Select
          data-testid="select"
          name="select"
          value={value}
          onChange={handleChange}
        >
          <SelectOption value="1">1번</SelectOption>
          <SelectOption value="2">2번</SelectOption>
        </Select>
      </TestProvider>
    );

    const { rerender } = render(renderSelect('1'));
    const select = screen.getByTestId('select');

    expect(select).toHaveTextContent('1번');

    openOptionList();
    fireEvent.click(getOption('2번'));

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith('2');
    expect(select).toHaveTextContent('1번');

    rerender(renderSelect('2'));

    expect(select).toHaveTextContent('2번');
  });

  it('commits once when an uncontrolled value changes.', () => {
    let updateCount = 0;

    render(
      <TestProvider>
        <Profiler
          id="select"
          onRender={(_, phase) => {
            if (phase === 'update') {
              updateCount += 1;
            }
          }}
        >
          <Select data-testid="select">
            <SelectOption value="1">1번</SelectOption>
            <SelectOption value="2">2번</SelectOption>
          </Select>
        </Profiler>
      </TestProvider>,
    );

    openOptionList();
    updateCount = 0;

    fireEvent.click(getOption('2번'));

    expect(updateCount).toBe(1);
    expect(screen.getByTestId('select')).toHaveTextContent('2번');
  });
});
