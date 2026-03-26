# @kimdw-rtk/react-search-params

[![NPM](https://img.shields.io/npm/v/@kimdw-rtk/react-search-params)](https://www.npmjs.com/package/@kimdw-rtk/react-search-params)

[한국어](./README.ko.md)

Type-safe utilities for managing `URLSearchParams` in React.

- Optimizes runtime performance by running only minimal validation.
- Reduces re-renders by subscribing only to the keys you need.
- SSR support.

## Installation

```bash
pnpm add @kimdw-rtk/react-search-params
```

```bash
npm install @kimdw-rtk/react-search-params
```

```bash
yarn add @kimdw-rtk/react-search-params
```

## Usage

### Define Schema

```tsx
export const searchParamsSchema = createSearchParamsSchema<{
  query: string;
  page: number;
  tags: string[];
}>({
  defaultValue: {
    query: '',
    page: 1,
    tags: [],
  },
  skipValidation: false, // Set this to `true` when param changes caused by developer code are sufficiently guaranteed by TypeScript checks, so calls to `validate` can be minimized.
  arrayParams: ['tags'], // For array-type params, you must explicitly specify the keys in `arrayParams`.
  validate: (params) => {
    const page = Number(params.page);

    if (!Number.isInteger(page) || page < 1) {
      throw new Error('page must be a positive integer');
    }

    return {
      query: String(params.query),
      page,
      tags: params.tags?.map(String) ?? [],
    };
  },
});
```

You can define the `validate` function manually, but using `zod.parse` is recommended.

#### Schema.toString(params)

```tsx
const result = searchParamsSchema.toString({
  query: 'q',
  page: 1,
  tags: ['a', 'b'],
});
console.log(result); // query=q&page=1&tags=1,2
```

Converts an object that matches the schema into a URL query string.
[See the notes below before using it in a URL.](#notes)

### Create Store

```tsx
export const store = createSearchParamsStore({
  serializer: Serializer.delimiter(','),
});
```

You usually do not need to create multiple store instances.
Be careful not to create multiple store instances accidentally.

#### Serializer

Choose a serializer based on how arrays are represented in the URL.

`Serializer.delimiter(',')`

```txt
a=1,2
```

`Serializer.repeated()`

```txt
a=1&a=2
```

### Set & Get Params

```tsx
export function SearchPage() {
  const [params, setParams] = store.useAllParams(searchParamsSchema);

  return (
    <button
      onClick={() => {
        setParams(
          {
            query: 'react',
            tags: ['javascript', 'typescript'],
          },
          { history: 'pushState' },
        );
      }}
    >
      apply
    </button>
  );
}
```

#### Partial Subscribe

```tsx
const [{ page }, setParams] = store.useParams(searchParamsSchema, ['page']);
```

You can subscribe to only a subset of keys defined in the schema.

### Use in SSR

```tsx
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  return (
    <SearchParamsProvider value={await searchParams}>
      <ButtonA />
    </SearchParamsProvider>
  );
}
```

Use `SearchParamsProvider` to provide initial `URLSearchParams` values in SSR.

### Notes

This library assumes `URLSearchParams` changes flow through `useParams` or `useAllParams`, and it keeps the internal store in sync based on that assumption.

If `URLSearchParams` changes outside those hooks, such as through soft navigation, the change may not be detected automatically.
