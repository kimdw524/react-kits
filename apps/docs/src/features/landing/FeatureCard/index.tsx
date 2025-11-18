import { ComponentProps, forwardRef } from 'react';

import { Card, CardContent, CardHeader, Typography } from '@kimdw-rtk/ui';

interface FeatureCardProps extends ComponentProps<typeof Card> {
  header: string;
}

export const FeatureCard = forwardRef<HTMLDivElement, FeatureCardProps>(
  ({ children, header, ...rest }, ref) => {
    return (
      <Card
        color="transparent"
        variant="contained"
        size="xl"
        sx={{ textAlign: 'left' }}
        style={{ flex: 1 }}
        ref={ref}
        {...rest}
      >
        <CardHeader>
          <Typography fontSize="xl" fontWeight="bold">
            {header}
          </Typography>
        </CardHeader>
        <CardContent>{children}</CardContent>
      </Card>
    );
  },
);
FeatureCard.displayName = 'FeatureCard';
