import { ComponentProps } from 'react';

import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Flex,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Typography,
} from '@kimdw-rtk/ui';

const data = [
  [5, 'Processing', 'g66@gmail.com', '$18.00'],
  [4, 'Processing', 'z55@gmail.com', '$36.00'],
  [3, 'Pending', 'e77@gmail.com', '$3.00'],
  [2, 'Success', 'a22@gmail.com', '$87.00'],
  [1, 'Failed', 'y00@gmail.com', '$153.00'],
];

export const Payments = (props: ComponentProps<typeof Card>) => {
  return (
    <Card color="transparent" size="xl" {...props}>
      <CardHeader>
        <Typography fontSize="lg" fontWeight="medium">
          Payments
        </Typography>
      </CardHeader>
      <CardContent>
        <Table size="lg" sx={{ width: '100%' }} isStriped>
          <TableHeader>
            <TableRow>
              <TableHead textAlign="left">ID</TableHead>
              <TableHead textAlign="left">Status</TableHead>
              <TableHead textAlign="left">Email</TableHead>
              <TableHead textAlign="right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item[0]}</TableCell>
                <TableCell>{item[1]}</TableCell>
                <TableCell>{item[2]}</TableCell>
                <TableCell textAlign="right">{item[3]}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Flex justifyContent="flex-end" marginTop="lg">
          <Button color="secondary" size="sm" variant="ghost" disabled>
            Previous
          </Button>
          <Button color="secondary" size="sm" variant="ghost">
            Next
          </Button>
        </Flex>
      </CardContent>
    </Card>
  );
};
