import type { SearchParamsSchema } from '#createSearchParamsSchema';
import type {
  NoDuplicates,
  ParamsDispatch,
  ParamValue,
  Serializer,
  SetParamsAction,
} from '#types';
import { filterObject, shallowEqual } from '#utils';

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

  // Indicates the store may contain unvalidated params and must be validated before retrieving values.
  let isDirty = true;

  const setParam = <T extends Record<string, ParamValue>>(
    value: SetParamsAction<T>,
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

    window.history.pushState(
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

      store.mutateState(
        schema.validate({ ...schema.defaultValue, ...store.getState() } as T),
      );
      isDirty = false;
    };

    const state = store.useStoreWithSelector((state) => {
      updateState();
      return filterObject(state as T, keys);
    }, shallowEqual);

    /**
     * Updates params.
     *
     * @param value Partial params or an updater function.
     * @param onValidationFailed Called when schema validation throws.
     */
    const setState = (
      value: SetParamsAction<T>,
      onValidationFailed?: (error: unknown) => void,
    ) => {
      try {
        if (typeof value === 'function') {
          updateState();
          setParam((prev) =>
            schema.validate({
              ...store.getState(),
              ...(value(prev as T) as T),
            }),
          );
          return;
        }

        setParam(schema.validate({ ...store.getState(), ...value } as T));
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
        window.location.search.replace(/^\?/, ''),
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
