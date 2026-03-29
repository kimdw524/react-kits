import { act, renderHook } from '@testing-library/react';

import { createSearchParamsSchema } from './createSearchParamsSchema';
import { createSearchParamsStore } from './createSearchParamsStore';
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

describe('createSearchParamsStore', () => {
  const cleanups: Array<() => void> = [];

  afterEach(() => {
    while (cleanups.length > 0) {
      cleanups.pop()?.();
    }
    window.history.replaceState({}, '', '/');
  });

  it('syncs initial state from URL query and fills undefined params with defaults', () => {
    window.history.replaceState({}, '', '/?q=react&page=2#section');
    const store = createSearchParamsStore({ serializer: delimiter(',') });
    cleanups.push(store.cleanup);

    const { result } = renderHook(() => store.useAllParams(schema));

    expect(result.current[0]).toEqual({
      q: 'react',
      page: 2,
      tags: [],
      enabled: false,
    });
  });

  it('updates both state and URL when setState is called', () => {
    window.history.replaceState({}, '', '/?q=old&page=1#tab');
    const store = createSearchParamsStore({ serializer: delimiter(',') });
    cleanups.push(store.cleanup);

    const { result } = renderHook(() => store.useAllParams(schema));

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

  it('updates store state when a popstate event occurs', () => {
    window.history.replaceState({}, '', '/?q=first&page=1');
    const store = createSearchParamsStore({ serializer: delimiter(',') });
    cleanups.push(store.cleanup);

    const { result } = renderHook(() => store.useAllParams(schema));

    act(() => {
      window.history.pushState({}, '', '/?q=second&page=4&enabled=true');
      window.dispatchEvent(new PopStateEvent('popstate'));
    });

    expect(result.current[0]).toEqual({
      q: 'second',
      page: 4,
      tags: [],
      enabled: true,
    });
  });

  it('calls onValidationFailed and keeps previous state on validation failure', () => {
    window.history.replaceState({}, '', '/?q=safe&page=1');
    const store = createSearchParamsStore({ serializer: delimiter(',') });
    cleanups.push(store.cleanup);

    const { result } = renderHook(() => store.useAllParams(schema));
    const onValidationFailed = jest.fn();

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

  it('does not respond to popstate events after cleanup', () => {
    window.history.replaceState({}, '', '/?q=alpha&page=1');
    const store = createSearchParamsStore({ serializer: delimiter(',') });
    const { result } = renderHook(() => store.useAllParams(schema));

    act(() => {
      store.cleanup();
      window.history.pushState({}, '', '/?q=beta&page=9');
      window.dispatchEvent(new PopStateEvent('popstate'));
    });

    expect(result.current[0]).toEqual({
      q: 'alpha',
      page: 1,
      tags: [],
      enabled: false,
    });
  });

  it('falls back to defaultValue when initial URL validation fails', () => {
    window.history.replaceState({}, '', '/?page=-1');
    const store = createSearchParamsStore({ serializer: delimiter(',') });
    cleanups.push(store.cleanup);

    const { result } = renderHook(() => store.useAllParams(schema));

    expect(result.current[0]).toEqual(schema.defaultValue);
  });

  it('validates only on init and popstate when skipValidation is true', () => {
    window.history.replaceState({}, '', '/?page=2');
    const store = createSearchParamsStore({ serializer: delimiter(',') });
    cleanups.push(store.cleanup);

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

    const { result } = renderHook(() => store.useAllParams(simpleSchema));

    expect(result.current[0]).toEqual({
      page: 2,
    });
    expect(validate).toHaveBeenCalled();

    act(() => {
      window.history.pushState({}, '', '/?page=3');
      window.dispatchEvent(new PopStateEvent('popstate'));
    });

    expect(result.current[0]).toEqual({
      page: 3,
    });

    const validationCallCount = validate.mock.calls.length;

    act(() => {
      result.current[1]({
        page: 10,
      });
    });

    expect(result.current[0]).toEqual({
      page: 10,
    });
    expect(validate).toHaveBeenCalledTimes(validationCallCount);
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

    window.history.replaceState({}, '', '/?tags=1');
    const store = createSearchParamsStore({ serializer: delimiter(',') });
    cleanups.push(store.cleanup);

    renderHook(() => store.useAllParams(tagsSchema));

    expect(validate).toHaveBeenCalledWith({
      tags: ['1'],
    });
  });

  it('returns undefined for missing values when using a partial schema', () => {
    window.history.replaceState({}, '', '/?q=react');
    const store = createSearchParamsStore({ serializer: delimiter(',') });
    cleanups.push(store.cleanup);

    const partialSchema = createSearchParamsSchema<{
      q: string;
      page: number;
    }>({
      partial: true,
      defaultValue: {},
      validate: (params) => {
        return {
          q: params.q ?? '',
          page: params.page !== undefined ? Number(params.page) : undefined,
        };
      },
    });

    const { result } = renderHook(() =>
      store.useParams(partialSchema, ['q', 'page']),
    );

    expect(result.current[0]).toEqual({
      q: 'react',
      page: undefined,
    });
  });

  it('allows setting undefined when using a partial schema', () => {
    window.history.replaceState({}, '', '/?q=react&page=2');
    const store = createSearchParamsStore({ serializer: delimiter(',') });
    cleanups.push(store.cleanup);

    const partialSchema = createSearchParamsSchema<{
      q: string;
      page: number;
    }>({
      partial: true,
      defaultValue: {},
      validate: (params) => {
        return {
          q: params.q ?? '',
          page: params.page !== undefined ? Number(params.page) : undefined,
        };
      },
    });

    const { result } = renderHook(() =>
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
});
