import { Card, CardContent, Flex } from '@kimdw-rtk/ui';

import { ThemeVars } from '#types';

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
            className="light"
            header="Light Theme"
            themeColor={vars.light}
          />
          <ColorList
            className="dark"
            header="Dark Theme"
            themeColor={vars.dark}
          />
        </Flex>
      </CardContent>
    </Card>
  );
};
