import { Box, Button, Flex, Typography } from '@kimdw-rtk/ui';
import { Link } from 'gatsby';

interface DocumentListProps {
  items: { docs: { slug: string; name: string } }[];
  currentDocument?: string;
}

export const DocumentList = ({ items, currentDocument }: DocumentListProps) => {
  return (
    <Box flex flexDirection="column" padding="md">
      {items.map(({ docs }) => (
        <Link key={docs.slug} to={docs.slug} draggable={false}>
          <Typography
            sx={{ padding: 'lg' }}
            fontSize="sm"
            fontWeight={currentDocument === docs.name ? 'bold' : 'medium'}
          >
            {docs.name}
          </Typography>
        </Link>
      ))}
    </Box>
  );
};
