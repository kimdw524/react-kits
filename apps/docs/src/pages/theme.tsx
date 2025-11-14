import { useState } from 'react';

import { Box, Button, Flex } from '@kimdw-rtk/ui';
import { type HeadFC, type PageProps } from 'gatsby';

import { Layout, ThemeToggleButton } from '#components';
import { Preview } from '#components/Theme';

const ThemePage: React.FC<PageProps> = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  return (
    <Layout size="lg">
      <Box className={theme} backgroundColor="background" padding="lg" rounded>
        <Box
          flex
          alignItems="center"
          justifyContent="space-between"
          marginBottom="lg"
          padding="md"
          backgroundColor="accent"
          rounded
        >
          <Flex alignItems="center" gap="sm">
            <ThemeToggleButton
              theme={theme}
              onClick={() =>
                setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
              }
            />
            <Button color="blue" size="sm" sx={{ marginLeft: 'sm' }}>
              Blue
            </Button>
            <Button color="red" size="sm">
              Red
            </Button>
          </Flex>
          <div>
            <Button size="sm">Generate Code</Button>
          </div>
        </Box>
        <Preview />
      </Box>
    </Layout>
  );
};

export default ThemePage;

export const Head: HeadFC = () => (
  <>
    <title>Theme Page</title>
    <body className="light" />
  </>
);
