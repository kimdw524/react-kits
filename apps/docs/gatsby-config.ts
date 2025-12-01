import type { GatsbyConfig } from 'gatsby';
import path from 'path';

const config: GatsbyConfig = {
  siteMetadata: {
    title: `react-kits docs`,
    siteUrl: `https://www.yourdomain.tld`,
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: [
    'gatsby-plugin-vanilla-extract',
    'gatsby-plugin-mdx',
    'gatsby-plugin-image',
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-portal',
      options: {
        key: 'container',
        id: 'container',
      },
    },
    {
      resolve: 'gatsby-plugin-alias-imports',
      options: {
        alias: {
          '@/*': 'src/*',
        },
      },
    },
    'ignore-mini-css-extract-warning',
    {
      resolve: 'docs-generator',
      options: {
        template: path.resolve('./src/templates/DocumentTemplate.tsx'),
      },
    },
  ],
  jsxRuntime: 'automatic',
};

export default config;
