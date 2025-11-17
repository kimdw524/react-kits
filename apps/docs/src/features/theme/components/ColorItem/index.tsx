import { Box, Tooltip } from '@kimdw-rtk/ui';
import { useOverlay } from '@kimdw-rtk/utils';

import { ColorPicker } from '../ColorPicker';
import * as s from './style.css';

interface ColorItemProps {
  color: string;
  name: string;
  onChange: (value: string) => void;
}

export const ColorItem = ({ color, name, onChange }: ColorItemProps) => {
  const { push } = useOverlay();

  const handleClick = () => {
    push(<ColorPicker defaultColor={color} onChange={onChange} />);
  };

  return (
    <Tooltip size="sm" content={name}>
      <Box
        className={s.box}
        style={{ backgroundColor: `rgb(${color})` }}
        onClick={handleClick}
      />
    </Tooltip>
  );
};
