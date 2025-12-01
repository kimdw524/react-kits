import { Project, ScriptTarget } from 'ts-morph';

import { getImportStatement } from './get-import-statement';

const createTempFile = (
  project: Project,
  code: string,
  fileName = 'temp.ts',
) => {
  const file = project.createSourceFile(fileName, code, { overwrite: true });
  return file.getFilePath();
};

describe('getImportStatement', () => {
  let project: Project;

  beforeEach(() => {
    project = new Project({
      useInMemoryFileSystem: true,
      compilerOptions: { target: ScriptTarget.ESNext },
    });
  });

  test('named import의 import문을 생성할 수 있다.', () => {
    const filePath = createTempFile(
      project,
      `
      import { Test } from 'test';
      export { Test };
      `,
    );

    expect(getImportStatement(project, filePath)).toBe(
      `import { Test } from 'test';`,
    );
  });

  test('defauled import의 import문을 생성할 수 있다.', () => {
    const filePath = createTempFile(
      project,
      `
      import Test from 'test';
      export { Test };
      `,
    );

    expect(getImportStatement(project, filePath)).toBe(
      `import Test from 'test';`,
    );
  });
});
