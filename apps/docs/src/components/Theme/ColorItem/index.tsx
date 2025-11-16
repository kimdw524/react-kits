import { Box, Tooltip } from '@kimdw-rtk/ui';

import * as s from './style.css';

interface ColorItemProps {
  color: string;
  name: string;
}

export const ColorItem = ({ color, name }: ColorItemProps) => {
  return (
    <Tooltip size="sm" content={name}>
      <Box className={s.box} style={{ backgroundColor: `rgb(${color})` }} />
    </Tooltip>
  );
};
