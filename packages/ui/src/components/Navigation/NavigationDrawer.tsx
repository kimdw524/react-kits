'use client';

import { useEffect, useState, type ReactNode } from 'react';

import { AlignJustifyIcon, XIcon } from 'lucide-react';

import { Box, Button } from '#components';

import * as s from './NavigationDrawer.css';

interface NavigationDrawerProps {
  menu: ReactNode;
  aside: ReactNode;
}

export const NavigationDrawer = ({ menu, aside }: NavigationDrawerProps) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const handleClick = () => {
    setIsExpanded((prev) => !prev);
  };

  useEffect(() => {
    if (isExpanded) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      if (isExpanded) {
        document.body.style.overflow = 'auto';
      }
    };
  }, [isExpanded]);

  return (
    <>
      <div className={s.wide}>
        {menu}
        {aside}
      </div>
      <div className={s.narrow}>
        <Button
          color="secondary"
          size="icon-md"
          variant="ghost"
          onClick={handleClick}
        >
          {isExpanded ? <XIcon /> : <AlignJustifyIcon />}
        </Button>
        <div className={s.popup({ isVisible: isExpanded })}>
          <Box
            alignItems="flex-end"
            flexDirection="column-reverse"
            gap="xl"
            paddingY="lg"
            flex
          >
            <Box width="100%" onClick={() => setIsExpanded(false)}>
              {menu}
            </Box>
            {aside}
          </Box>
        </div>
      </div>
    </>
  );
};
