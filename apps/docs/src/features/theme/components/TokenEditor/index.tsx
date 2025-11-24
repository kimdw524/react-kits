import { Card, CardContent, Flex } from '@kimdw-rtk/ui';

import { ColorList, ThemePreset } from '../../components';
import { ThemeVars } from '../../models';

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
            token={vars.light}
            onUpdate={onUpdate}
          />
          <ColorList
            theme="dark"
            vars={vars}
            header="Dark Theme"
            token={vars.dark}
            onUpdate={onUpdate}
          />
        </Flex>
      </CardContent>
    </Card>
  );
};
