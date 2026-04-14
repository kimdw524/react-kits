# @kimdw-rtk/react-search-params

[![NPM](https://img.shields.io/npm/v/@kimdw-rtk/react-search-params)](https://www.npmjs.com/package/@kimdw-rtk/react-search-params)

[English](./README.en.md)

React에서 `URLSearchParams`를 type-safe하게 다루기 위한 라이브러리입니다.

- ⚡ **최소한의 검증**만 수행해 런타임 성능을 최적화합니다.
- 🎯 **필요한 키만 구독**해 리렌더링을 줄일 수 있습니다.
- 🌐 SSR을 지원합니다.

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

배열 타입의 params를 (역)직렬화할 함수를 정의합니다.

- `Serializer.delimiter(',')`: 배열을 구분자로 표현하는 Serializer
- `Serializer.repeated()`: 배열을 구분자로 표현하는 Serializer

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

URL 검증에 실패했을 경우 적용되는 기본값입니다.

#### partial: `boolean` = `false`

일부 params가 `undefined`로 정의되는 걸 허용하면 `true`로 설정합니다.

#### skilValidation: `boolean` = `false`

코드로 인한 params 변경이 TypeScript의 정적 검사만으로 충분하다면 `true`로 설정해 `validate` 호출을 최소화할 수 있습니다.

#### arrayParams: `string[]` = `[]`

배열 타입의 params는 `arrayParams`에 해당 키를 명시해야 합니다.

#### validate: `function` `(required)`

`URLSearchParams` 검증에 사용되는 함수입니다. [zod](https://github.com/colinhacks/zod)의 `parse`와 같은 동작을 기대합니다.

## `Store.useAllParams`

Schema에 정의된 모든 params를 구독합니다.

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

`useParams` 2번 째 인자값에 정의된 key의 params만 구독합니다.
`setParams` 메서드는 `useAllParams`와 동일합니다.

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

URL 변경을 감지하기 위해 `SearchParamsAdapter` 컴포넌트를 최상위에 래핑해야 합니다.
개발 환경에 맞는 `SearchParamsAdapter`를 `import` 해야 합니다.

- `@kimdw-rtk/react-search-params`: Router 라이브러리를 사용하지 않는 환경
- `@kimdw-rtk/react-search-params/next`: `Next.js`를 사용하는 환경

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

SSR에서는 `InitialSearchParamsProvider`를 사용해 초기 search params 값을 전달할 수 있습니다.

## validateSearchParams

서버에서 받은 객체 형태의 `searchParams`를 검증할 때 사용합니다.
(SSR 초기값으로 전달할 `searchParams`를 서버에서 미리 검증하기 위해 구현되었습니다.)

```tsx
import {
  Serializer,
  validateSearchParams,
} from '@kimdw-rtk/react-search-params';

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = validateSearchParams({
    schema: searchParamsSchema,
    serializer: Serializer.delimiter(','),
    searchParams: await searchParams,
  });

  return <div>{params.page}</div>;
}
```

## Caveats

- [History API](https://developer.mozilla.org/docs/Web/API/History_API) / Router의 API를 통해 `URLSearchParams`를 변경하는 경우 `validation`이 항상 호출되어 런타임 성능 최적화 로직을 활용할 수 없습니다. 가능하면 `useParams` 훅을 사용하세요.
- 하나의 페이지에서 여러 개의 `SearchParamsSchema`를 사용해도 되지만, key가 겹치면 안 됩니다.
