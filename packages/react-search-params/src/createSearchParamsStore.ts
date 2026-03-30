import type {
  NoDuplicates,
  ParamsDispatch,
  ParamValue,
  SetParamsOptions,
  Serializer,
  SetParamsAction,
} from '#types';
import {
  filterObject,
  objectToURLSearchParams,
  resolveLazy,
  shallowEqual,
} from '#utils';

import { useInitialSearchParams } from './SearchParamsProvider';
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

  // Indicates the store may contain unvalidated params and must be validated before retrieving values.
  let isDirty = true;

  const setParam = <T extends Record<string, ParamValue>>(
    value: SetParamsAction<T>,
    history: NonNullable<SetParamsOptions['history']> = 'pushState',
  ): void => {
    const nextValue =
      typeof value === 'function' ? value(store.getState() as T) : value;

    store.setState((prev) => ({ ...prev, ...nextValue }));

    if (typeof window === 'undefined') {
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

    const queryString = urlSearchParams.toString();
    const search = queryString ? `?${queryString}` : '';

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
      if (!isDirty) {
        return;
      }

      try {
        store.mutateState(
          parseParams({ ...schema.defaultValue, ...store.getState() }),
        );
      } catch {
        store.mutateState(schema.defaultValue);
      }
      isDirty = false;
    };

    const initialSearchParams = useInitialSearchParams();

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
        isDirty = false;
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

  const wrapHistoryMethods = (onChange: () => void) => {
    const { history } = window;
    const originalPushState = history.pushState;
    const originalReplaceState = history.replaceState;

    history.pushState = function (...args) {
      originalPushState.apply(this, args);
      onChange();
    };

    history.replaceState = function (...args) {
      originalReplaceState.apply(this, args);
      onChange();
    };

    return () => {
      history.pushState = originalPushState;
      history.replaceState = originalReplaceState;
    };
  };

  const init = () => {
    if (typeof window === 'undefined') {
      return () => {};
    }

    const handleSearchChange = () => {
      const nextState = serializer.deserialize(
        new URLSearchParams(window.location.search.replace(/^\?/, '')),
      );

      isDirty = true;
      store.setState(nextState);
    };

    handleSearchChange();

    const cleanupWrapHistoryMethods = wrapHistoryMethods(handleSearchChange);

    window.addEventListener('popstate', handleSearchChange);

    return () => {
      cleanupWrapHistoryMethods();
      window.removeEventListener('popstate', handleSearchChange);
    };
  };

  /**
   * Removes the registered `popstate` listener.
   */
  const cleanup = init();

  return {
    cleanup,
    useAllParams,
    useParams,
    useParamValueWithSelector: store.useStore,
  };
};
