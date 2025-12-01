import { withCustomConfig } from 'react-docgen-typescript';

import glob from 'fast-glob';
import type { GatsbyNode, PluginOptions } from 'gatsby';
import { Project } from 'ts-morph';

import { DocsMeta } from './types';
import { getImportStatement, mapProps, parseObject } from './utils';

const getOptions = (options: PluginOptions) => {
  const tsconfig = (options.tsconfig ?? 'tsconfig.json') as string;
  const slug = (options.slug ?? '/docs') as string;
  const include = (options.include ?? 'src/docs/**/*.ts') as string | string[];
  const template = options.template as string;

  return { tsconfig, slug, include, template };
};

export const createSchemaCustomization: GatsbyNode['createSchemaCustomization'] =
  ({ actions }) => {
    actions.createTypes(`
      type Document implements Node {
        id: ID!
        docs: DocumentData
      }

      type DocumentData {
        slug: String!
        name: String
      }
    `);
  };

export const sourceNodes: GatsbyNode['sourceNodes'] = async (
  { actions, createNodeId, createContentDigest },
  options,
) => {
  const { include, slug, tsconfig } = getOptions(options);

  const parser = withCustomConfig(tsconfig, {
    shouldExtractLiteralValuesFromEnum: true,
    shouldExtractValuesFromUnion: true,
  });

  const files = await glob(include, {
    absolute: true,
  });

  for (const file of files) {
    const component = parser.parse(file)[0];
    if (!component) {
      continue;
    }

    const docsData = {
      slug: `${slug}/${component.displayName}`,
      name: component.displayName,
    };

    actions.createNode({
      id: createNodeId(`docs-generator-document-${component.displayName}`),
      docs: docsData,
      internal: {
        type: 'Document',
        contentDigest: createContentDigest(docsData),
      },
    });
  }
};

export const createPages: GatsbyNode['createPages'] = async (
  { actions },
  options,
) => {
  const { include, slug, template, tsconfig } = getOptions(options);

  const files = await glob(include, {
    absolute: true,
  });

  const project = new Project({
    tsConfigFilePath: tsconfig,
  });

  const parser = withCustomConfig(tsconfig, {
    shouldExtractLiteralValuesFromEnum: true,
    shouldExtractValuesFromUnion: true,
  });

  // <!-- docs metadata 생성하기
  for (const file of files) {
    const object = await parseObject(project, file);

    const component = parser.parse(file)[0];
    if (!component) {
      continue;
    }

    actions.createPage({
      path: `${slug}/${component.displayName}`,
      component: template,
      context: {
        name: component.displayName,
        importStatement: getImportStatement(project, file),
        props: mapProps(object, component),
      } satisfies DocsMeta,
    });
  }
  // -->
};
