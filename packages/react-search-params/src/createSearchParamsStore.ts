'use client';

import { useRef } from 'react';

import type {
  NoDuplicates,
  ParamsDispatch,
  ParamValue,
  Serializer,
  SetParamsAction,
  SetParamsOptions,
} from '#types';
import {
  filterObject,
  objectToURLSearchParams,
  resolveLazy,
  shallowEqual,
} from '#utils';

import {
  useInitialSearchParams,
  useSearchParams,
} from './SearchParamsProvider';
import type { SearchParamsSchema } from './createSearchParamsSchema';
import { createStore } from './store';

/**
 * Creates a store synchronized with `URLSearchParams`.
 *
 * @param serializer `Serializer` used to encode and decode query params.
 */
export const createSearchParamsStore = ({
  serializer,
}: {
  serializer: Serializer;
}) => {
  const store = createStore<Record<string, ParamValue>>();
  const isServer = typeof window === 'undefined';

  const status = {
    search: '',
    isValidated: false,
  };

  const setParam = <T extends Record<string, ParamValue>>(
    value: SetParamsAction<T>,
    history: NonNullable<SetParamsOptions['history']> = 'pushState',
  ): void => {
    const nextValue =
      typeof value === 'function' ? value(store.getState() as T) : value;

    store.setState((prev) => ({ ...prev, ...nextValue }));

    if (isServer) {
      return;
    }

    const urlSearchParams = new URLSearchParams(window.location.search);

    for (const key in nextValue) {
      if (nextValue[key] === undefined) {
        urlSearchParams.delete(key);
        continue;
      }

      const serializedValue = serializer.serialize(nextValue[key]!);

      urlSearchParams.delete(key);
      for (const i of serializedValue) {
        urlSearchParams.append(key, i);
      }
    }

    const searchParams = urlSearchParams.toString();
    const search = searchParams === '' ? '' : `?${searchParams}`;
    status.search = searchParams;
    status.isValidated = true;

    window.history[history](
      {},
      '',
      `${window.location.pathname}${search}${window.location.hash}`,
    );
  };

  /**
   * Subscribes to selected param values.
   *
   * @param schema Search params schema.
   * @param keys Param keys.
   * @returns Selected param values.
   */
  const useParams = <
    T extends Record<string, ParamValue>,
    const K extends (keyof T)[],
  >(
    schema: SearchParamsSchema<T>,
    keys: NoDuplicates<K> | (() => NoDuplicates<K>),
  ): [{ [P in K[number]]: T[P] }, ParamsDispatch<SetParamsAction<T>>] => {
    const selectedKeys = resolveLazy(keys);

    const initialSearchParams = useInitialSearchParams();
    const prevSearchParamsRef = useRef<string | null>(null);
    const searchParams = useSearchParams();

    if (searchParams !== null && prevSearchParamsRef.current !== searchParams) {
      prevSearchParamsRef.current = searchParams;

      if (status.search !== searchParams) {
        try {
          store.mutateState(
            serializer.deserialize(new URLSearchParams(searchParams)),
          );
          status.isValidated = false;
          status.search = searchParams;
        } catch {
          //
        }
      }
    }

    const parseArrayParams = (params: Record<keyof T, ParamValue>) => {
      const result = { ...params } as T;

      for (const key of schema.arrayParams as Set<keyof T>) {
        const value = params[key];
        if (value !== undefined && !Array.isArray(value)) {
          result[key] = [value] as T[typeof key];
        }
      }

      return result;
    };

    const parseParams = (params: Record<keyof T, ParamValue>): T => {
      return schema.validate(parseArrayParams(params));
    };

    const updateState = () => {
      if (status.isValidated) {
        return;
      }

      try {
        store.mutateState(
          parseParams({ ...schema.defaultValue, ...store.getState() }),
        );
      } catch {
        store.mutateState(schema.defaultValue);
      }
      status.isValidated = true;
    };

    const getServerState = (): T => {
      if (initialSearchParams === null) {
        return schema.defaultValue;
      }

      try {
        return parseParams({
          ...schema.defaultValue,
          ...serializer.deserialize(
            new URLSearchParams(objectToURLSearchParams(initialSearchParams)),
          ),
        });
      } catch {
        return schema.defaultValue;
      }
    };

    const state = resolveLazy(
      isServer
        ? () => filterObject(getServerState(), selectedKeys)
        : () =>
            store.useStoreWithSelector((state) => {
              updateState();
              return filterObject(state as T, selectedKeys);
            }, shallowEqual),
    );

    /**
     * Updates params.
     *
     * @param value Partial params or an updater function.
     * @param options Update options.
     */
    const setState = (
      value: SetParamsAction<T>,
      { history, onValidationFailed }: SetParamsOptions = {
        history: 'pushState',
      },
    ) => {
      try {
        if (typeof value === 'function') {
          updateState();

          setParam((prev) => {
            const nextState = {
              ...store.getState(),
              ...value(prev as T),
            };

            return schema.skipValidation ? nextState : parseParams(nextState);
          }, history);
          return;
        }

        const nextState = { ...store.getState(), ...value };
        setParam(
          schema.skipValidation ? nextState : parseParams(nextState),
          history,
        );
        status.isValidated = true;
      } catch (error) {
        onValidationFailed?.(error);
      }
    };

    return [state, setState];
  };

  /**
   * Subscribes to all schema param values.
   *
   * @param schema Search params schema.
   * @returns All param values.
   */
  const useAllParams = <T extends Record<string, ParamValue>>(
    schema: SearchParamsSchema<T>,
  ): [T, ParamsDispatch<SetParamsAction<T>>] => {
    const [state, setState] = useParams(
      schema,
      () => Object.keys(schema.defaultValue) as (keyof T)[],
    );

    return [state, setState];
  };

  // Updates the store state from the `window.location.search`.
  const updateFromSearch = () => {
    if (isServer) {
      return;
    }

    const search = window.location.search.replace(/^\?/, '');

    if (status.search === search) {
      return;
    }

    const nextState = serializer.deserialize(new URLSearchParams(search));

    status.isValidated = false;
    store.setState(nextState);
  };

  return {
    useAllParams,
    useParams,
    useParamValueWithSelector: store.useStore,
    updateFromSearch,
  };
};

export type SearchParamsStore = ReturnType<typeof createSearchParamsStore>;
