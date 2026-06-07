import { Button } from '@kimdw-rtk/ui';
import { MoonIcon, SunIcon } from 'lucide-react';

interface ThemeToggleButtonProps {
  theme: 'light' | 'dark';
  onClick: () => void;
}

export const ThemeToggleButton = ({
  theme,
  onClick,
}: ThemeToggleButtonProps) => {
  return (
    <Button
      variant="ghost"
      color="secondary"
      size="md"
      onClick={onClick}
      aria-label="Toggle theme"
      icon={theme === 'light' ? <SunIcon /> : <MoonIcon />}
    />
  );
};
