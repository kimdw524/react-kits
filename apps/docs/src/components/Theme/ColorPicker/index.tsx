import { CSSProperties, useState } from 'react';

import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  Flex,
  TextField,
  theme,
  Typography,
} from '@kimdw-rtk/ui';
import { useOverlay } from '@kimdw-rtk/utils';

import { ColorPalette } from '../ColorPalette';
import * as s from './style.css';

interface ColorPickerProps {
  defaultColor: string;
  onChange: (color: string) => void;
}

const formatNumber = (value: string) => {
  return Math.max(Math.min(255, Number(value)), 0);
};

const numberToString = (value: string) => {
  return value.split(',').map(formatNumber) as [number, number, number];
};

export const ColorPicker = ({ defaultColor, onChange }: ColorPickerProps) => {
  const [color, setColor] = useState<[number, number, number]>(() =>
    numberToString(defaultColor),
  );
  const { close } = useOverlay();

  const handleApplyClick = () => {
    onChange(`${color[0]}, ${color[1]}, ${color[2]}`);
    close();
  };

  return (
    <Dialog style={{ maxWidth: '800px' }}>
      <DialogHeader onCloseClick={close}>Color Picker</DialogHeader>
      <DialogContent>
        <Flex flexDirection="column" gap="lg">
          <Box>
            <ColorPalette
              onClick={(color: string) => setColor(numberToString(color))}
            />
          </Box>
          <Box>
            <Flex gap="xl" alignItems="center">
              <Box flexShrink="0">
                <div
                  className={s.box}
                  style={
                    {
                      '--border': `rgb(${theme.color.foreground})`,
                      backgroundColor: `rgb(${color[0]}, ${color[1]}, ${color[2]})`,
                    } as CSSProperties
                  }
                />
              </Box>
              <Box>
                <Flex gap="lg">
                  <Flex flexDirection="column" gap="md" alignItems="center">
                    <Typography fontWeight="semiBold">R</Typography>
                    <TextField
                      type="number"
                      name="r"
                      value={color[0]}
                      onChange={(e) =>
                        setColor((prev) => [
                          formatNumber(e.target.value),
                          prev[1],
                          prev[2],
                        ])
                      }
                    />
                  </Flex>
                  <Flex flexDirection="column" gap="md" alignItems="center">
                    <Typography fontWeight="semiBold">G</Typography>
                    <TextField
                      type="number"
                      name="g"
                      value={color[1]}
                      onChange={(e) =>
                        setColor((prev) => [
                          prev[0],
                          formatNumber(e.target.value),
                          prev[2],
                        ])
                      }
                    />
                  </Flex>
                  <Flex flexDirection="column" gap="md" alignItems="center">
                    <Typography fontWeight="semiBold">B</Typography>
                    <TextField
                      type="number"
                      name="b"
                      value={color[2]}
                      onChange={(e) =>
                        setColor((prev) => [
                          prev[0],
                          prev[1],
                          formatNumber(e.target.value),
                        ])
                      }
                    />
                  </Flex>
                </Flex>
              </Box>
            </Flex>
          </Box>
        </Flex>
      </DialogContent>
      <DialogFooter>
        <Flex gap="md" padding="xl">
          <Button color="secondary" onClick={close}>
            Cancel
          </Button>
          <Button onClick={handleApplyClick}>Apply</Button>
        </Flex>
      </DialogFooter>
    </Dialog>
  );
};
