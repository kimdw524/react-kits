import { ComponentProps } from 'react';

import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Flex,
  Select,
  SelectOption,
  TextField,
  Typography,
} from '@kimdw-rtk/ui';

export const Profile = (props: ComponentProps<typeof Card>) => {
  return (
    <Card color="transparent" size="xl" {...props}>
      <CardHeader>
        <Typography fontSize="lg" fontWeight="medium">
          Profile
        </Typography>
      </CardHeader>
      <CardContent>
        <Flex flexDirection="column" gap="xl" paddingY="lg">
          <Flex flexDirection="column" gap="lg">
            <Typography fontSize="sm" fontWeight="medium">
              Name
            </Typography>
            <TextField name="name" size="sm" defaultValue="Kim" />
          </Flex>

          <Flex flexDirection="column" gap="lg">
            <Typography fontSize="sm" fontWeight="medium">
              Gender
            </Typography>
            <Select defaultValue="1" size="sm" variant="contained">
              <SelectOption value="1">Male</SelectOption>
              <SelectOption value="2">Female</SelectOption>
            </Select>
          </Flex>

          <Flex flexDirection="column" gap="lg">
            <Typography fontSize="sm" fontWeight="medium">
              Skills
            </Typography>

            <Flex flexWrap="nowrap" gap="md">
              <Chip size="sm">JavaScript</Chip>
              <Chip size="sm">TypeScript</Chip>
              <Chip size="sm">React</Chip>
              <Chip color="secondary" size="sm" sx={{ cursor: 'pointer' }}>
                Add more
              </Chip>
            </Flex>
          </Flex>
        </Flex>
        <Box flex gap="md" justifyContent="flex-end" marginTop="lg">
          <Button size="sm" color="secondary">
            Cancel
          </Button>
          <Button size="sm">Update</Button>
        </Box>
      </CardContent>
    </Card>
  );
};
