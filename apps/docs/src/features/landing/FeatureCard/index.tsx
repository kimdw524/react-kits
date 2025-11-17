import { ReactNode } from 'react';

import { Card, CardContent, CardInteraction, Typography } from '@kimdw-rtk/ui';

interface FeatureCardProps {
  name: string;
  packageName: string;
  children: ReactNode;
}

export const FeatureCard = ({
  children,
  name,
  packageName,
}: FeatureCardProps) => {
  return (
    <Card color="transparent" style={{ flex: 1 }}>
      <CardInteraction>
        <CardContent sx={{ padding: 'xl' }}>
          <Typography fontSize="2xl" fontWeight="semiBold">
            {name}
          </Typography>
          <Typography
            fontSize="md"
            color="muted-foreground"
            sx={{ marginY: 'md' }}
          >
            {packageName}
          </Typography>
          <Typography
            wordBreak="keep-all"
            lineHeight="md"
            sx={{ marginTop: 'lg' }}
          >
            {children}
          </Typography>
        </CardContent>
      </CardInteraction>
    </Card>
  );
};
