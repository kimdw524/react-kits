import { createSearchParamsSchema } from './createSearchParamsSchema';

describe('createSearchParamsSchema', () => {
  it('converts schema-typed params into a URLSearchParams string', () => {
    const schema = createSearchParamsSchema({
      defaultValue: {
        query: '',
        page: 1,
        tags: [] as string[],
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
    const schema = createSearchParamsSchema({
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

    const schema = createSearchParamsSchema({
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
});
