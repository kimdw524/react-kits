import { ComponentProps } from 'react';

import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Flex,
  TextField,
  Typography,
} from '@kimdw-rtk/ui';

export const SignIn = (props: ComponentProps<typeof Card>) => {
  return (
    <Card color="transparent" size="xl" {...props}>
      <CardHeader>
        <Typography fontSize="lg" fontWeight="medium">
          Sign in
        </Typography>
      </CardHeader>
      <CardContent>
        <Flex flexDirection="column" gap="lg" paddingY="lg">
          <Typography fontWeight="medium">Email</Typography>
          <TextField type="email" placeholder="kimdw524@gmail.com" />
          <Typography fontWeight="medium">Password</Typography>
          <TextField type="password" />
        </Flex>
        <Box flex gap="md" justifyContent="flex-end" marginTop="lg">
          <Button variant="outlined">Create account</Button>
          <Button>Sign in</Button>
        </Box>
      </CardContent>
    </Card>
  );
};
