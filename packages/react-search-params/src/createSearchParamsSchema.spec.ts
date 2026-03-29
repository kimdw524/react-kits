import { createSearchParamsSchema } from './createSearchParamsSchema';

describe('createSearchParamsSchema', () => {
  it('converts schema-typed params into a URLSearchParams string', () => {
    const schema = createSearchParamsSchema<{
      query: string;
      page: number;
      tags: string[];
    }>({
      partial: false,
      defaultValue: {
        query: '',
        page: 1,
        tags: [],
      },
      validate: (params) => {
        return {
          query: String(params.query ?? ''),
          page: Number(params.page ?? 1),
          tags: Array.isArray(params.tags)
            ? params.tags.map(String)
            : params.tags
              ? [String(params.tags)]
              : [],
        };
      },
    });

    const searchParams = schema.toString({
      query: 'react',
      page: 3,
      tags: ['ts', 'jest'],
    });

    expect(searchParams).toBe('query=react&page=3&tags=ts&tags=jest');
  });

  it('uses validate before conversion when skipValidation is false', () => {
    const schema = createSearchParamsSchema<{ page: number }>({
      defaultValue: {
        page: 1,
      },
      validate: (params) => {
        return {
          page: Number(params.page ?? 1),
        };
      },
    });

    const searchParams = schema.toString({
      page: 7 as unknown as number,
    });

    expect(searchParams).toBe('page=7');
  });

  it('skips validate when skipValidation is true', () => {
    const validate = jest.fn(
      (params: { page?: number | string | string[] }) => {
        return {
          page: Number(params.page ?? 1),
        };
      },
    );

    const schema = createSearchParamsSchema<{ page: number }>({
      defaultValue: {
        page: 1,
      },
      validate,
      skipValidation: true,
    });

    const searchParams = schema.toString({
      page: 5,
    });

    expect(searchParams).toBe('page=5');
    expect(validate).not.toHaveBeenCalled();
  });

  it('supports partial schemas when partial is true', () => {
    const validate = jest.fn(
      (params: { query?: string; page?: number | string | string[] }) => {
        return {
          ...(params.query !== undefined
            ? { query: String(params.query) }
            : {}),
          ...(params.page !== undefined ? { page: Number(params.page) } : {}),
        };
      },
    );

    const schema = createSearchParamsSchema<{
      query: string;
      page: number;
    }>({
      partial: true,
      defaultValue: {},
      validate,
    });

    const searchParams = schema.toString({
      page: 2,
    });

    expect(schema.partial).toBe(true);
    expect(searchParams).toBe('page=2');
    expect(validate).toHaveBeenCalledWith({
      page: 2,
    });
  });
});
