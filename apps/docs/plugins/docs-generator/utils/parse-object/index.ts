import {
  Expression,
  Node,
  ObjectLiteralExpression,
  Project,
  SyntaxKind,
} from 'ts-morph';

type LiteralValue =
  | string
  | number
  | boolean
  | null
  | LiteralValue[]
  | { [key: string]: LiteralValue };

const unwrapExpression = (expr: Expression): Expression => {
  if (
    Node.isAsExpression(expr) ||
    Node.isSatisfiesExpression(expr) ||
    Node.isParenthesizedExpression(expr)
  ) {
    return unwrapExpression(expr.getExpression());
  }

  return expr;
};

const objectLiteralToObject = (
  node: ObjectLiteralExpression,
): { [key: string]: LiteralValue } => {
  const result: Record<string, LiteralValue> = {};

  for (const prop of node.getProperties()) {
    if (!Node.isPropertyAssignment(prop)) {
      throw new Error('Unsupported property kind.');
    }

    const key = prop.getName();
    const initializer = prop.getInitializer();

    if (!initializer) {
      throw new Error('Unsupported property kind.');
    }

    result[key] = evalInitializer(initializer);
  }

  return result;
};

const evalInitializer = (init: Node): LiteralValue => {
  switch (init.getKind()) {
    case SyntaxKind.StringLiteral:
      return init.getText().slice(1, -1);

    case SyntaxKind.NumericLiteral:
      return Number(init.getText());

    case SyntaxKind.TrueKeyword:
      return true;

    case SyntaxKind.FalseKeyword:
      return false;

    case SyntaxKind.NullKeyword:
      return null;

    case SyntaxKind.ArrayLiteralExpression:
      return init
        .asKindOrThrow(SyntaxKind.ArrayLiteralExpression)
        .getElements()
        .map((e) => evalInitializer(e));

    case SyntaxKind.ObjectLiteralExpression:
      return objectLiteralToObject(
        init.asKindOrThrow(SyntaxKind.ObjectLiteralExpression),
      );

    default:
      throw new Error('Not a literal value.');
  }
};

export const parseObject = async (project: Project, path: string) => {
  const source = project.addSourceFileAtPath(path);

  const symbol = source.getDefaultExportSymbol();
  if (!symbol) {
    throw new Error('Default export not found.');
  }

  const declarations = symbol.getDeclarations();
  if (declarations.length === 0) {
    throw new Error('No default export declarations found.');
  }

  const decl = declarations[0];

  if (!Node.isExportAssignment(decl)) {
    throw new Error('Default export must be an export assignment.');
  }

  const expr = unwrapExpression(decl.getExpression());
  if (!Node.isObjectLiteralExpression(expr)) {
    throw new Error('Default export is not an object literal.');
  }

  return objectLiteralToObject(expr);
};
