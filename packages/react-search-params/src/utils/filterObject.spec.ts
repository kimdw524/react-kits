import { filterObject } from './filterObject';

describe('filterObject', () => {
  it('returns only selected keys', () => {
    const source = {
      page: 3,
      query: 'react',
      enabled: true,
    };

    const result = filterObject(source, ['page', 'enabled'] as const);

    expect(result).toEqual({
      page: 3,
      enabled: true,
    });
    expect('query' in result).toBe(false);
  });
});
