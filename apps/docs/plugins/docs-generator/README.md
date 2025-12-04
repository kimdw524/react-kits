# docs-generator

React Component 문서를 생성할 수 있는 gatsby plugin입니다.
각 props에 대한 설명만 작성하면 문서를 자동으로 생성합니다.

## How to use

`gatsby-config.ts`에 플러그인을 추가해야 합니다.

```typescript
// gatsby-config.ts
const config: GatsbyConfig = {
  plugins: [
    {
      resolve: 'docs-generator',
      options: {
        template: path.resolve('./src/templates/DocumentTemplate.tsx'),
        slug?: '/docs',
        include?: 'src/docs/**/*.ts',
        tsconfig?: 'tsconfig.json'
      },
    },
  ],
};
```

### Options

| option   | type                   | default value         | description                                                                                                  |
| -------- | ---------------------- | --------------------- | ------------------------------------------------------------------------------------------------------------ |
| template | `string`               | **required**          | 문서 페이지 생성에 사용할 template의 절대 경로입니다.                                                        |
| slug     | `string`               | `'/docs'`             | 템플릿 기반으로 생성될 문서 페이지의 slug입니다. 실제 생성 경로는 `${slug}/${component.displayName}` 입니다. |
| include  | `string` \| `string[]` | `'src/docs/**/*_.ts'` | 문서 생성에 필요한 정보를 포함하고 있는 TS 파일들의 glob 경로입니다.                                         |
| tsconfig | `string`               | `'tsconfig.json'`     | 타입 추출에 사용될 프로젝트의 `tsconfig.json` 파일 경로입니다.                                               |

## 문서 페이지 생성하기

glob이 탐색할 수 있는 경로(option.include)에 아래와 같은 형태의 ts파일을 생성하세요.

- Component를 반드시 export 해야 합니다.
- props에 대한 설명은 반드시 식별자가 아닌, 객체 리터럴 자체를 default export 해야 합니다.
- optional props는 description이 존재하는 경우에만 문서에 명시됩니다.
- required props는 description이 없더라도 타입 정보가 문서에 명시됩니다.
- 파일 이름은 중요하지 않습니다.

```typescript
import { Button } from '@kimdw-rtk/ui';

import { DocsProps } from '@/plugins/docs-generator';

export { Button };

export default {
  variant: 'Button의 variant',
  color: 'Button의 color',
  size: 'Button의 size',
} satisfies DocsProps<typeof Button>;
```

## 문서 목록 가져오기

문서의 목록은 static query를 통해 가져올 수 있습니다.

```typescript
const data = useStaticQuery(graphql`
  query {
    allDocument {
      nodes {
        docs {
          slug
          name
        }
      }
    }
  }
`);
```

## Gatsby Template 만들기

### Template Sample

```typescript
import React from 'react';

import { graphql, useStaticQuery, type PageProps } from 'gatsby';

import { DocsMeta } from '@/plugins/docs-generator';

const DocumentTemplate: React.FC<PageProps> = ({ pageContext }) => {
  const { name, props } = pageContext as DocsMeta;
  const data = useStaticQuery(graphql`
    query {
      allDocument {
        nodes {
          docs {
            slug
            name
          }
        }
      }
    }
  `);

  console.log(name, props, data);

  return <main>Template</main>;
};

export default DocumentTemplate;
```

### pageContext Interface

```typescript
interface DocsMeta {
  name: string; // 컴포넌트의 displayName
  importStatement?: string; // 컴포넌트 사용에 필요한 import문
  props: {
    name: string;
    isRequired: boolean;
    type: string;
    defaultValue?: string;
    typeRaw?: string;
    description?: string;
  }[];
}
```

## 플러그인 기반으로 생성한 문서 페이지 예시

<img src="./docs/sample.png" alt="구현 예시" />
