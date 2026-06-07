import type { ComponentProps } from 'react';

import {
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Flex,
  RadioGroup,
  RadioGroupItem,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Typography,
} from '@kimdw-rtk/ui';

export const Preferences = (props: ComponentProps<typeof Card>) => {
  return (
    <Card color="transparent" size="xl" {...props}>
      <CardHeader>
        <Typography fontSize="lg" fontWeight="medium">
          Preferences
        </Typography>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="notifications">
          <TabsList>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
          </TabsList>
          <TabsContent value="notifications">
            <Flex flexDirection="column" gap="md" paddingY="lg">
              <Checkbox defaultChecked>Email updates</Checkbox>
              <Checkbox defaultChecked>Product announcements</Checkbox>
              <Checkbox disabled>Weekly summary</Checkbox>
            </Flex>
          </TabsContent>
          <TabsContent value="appearance">
            <Flex paddingY="lg">
              <RadioGroup defaultValue="system" label="Color mode" gap="md">
                <RadioGroupItem value="light">Light</RadioGroupItem>
                <RadioGroupItem value="dark">Dark</RadioGroupItem>
                <RadioGroupItem value="system">System</RadioGroupItem>
              </RadioGroup>
            </Flex>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
