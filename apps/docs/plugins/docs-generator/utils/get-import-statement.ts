import { Project, SourceFile } from 'ts-morph';

const getImportSources = (source: SourceFile) => {
  return source.getImportDeclarations().map((decl) => {
    const packageName = decl.getModuleSpecifierValue();

    const defaultImport = decl.getDefaultImport();
    if (defaultImport) {
      return { packageName, imports: defaultImport.getText() };
    }

    const imports: string[] = [];
    const namedImports = decl.getNamedImports();
    for (const i of namedImports) {
      imports.push(i.getNameNode().getText());
    }
    return { packageName, imports };
  });
};

export const getImportStatement = (project: Project, path: string) => {
  const source = project.addSourceFileAtPath(path);
  const importSources = getImportSources(source);

  for (const exportDecl of source.getExportDeclarations()) {
    for (const exp of exportDecl.getNamedExports()) {
      const name = exp.getName();

      const result = importSources.find((src) => src.imports.includes(name));

      if (result) {
        if (typeof result.imports === 'string') {
          return `import ${result.imports} from '${result.packageName}';`;
        }

        return `import { ${name} } from '${result.packageName}';`;
      }
    }
  }

  return undefined;
};
