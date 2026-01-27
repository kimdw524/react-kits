import React from 'react';

import { Box, Flex, Typography } from '@kimdw-rtk/ui';
import { graphql, useStaticQuery, type PageProps } from 'gatsby';

import { DocumentList, PropsDocument } from '@/features/document/components';
import { DocsMeta } from '@/plugins/docs-generator';
import { Layout } from '@/shared/components';

const DocumentTemplate: React.FC<PageProps> = ({ pageContext }) => {
  const { name, importStatement } = pageContext as DocsMeta;
  const data: {
    allDocument: { nodes: { docs: { slug: string; name: string } }[] };
  } = useStaticQuery(graphql`
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

  return (
    <Layout size="lg">
      <Flex
        flexDirection={{ mobile: 'column', desktop: 'row' }}
        gap="xl"
        padding="xl"
        style={{ height: '100vh' }}
      >
        <Box style={{ flexBasis: '260px', flexShrink: 0 }}>
          <DocumentList items={data.allDocument.nodes} currentDocument={name} />
        </Box>
        <Box>
          <Typography fontSize="2xl" fontWeight="medium" sx={{ marginY: 'xl' }}>
            Usage
          </Typography>
          <Box
            backgroundColor="secondary"
            color="secondary-foreground"
            padding="xl"
            fontWeight="medium"
            rounded
          >
            {importStatement ?? 'Failed to generate import statement.'}
          </Box>
          <Typography fontSize="2xl" fontWeight="medium" sx={{ marginY: 'xl' }}>
            Props
          </Typography>
          <PropsDocument meta={pageContext as DocsMeta} />
        </Box>
      </Flex>
    </Layout>
  );
};

export default DocumentTemplate;
