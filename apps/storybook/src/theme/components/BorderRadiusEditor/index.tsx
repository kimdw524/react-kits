import { useState } from 'react';

import { Flex, Slider, Typography } from '@kimdw-rtk/ui';

import type { ThemeVars } from '../../models';

interface BorderRadiusEditorProps {
  vars: ThemeVars;
  onUpdate: (vars: ThemeVars) => void;
}

export const BorderRadiusEditor = ({
  vars,
  onUpdate,
}: BorderRadiusEditorProps) => {
  const [defaultValue] = useState(() =>
    Math.round(Number.parseFloat(vars.borderRadius) / 0.125),
  );

  return (
    <Flex flexDirection="column" gap="md">
      <Flex alignItems="center" justifyContent="space-between">
        <Typography fontSize="sm" fontWeight="medium">
          Border Radius
        </Typography>
        <Typography fontSize="sm">{vars.borderRadius}</Typography>
      </Flex>
      <Slider
        min={0}
        max={16}
        defaultValue={defaultValue}
        onChange={(value) => {
          onUpdate({ ...vars, borderRadius: `${value * 0.125}em` });
        }}
      />
    </Flex>
  );
};
