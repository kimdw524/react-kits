import { ComponentProps, useState } from 'react';

import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Flex,
  Range,
  Select,
  SelectOption,
  Typography,
} from '@kimdw-rtk/ui';

export const Search = (props: ComponentProps<typeof Card>) => {
  const [range, setRange] = useState<{ min: number; max: number }>({
    min: 2,
    max: 4,
  });

  return (
    <Card color="transparent" size="xl" {...props}>
      <CardHeader>
        <Typography fontSize="lg" fontWeight="medium">
          Search
        </Typography>
      </CardHeader>
      <CardContent>
        <Flex flexDirection="column" gap="3xl" paddingY="lg">
          <Flex flexDirection="column" gap="lg">
            <Typography fontWeight="medium">Category</Typography>
            <Select defaultValue="1">
              <SelectOption value="1">Beverages</SelectOption>
              <SelectOption value="2">Snacks</SelectOption>
              <SelectOption value="3">Bakery</SelectOption>
            </Select>
          </Flex>

          <Flex flexDirection="column" gap="lg">
            <Flex alignItems="center" justifyContent="space-between">
              <Typography fontWeight="medium">Price</Typography>
              <Typography fontSize="sm">
                ${range.min} ~ ${range.max}
              </Typography>
            </Flex>

            <Box paddingX="lg">
              <Range
                min={1}
                max={10}
                defaultMinValue={2}
                defaultMaxValue={4}
                onChange={(min: number, max: number) => setRange({ min, max })}
              />
            </Box>
          </Flex>
        </Flex>
        <Box flex gap="md" justifyContent="flex-end" marginTop="lg">
          <Button color="secondary">Cancel</Button>
          <Button>Search</Button>
        </Box>
      </CardContent>
    </Card>
  );
};
