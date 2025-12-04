'use client';

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
      size="icon-md"
      onClick={onClick}
      aria-label="Toggle Theme"
    >
      {theme === 'light' ? <SunIcon /> : <MoonIcon />}
    </Button>
  );
};
