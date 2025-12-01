import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Typography,
} from '@kimdw-rtk/ui';

import { DocsMeta } from '@/plugins/docs-generator';

interface PropsDocumentProps {
  meta: DocsMeta;
}

export const PropsDocument = ({ meta }: PropsDocumentProps) => {
  return (
    <Table size="lg" sx={{ width: '100%' }} isStriped>
      <TableHeader>
        <TableRow>
          <TableHead textAlign="left">Name</TableHead>
          <TableHead textAlign="left">Type</TableHead>
          <TableHead textAlign="left">Default Value</TableHead>
          <TableHead textAlign="left">Description</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody sx={{ lineHeight: 'md' }}>
        {meta.props.map((prop) => (
          <TableRow key={prop.name}>
            <TableCell sx={{ fontWeight: 'semiBold' }}>{prop.name}</TableCell>
            <TableCell>{prop.typeRaw ? prop.typeRaw : prop.type}</TableCell>
            <TableCell>
              {prop.isRequired ? (
                <Typography fontSize="sm" fontWeight={'semiBold'}>
                  Required
                </Typography>
              ) : (
                prop.defaultValue
              )}
            </TableCell>
            <TableCell>{prop.description ?? '-'}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
