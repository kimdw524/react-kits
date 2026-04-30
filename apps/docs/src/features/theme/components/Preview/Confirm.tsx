import { ComponentProps } from 'react';

import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Flex,
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
        <Flex gap="md" justifyContent="flex-end" marginTop="lg">
          <Button color="success" size="sm" icon={<CheckIcon />} />
          <Button color="danger" size="sm" icon={<XIcon />} />
        </Flex>
      </CardContent>
    </Card>
  );
};
