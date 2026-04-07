# @kimdw-rtk/react-search-params

[![NPM](https://img.shields.io/npm/v/@kimdw-rtk/react-search-params)](https://www.npmjs.com/package/@kimdw-rtk/react-search-params)

[한국어](./README.md)

A library for handling `URLSearchParams` in React with type safety.

- ⚡ Optimizes runtime performance by performing only the minimum required validation.
- 🎯 Reduces re-renders by subscribing only to the keys you need.
- 🌐 Supports SSR.

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

## Comparison

| Library                 | Validation Count (Code-Driven Updates) | Partial Param State Subscription |
| ----------------------- | -------------------------------------- | -------------------------------- |
| **react-search-params** | 0-1                                    | Supported                        |
| Others                  | 2                                      | Not supported                    |

## `createSearchParamsStore`

```tsx
import {
  createSearchParamsStore,
  Serializer,
} from '@kimdw-rtk/react-search-params';

export const store = createSearchParamsStore({
  serializer: Serializer.delimiter(','),
});
```

### Options

#### serializer: `Serializer`

Defines how array-type params are serialized and deserialized.

- `Serializer.delimiter(',')`: A serializer that represents arrays with a delimiter.
- `Serializer.repeated()`: A serializer that represents arrays as repeated keys.

## `createSearchParamsSchema`

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
  partial: false,
  skipValidation: false,
  arrayParams: ['tags'],
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

### Options

#### defaultValue: `object` `(required)`

The fallback value applied when URL validation fails.

#### partial: `boolean` = `false`

Set this to `true` if some params are allowed to remain `undefined`.

#### skilValidation: `boolean` = `false`

Set this to `true` when param updates made by your code are already guaranteed by TypeScript checks, so calls to `validate` can be minimized.

#### arrayParams: `string[]` = `[]`

For array-type params, you must explicitly list the matching keys in `arrayParams`.

#### validate: `function` `(required)`

The function used to validate `URLSearchParams`. It is expected to behave like `zod.parse`.

## `Store.useAllParams`

Subscribes to all params defined in the schema.

```tsx
const [params, setParams] = store.useAllParams(searchParamsSchema);

console.log(params);

/*
{
  query: '',
  page: 1,
  tags: [],
}
*/

setParams(
  { query: 'search' },
  { history: 'pushState' }, // optional (default: 'pushState')
);
```

## `Store.useParams`

Subscribes only to the params whose keys are defined in the second argument of `useParams`.
The `setParams` method works the same way as in `useAllParams`.

```tsx
const [params, setParams] = store.useParams(searchParamsSchema, ['page']);

console.log(params);

/*
{
  page: 1,
}
*/
```

## Adapter

Wrap `SearchParamsAdapter` at the top level so the library can detect URL changes.
Import the version that matches your environment.

- `@kimdw-rtk/react-search-params`: For environments that do not use a router library
- `@kimdw-rtk/react-search-params/next`: For `Next.js`

```tsx
import { SearchParamsAdapter } from '@kimdw-rtk/react-search-params';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <SearchParamsAdapter store={store}>{children}</SearchParamsAdapter>
      </body>
    </html>
  );
}
```

## Use in SSR

```tsx
import { InitialSearchParamsProvider } from '@kimdw-rtk/react-search-params';

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  return (
    <InitialSearchParamsProvider value={await searchParams}>
      ...
    </InitialSearchParamsProvider>
  );
}
```

In SSR, you can pass the initial search params through `InitialSearchParamsProvider`.

## Caveats

- If `URLSearchParams` is changed through the [History API](https://developer.mozilla.org/docs/Web/API/History_API) or a router API, `validation` will always run, so the runtime performance optimization path cannot be used. Use `useParams` when possible.
- You can use multiple `SearchParamsSchema` instances on the same page, but their keys must not overlap.
