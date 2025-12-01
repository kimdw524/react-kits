import { Project, ScriptTarget } from 'ts-morph';

import { parseObject } from './parse-object';

const createTempFile = (
  project: Project,
  code: string,
  fileName = 'temp.ts',
) => {
  const file = project.createSourceFile(fileName, code, { overwrite: true });
  return file.getFilePath();
};

describe('parseObject', () => {
  let project: Project;

  beforeEach(() => {
    project = new Project({
      useInMemoryFileSystem: true,
      compilerOptions: { target: ScriptTarget.ESNext },
    });
  });

  test('올바른 default export 객체 리터럴을 반환해야 한다.', async () => {
    const filePath = createTempFile(
      project,
      `
      export default {
        a: 1,
        b: "test"
      };
      `,
    );

    const expr = await parseObject(project, filePath);

    expect(expr).toEqual({ a: 1, b: 'test' });
  });

  test('괄호, satisfies, as를 적용해도 정상적으로 변환한다.', async () => {
    const sources = [
      `
      export default ({
        a: 1,
        b: "test"
      });
      `,
      `
      export default {
        a: 1,
        b: "test"
      } satisfies Record<string, unknown>;
      `,
      `
      export default ({
        a: 1,
        b: "test"
      }) as Record<string, unknown>;
      `,
    ];

    for (const source of sources) {
      const filePath = createTempFile(project, source);

      const expr = await parseObject(project, filePath);

      expect(expr).toEqual({ a: 1, b: 'test' });
    }
  });

  test('default export가 없으면 에러가 발생한다.', async () => {
    const filePath = createTempFile(
      project,
      `
      export const x = 10;
      `,
    );

    await expect(parseObject(project, filePath)).rejects.toThrow(
      'Default export not found.',
    );
  });

  test('default export가 객체 리터럴이 아니면 에러가 발생한다.', async () => {
    const filePath = createTempFile(
      project,
      `
      export default function foo() {}
      `,
    );

    await expect(parseObject(project, filePath)).rejects.toThrow(
      'Default export must be an export assignment.',
    );
  });

  test('객체의 value에 리터럴만 넣을 수 있다.', async () => {
    const filePath = createTempFile(
      project,
      `
      export default {
        a: Math.random()
      };
      `,
    );

    await expect(parseObject(project, filePath)).rejects.toThrow(
      'Not a literal value.',
    );
  });

  test('Property Assignment를 제외한 방식은 허용하지 않는다.', async () => {
    const filePath = createTempFile(
      project,
      `
      const a = 10;

      export default {
        a
      };
      `,
    );

    await expect(parseObject(project, filePath)).rejects.toThrow(
      'Unsupported property kind.',
    );
  });
});
