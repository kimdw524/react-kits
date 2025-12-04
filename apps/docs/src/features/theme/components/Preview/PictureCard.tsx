import { ComponentProps } from 'react';

import {
  Card,
  CardContent,
  CardHeader,
  CardInteraction,
  Typography,
} from '@kimdw-rtk/ui';

export const PictureCard = (props: ComponentProps<typeof Card>) => {
  return (
    <Card size="xl" {...props}>
      <CardInteraction>
        <CardHeader>
          <Typography fontSize="lg" fontWeight="medium" isEllipsis>
            A Refreshing Morning Hike at Maple Ridge
          </Typography>
        </CardHeader>
        <CardContent>
          <Typography color="secondary-foreground" lineHeight="md">
            I went hiking at Maple Ridge today, and the weather was absolutely
            perfect. The trail was a bit steeper than I expected ...
          </Typography>
          <Typography
            color="secondary-foreground"
            fontSize="sm"
            fontWeight="medium"
            textAlign="right"
            sx={{ marginTop: 'lg' }}
          >
            136 days ago
          </Typography>
        </CardContent>
      </CardInteraction>
    </Card>
  );
};
