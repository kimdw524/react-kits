# @kimdw-rtk/react-search-params

[![NPM](https://img.shields.io/npm/v/@kimdw-rtk/react-search-params)](https://www.npmjs.com/package/@kimdw-rtk/react-search-params)
Type-safe utilities for managing `URLSearchParams` in React.

- Optimizes runtime performance by running only **minimal validation.**

- Reduces re-renders by **subscribing only to the keys you need.**

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
  initialValue: {
    query: '',
    page: 1,
    tags: [],
  },
  validate: (params) => {
    const page = Number(params.page);

    if (!Number.isInteger(page) || page < 1) {
      throw new Error('page must be a positive integer');
    }

    return {
      query: String(params.query),
      page,
      tags: Parser.toArray(params.tags).map(String),
    };
  },
});
```

### Create Store

```tsx
export const store = createSearchParamsStore({
  serializer: Serializer.delimiter(','),
});
```

_You usually do not need to create multiple store instances._

#### Serializer

Choose a serializer based on how arrays are represented in the URL.

**Serializer.delimiter(',')**
a=1,2
**Serializer.repeated()**
a=1&a=2

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

#### Partial subscribe

```tsx
const [{ page }, setParams] = store.useParams(searchParamsSchema, ['page']);
```

You can subscribe to only a subset of keys defined in the `schema`.

### Use in SSR

```tsx
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  return (
    <SearchParamsProvider value={await searchParams}>
      <ButtonA />
    </SearchParamsProvider>
  );
}
```

Use `SearchParamsProvider` to provide initial `URLSearchParams` values in SSR.
