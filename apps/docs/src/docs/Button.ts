import { Button } from '@kimdw-rtk/ui';

import { DocsProps } from '@/plugins/docs-generator';

export { Button };

export default {
  variant: 'Button의 variant',
  color: 'Button의 color',
  size: 'Button의 size',
} satisfies DocsProps<typeof Button>;
