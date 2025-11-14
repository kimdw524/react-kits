import { Animated } from '@kimdw-rtk/animation';
import { Flex } from '@kimdw-rtk/ui';

import { Confirm } from './Confirm';
import { Payments } from './Payments';
import { PictureCard } from './PictureCard';
import { Profile } from './Profile';
import { Search } from './Search';
import { SignIn } from './SignIn';

export const Preview = () => {
  return (
    <Animated.Box
      duration={800}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <Flex
        gap="xl"
        alignItems="flex-start"
        justifyContent="center"
        flexWrap="wrap"
      >
        <Flex
          flexDirection="column"
          flexShrink="0"
          gap="xl"
          style={{ flex: 3.5, flexBasis: '350px' }}
        >
          <SignIn />
          <Profile />
        </Flex>
        <Flex
          flexDirection="column"
          flexShrink="0"
          gap="xl"
          style={{ flex: 4, flexBasis: '400px' }}
        >
          <Payments />
          <Search />
        </Flex>
        <Flex
          flexDirection="column"
          flexShrink="0"
          gap="xl"
          style={{ flex: 3, flexBasis: '300px' }}
        >
          <PictureCard />
          <Confirm />
        </Flex>
      </Flex>
    </Animated.Box>
  );
};
