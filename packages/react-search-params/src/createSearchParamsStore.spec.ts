import { act, renderHook } from '@testing-library/react';

import { createSearchParamsSchema } from './createSearchParamsSchema';
import { createSearchParamsStore } from './createSearchParamsStore';
import { Parser } from './parser';
import { delimiter } from './serializers';

type Params = {
  q: string;
  page: number;
  tags: number[];
  enabled: boolean;
};

const schema = createSearchParamsSchema<Params>({
  initialValue: {
    q: '',
    page: 1,
    tags: [],
    enabled: false,
  },
  validate: (params) => {
    const page = Number(params.page);

    if (!Number.isInteger(page) || page < 0) {
      throw new Error('페이지는 0 이상의 정수여야 합니다.');
    }

    return {
      q: String(params.q),
      page,
      tags: Parser.toArray(params.tags).map(Number),
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

  it('URL 쿼리로 초기 state를 동기화하고, 정의되지 않은 param은 기본값을 채운다.', () => {
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

  it('setState 호출 시 상태와 URL을 함께 갱신한다', () => {
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

  it('popstate 이벤트가 발생하면 스토어 상태를 갱신한다', () => {
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

  it('검증 실패 시 onValidationFailed를 호출하고 이전 상태를 유지한다', () => {
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

  it('cleanup 이후에는 popstate 이벤트에 반응하지 않는다.', () => {
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

  it('초기 URL에서 검증을 실패할 경우 defaultValue로 state를 정의한다.', () => {
    window.history.replaceState({}, '', '/?page=-1');
    const store = createSearchParamsStore({ serializer: delimiter(',') });
    cleanups.push(store.cleanup);

    const { result } = renderHook(() => store.useAllParams(schema));

    expect(result.current[0]).toEqual(schema.defaultValue);
  });
});
