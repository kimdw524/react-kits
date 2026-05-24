'use client';

import { useEffect, useState, type ReactNode } from 'react';

import { AlignJustifyIcon, XIcon } from 'lucide-react';

import { Box, Button, Flex } from '#components';

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
          icon={isExpanded ? <XIcon /> : <AlignJustifyIcon />}
          size="md"
          variant="ghost"
          onClick={handleClick}
        />
        <div className={s.popup({ isVisible: isExpanded })}>
          <Flex
            alignItems="flex-end"
            flexDirection="column-reverse"
            gap="xl"
            paddingY="lg"
          >
            <Box width="100%" onClick={() => setIsExpanded(false)}>
              {menu}
            </Box>
            {aside}
          </Flex>
        </div>
      </div>
    </>
  );
};
