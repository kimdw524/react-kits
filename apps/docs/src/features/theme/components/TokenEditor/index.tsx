import { Card, CardContent, Flex } from '@kimdw-rtk/ui';

import { ThemeVars } from '@/features/theme/types';

import { ColorList } from '../ColorList';
import { ThemePreset } from '../ThemePreset';

interface TokenEditorProps {
  vars: ThemeVars;
  onUpdate: (vars: ThemeVars) => void;
}

export const TokenEditor = ({ vars, onUpdate }: TokenEditorProps) => {
  return (
    <Card size="xl">
      <CardContent>
        <Flex flexDirection="column" gap="xl">
          <ThemePreset onUpdate={onUpdate} />
          <ColorList
            theme="light"
            vars={vars}
            header="Light Theme"
            themeColor={vars.light}
            onUpdate={onUpdate}
          />
          <ColorList
            theme="dark"
            vars={vars}
            header="Dark Theme"
            themeColor={vars.dark}
            onUpdate={onUpdate}
          />
        </Flex>
      </CardContent>
    </Card>
  );
};
