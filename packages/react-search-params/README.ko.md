# @kimdw-rtk/react-search-params

[![NPM](https://img.shields.io/npm/v/@kimdw-rtk/react-search-params)](https://www.npmjs.com/package/@kimdw-rtk/react-search-params)

[English](./README.md)

React에서 `URLSearchParams`를 type-safe하게 다루기 위한 라이브러리입니다.

- 최소한의 검증만 수행해 런타임 성능을 최적화합니다.
- 필요한 키만 구독해 리렌더링을 줄일 수 있습니다.
- SSR을 지원합니다.

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
  skipValidation: false, // 개발 코드로 인한 params 변경이 TypeScript 검사만으로 충분하다면 `true`로 설정해 `validate` 호출을 최소화할 수 있습니다.
  arrayParams: ['tags'], // 배열 타입의 params는 `arrayParams`에 해당 키를 명시해야 합니다.
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

`validate` 함수는 직접 작성할 수 있지만, `zod`의 `parse` 함수 활용을 권장합니다.

#### Schema.toString(params)

```tsx
const result = searchParamsSchema.toString({
  query: 'q',
  page: 1,
  tags: ['a', 'b'],
});
console.log(result); // query=q&page=1&tags=1,2
```

`schema`에 맞는 객체를 URL query string으로 변환하는 함수입니다.
[해당 URL을 사용할 때 주의해야 할 사항을 확인하세요.](#notes)

### Create Store

```tsx
export const store = createSearchParamsStore({
  serializer: Serializer.delimiter(','),
});
```

store 인스턴스를 여러 개 만들 필요는 없습니다.
실수로 여러 인스턴스를 생성하지 않도록 주의하세요.

#### Serializer

배열을 URL에 어떤 형태로 표현할지에 따라 serializer를 선택하세요.

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

`schema`에 정의된 키 중 일부만 골라 구독할 수 있습니다.

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

SSR에서는 `SearchParamsProvider`를 사용해 초기 `URLSearchParams` 값을 전달할 수 있습니다.

### Notes

이 라이브러리는 URLSearchParams 변경이 `useParams`, `useAllParams`를 통해 이뤄진다고 가정하고 내부 store를 동기화합니다.

soft navigation처럼 hook을 통하지 않고 URLSearchParams가 변경되는 경우에는 감지할 수 없습니다.
