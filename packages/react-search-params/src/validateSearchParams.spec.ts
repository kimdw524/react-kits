import { createSearchParamsSchema } from './createSearchParamsSchema';
import { delimiter } from './serializers/delimiter';
import { repeated } from './serializers/repeated';
import { validateSearchParams } from './validateSearchParams';

describe('validateSearchParams', () => {
  const schema = createSearchParamsSchema<{
    query: string;
    page: number;
    tags: string[];
  }>({
    defaultValue: {
      query: '',
      page: 1,
      tags: [],
    },
    arrayParams: ['tags'],
    validate: (params) => ({
      query: String(params.query ?? ''),
      page: Number(params.page ?? 1),
      tags: Array.isArray(params.tags)
        ? params.tags.map(String)
        : params.tags
          ? [String(params.tags)]
          : [],
    }),
  });

  it('parses repeated serializer values correctly', () => {
    expect(
      validateSearchParams({
        schema,
        serializer: repeated(),
        searchParams: {
          query: 'react',
          page: '2',
          tags: ['ts', 'jest'],
        },
      }),
    ).toEqual({
      query: 'react',
      page: 2,
      tags: ['ts', 'jest'],
    });
  });

  it('parses delimiter serializer values correctly', () => {
    expect(
      validateSearchParams({
        schema,
        serializer: delimiter(','),
        searchParams: {
          query: 'react',
          page: '2',
          tags: 'ts,jest',
        },
      }),
    ).toEqual({
      query: 'react',
      page: 2,
      tags: ['ts', 'jest'],
    });
  });

  it('throws when validation fails', () => {
    const invalidSchema = createSearchParamsSchema<{ page: number }>({
      defaultValue: {
        page: 1,
      },
      validate: (params) => {
        const page = Number(params.page);

        if (Number.isNaN(page)) {
          throw new Error('Invalid page');
        }

        return { page };
      },
    });

    expect(() =>
      validateSearchParams({
        schema: invalidSchema,
        serializer: repeated(),
        searchParams: {
          page: 'abc',
        },
      }),
    ).toThrow('Invalid page');
  });
});
