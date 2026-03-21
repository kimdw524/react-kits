import { createSearchParamsSchema } from './createSearchParamsSchema';

describe('createSearchParamsSchema', () => {
  it('스키마 타입 파라미터를 URLSearchParams 문자열로 변환한다', () => {
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

  it('skipValidation이 false이면 변환 전에 validate를 사용한다', () => {
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

  it('skipValidation이 true이면 validate를 건너뛴다', () => {
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
