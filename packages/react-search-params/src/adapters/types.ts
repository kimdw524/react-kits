import type { PropsWithChildren } from 'react';

import type { SearchParamsStore } from '#createSearchParamsStore';

export type AdapterProps = PropsWithChildren<{ store: SearchParamsStore }>;
