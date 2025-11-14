import { ComponentProps } from 'react';

import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Typography,
} from '@kimdw-rtk/ui';
import { CheckIcon, XIcon } from 'lucide-react';

export const Confirm = (props: ComponentProps<typeof Card>) => {
  return (
    <Card color="transparent" size="xl" {...props}>
      <CardHeader>
        <Typography fontSize="lg" fontWeight="medium">
          Confirm
        </Typography>
      </CardHeader>
      <CardContent>
        <Typography>Would you like to accept the request?</Typography>
        <Box flex gap="md" justifyContent="flex-end" marginTop="lg">
          <Button color="success" size="icon-sm">
            <CheckIcon />
          </Button>
          <Button color="danger" size="icon-sm">
            <XIcon />
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};
