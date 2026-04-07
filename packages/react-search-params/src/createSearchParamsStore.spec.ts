import { createElement, type PropsWithChildren } from 'react';

import { act, renderHook } from '@testing-library/react';

import { SearchParamsAdapter } from './adapter';
import { createSearchParamsSchema } from './createSearchParamsSchema';
import {
  createSearchParamsStore,
  type SearchParamsStore,
} from './createSearchParamsStore';
import { delimiter } from './serializers';

type Params = {
  q: string;
  page: number;
  tags: number[];
  enabled: boolean;
};

const schema = createSearchParamsSchema<Params>({
  defaultValue: {
    q: '',
    page: 1,
    tags: [],
    enabled: false,
  },
  arrayParams: ['tags'],
  validate: (params) => {
    const page = Number(params.page);

    if (!Number.isInteger(page) || page < 0) {
      throw new Error('page must be an integer greater than or equal to 0');
    }

    return {
      q: String(params.q),
      page,
      tags: params.tags?.map(Number) ?? [],
      enabled:
        params.enabled === 'true'
          ? true
          : params.enabled === 'false'
            ? false
            : Boolean(params.enabled),
    };
  },
});

const createTestStore = () => {
  return createSearchParamsStore({ serializer: delimiter(',') });
};

const createWrapper = (store: SearchParamsStore) => {
  const Wrapper = ({ children }: PropsWithChildren) => {
    return createElement(SearchParamsAdapter, { store }, children);
  };

  return Wrapper;
};

const renderStoreHook = <Result>(
  store: SearchParamsStore,
  callback: () => Result,
) => {
  return renderHook(callback, {
    wrapper: createWrapper(store),
  });
};

const syncCurrentUrl = (store: SearchParamsStore) => {
  act(() => {
    store.updateFromSearch();
  });
};

const pushState = (url: string) => {
  window.history.pushState(
    {},
    '',
    url.startsWith('/')
      ? url
      : `${window.location.pathname}?${url}${window.location.hash}`,
  );
};

const replaceState = (url: string) => {
  window.history.replaceState(
    {},
    '',
    url.startsWith('/')
      ? url
      : `${window.location.pathname}?${url}${window.location.hash}`,
  );
};

describe('createSearchParamsStore', () => {
  afterEach(() => {
    jest.restoreAllMocks();
    act(() => {
      replaceState('/');
    });
  });

  it('reads the initial URL from the adapter-provided search params context', () => {
    replaceState('/?q=react&page=2#section');
    const store = createTestStore();

    const { result } = renderStoreHook(store, () => store.useAllParams(schema));

    expect(result.current[0]).toEqual({
      q: 'react',
      page: 2,
      tags: [],
      enabled: false,
    });
  });

  it('updates both state and URL when setState is called', () => {
    replaceState('/?q=old&page=1#tab');
    const store = createTestStore();

    const { result } = renderStoreHook(store, () => store.useAllParams(schema));

    act(() => {
      result.current[1]({
        q: 'new',
        page: 3,
        tags: [1, 2],
        enabled: true,
      });
    });

    expect(result.current[0]).toEqual({
      q: 'new',
      page: 3,
      tags: [1, 2],
      enabled: true,
    });

    expect(window.location.hash).toBe('#tab');
    expect(window.location.search).toBe(
      '?q=new&page=3&tags=1%2C2&enabled=true',
    );
  });

  it('updates store state when browser history changes through the adapter', () => {
    replaceState('/');
    const store = createTestStore();

    const { result } = renderStoreHook(store, () => store.useAllParams(schema));

    act(() => {
      pushState('/?q=second&page=4&enabled=true');
    });

    expect(result.current[0]).toEqual({
      q: 'second',
      page: 4,
      tags: [],
      enabled: true,
    });
  });

  it('calls onValidationFailed and keeps previous state on validation failure', () => {
    replaceState('/?q=safe&page=1');
    const store = createTestStore();

    const { result } = renderStoreHook(store, () => store.useAllParams(schema));
    const onValidationFailed = jest.fn();

    syncCurrentUrl(store);

    act(() => {
      result.current[1](() => ({ page: -1 }), { onValidationFailed });
    });

    expect(onValidationFailed).toHaveBeenCalledTimes(1);
    expect(result.current[0]).toEqual({
      q: 'safe',
      page: 1,
      tags: [],
      enabled: false,
    });
  });

  it('stops syncing browser events after the adapter unmounts', () => {
    replaceState('/');
    const store = createTestStore();
    const updateFromSearch = jest.spyOn(store, 'updateFromSearch');

    const { result, unmount } = renderStoreHook(store, () =>
      store.useAllParams(schema),
    );

    act(() => {
      pushState('/?q=beta&page=9');
    });

    expect(result.current[0]).toEqual({
      q: 'beta',
      page: 9,
      tags: [],
      enabled: false,
    });

    const callCountBeforeUnmount = updateFromSearch.mock.calls.length;
    expect(callCountBeforeUnmount).toBeGreaterThan(0);

    unmount();

    act(() => {
      pushState('/?q=gamma&page=10');
    });

    expect(updateFromSearch).toHaveBeenCalledTimes(callCountBeforeUnmount);
  });

  it('falls back to defaultValue when updateFromSearch validation fails', () => {
    replaceState('/?page=-1');
    const store = createTestStore();

    const { result } = renderStoreHook(store, () => store.useAllParams(schema));

    syncCurrentUrl(store);

    expect(result.current[0]).toEqual(schema.defaultValue);
  });

  it('validates updateFromSearch values and revalidates after setState history sync when skipValidation is true', () => {
    replaceState('/?page=2');
    const store = createTestStore();

    const validate = jest.fn(
      (params: { page?: number | string | string[] }) => {
        return {
          page: Number(params.page ?? 1),
        };
      },
    );

    const simpleSchema = createSearchParamsSchema<{ page: number }>({
      defaultValue: {
        page: 1,
      },
      validate,
      skipValidation: true,
    });

    const { result } = renderStoreHook(store, () =>
      store.useAllParams(simpleSchema),
    );

    expect(result.current[0]).toEqual({
      page: 2,
    });
    expect(validate).toHaveBeenCalledTimes(1);

    expect(result.current[0]).toEqual({
      page: 2,
    });
    expect(validate).toHaveBeenCalledTimes(1);

    act(() => {
      pushState('page=3');
    });
    expect(validate).toHaveBeenCalledTimes(2);
    expect(result.current[0]).toEqual({
      page: 3,
    });

    act(() => {
      replaceState('page=4');
    });
    expect(validate).toHaveBeenCalledTimes(3);
    expect(result.current[0]).toEqual({
      page: 4,
    });

    act(() => {
      result.current[1]({
        page: 10,
      });
    });
    expect(result.current[0]).toEqual({
      page: 10,
    });
    expect(validate).toHaveBeenCalledTimes(3);
  });

  it('passes single tag values to validate as an array', () => {
    const validate = jest.fn((params: { tags?: number[] | string[] }) => {
      return {
        tags: params.tags?.map(Number) ?? [],
      };
    });

    const tagsSchema = createSearchParamsSchema<{ tags: number[] }>({
      defaultValue: {
        tags: [],
      },
      arrayParams: ['tags'],
      validate,
    });

    replaceState('/?tags=1');
    const store = createTestStore();

    const { result } = renderStoreHook(store, () =>
      store.useAllParams(tagsSchema),
    );

    syncCurrentUrl(store);

    expect(validate).toHaveBeenCalledWith({
      tags: ['1'],
    });
    expect(result.current[0]).toEqual({
      tags: [1],
    });
  });

  it('returns undefined for missing values when using a partial schema', () => {
    replaceState('/?q=react');
    const store = createTestStore();

    const partialSchema = createSearchParamsSchema<{
      q: string;
      page: number;
    }>({
      partial: true,
      defaultValue: {},
      validate: (params) => {
        return {
          q: params.q,
          page: params.page !== undefined ? Number(params.page) : undefined,
        };
      },
    });

    const { result } = renderStoreHook(store, () =>
      store.useParams(partialSchema, ['q', 'page']),
    );

    expect(result.current[0]).toEqual({
      q: 'react',
      page: undefined,
    });
  });

  it('allows setting undefined when using a partial schema', () => {
    replaceState('/?q=react&page=2');
    const store = createTestStore();

    const partialSchema = createSearchParamsSchema<{
      q: string;
      page: number;
    }>({
      partial: true,
      defaultValue: {},
      validate: (params) => {
        return {
          q: params.q,
          page: params.page !== undefined ? Number(params.page) : undefined,
        };
      },
    });

    const { result } = renderStoreHook(store, () =>
      store.useParams(partialSchema, ['q', 'page']),
    );

    act(() => {
      result.current[1]({
        page: undefined,
      });
    });

    expect(result.current[0]).toEqual({
      q: 'react',
      page: undefined,
    });
  });

  it('removes the value from the URL when a partial schema sets it to undefined', () => {
    replaceState('/?q=react&page=2');
    const store = createTestStore();

    const partialSchemaWithDefaults = createSearchParamsSchema<{
      q: string;
      page: number;
    }>({
      partial: true,
      defaultValue: {
        q: '',
        page: 1,
      },
      validate: (params) => {
        return {
          q: params.q,
          page: params.page !== undefined ? Number(params.page) : undefined,
        };
      },
    });

    const { result } = renderStoreHook(store, () =>
      store.useAllParams(partialSchemaWithDefaults),
    );

    act(() => {
      result.current[1]({
        page: undefined,
      });
    });

    expect(window.location.search).toBe('?q=react');
  });

  it('returns the expected value when using arrayParams in a partial schema after sync and updates', () => {
    replaceState('/?tags=1');
    const store = createTestStore();

    const partialArraySchema = createSearchParamsSchema<{
      tags: number[];
    }>({
      partial: true,
      defaultValue: {},
      arrayParams: ['tags'],
      validate: (params) => {
        return {
          tags: params.tags?.map(Number),
        };
      },
    });

    const { result } = renderStoreHook(store, () =>
      store.useParams(partialArraySchema, ['tags']),
    );

    syncCurrentUrl(store);

    expect(result.current[0]).toEqual({
      tags: [1],
    });

    act(() => {
      result.current[1]({
        tags: undefined,
      });
    });

    expect(result.current[0]).toEqual({
      tags: undefined,
    });

    act(() => {
      result.current[1]({
        tags: [1, 2],
      });
    });

    expect(result.current[0]).toEqual({
      tags: [1, 2],
    });
  });
});
