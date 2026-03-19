import type {
  NoDuplicates,
  ParamsDispatch,
  ParamValue,
  SetParamsOptions,
  Serializer,
  SetParamsAction,
} from '#types';
import { filterObject, objectToURLSearchParams, shallowEqual } from '#utils';

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
    keys: NoDuplicates<K>,
  ): [{ [P in K[number]]: T[P] }, ParamsDispatch<SetParamsAction<T>>] => {
    const updateState = () => {
      if (!isDirty) {
        return;
      }

      try {
        store.mutateState(
          schema.validate({ ...schema.initialValue, ...store.getState() } as T),
        );
      } catch {
        store.mutateState(schema.defaultValue);
      }
      isDirty = false;
    };

    const initialSearchParams = useInitialSearchParams();

    const getServerState = (): T => {
      if (initialSearchParams === null) {
        return schema.initialValue;
      }

      try {
        return schema.validate({
          ...schema.initialValue,
          ...serializer.deserialize(
            new URLSearchParams(objectToURLSearchParams(initialSearchParams)),
          ),
        });
      } catch {
        return schema.defaultValue;
      }
    };

    const state = isServer
      ? filterObject(getServerState(), keys)
      : store.useStoreWithSelector((state) => {
          updateState();
          return filterObject(state as T, keys);
        }, shallowEqual);

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
          setParam(
            (prev) =>
              schema.validate({
                ...store.getState(),
                ...(value(prev as T) as T),
              }),
            history,
          );
          return;
        }

        setParam(
          schema.validate({ ...store.getState(), ...value } as T),
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
      Object.keys(schema.initialValue) as (keyof T)[],
    );

    return [state, setState];
  };

  const init = () => {
    if (typeof window === 'undefined') {
      return () => {};
    }

    const handlePopState = () => {
      const nextState = serializer.deserialize(
        new URLSearchParams(window.location.search.replace(/^\?/, '')),
      );

      isDirty = true;
      store.setState(nextState);
    };

    handlePopState();

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
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
