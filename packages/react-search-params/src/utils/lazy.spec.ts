import { resolveLazy } from './lazy';

describe('resolveLazy', () => {
  it('returns the value when given a non-function lazy value', () => {
    expect(resolveLazy(42)).toBe(42);
  });

  it('calls the initializer when given a function lazy value', () => {
    const initializer = jest.fn(() => ({ page: 1 }));

    expect(resolveLazy(initializer)).toEqual({ page: 1 });
    expect(initializer).toHaveBeenCalledTimes(1);
  });
});
