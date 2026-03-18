'use client';

import { useSyncExternalStore, type SetStateAction } from 'react';

import { useSyncExternalStoreWithSelector } from 'use-sync-external-store/with-selector';

type Listener = () => void;
type PartialState<T> = Partial<T> | ((prev: T) => Partial<T>);

export const createStore = <T extends Record<string, unknown>>() => {
  let state = {} as T;
  const listeners = new Set<Listener>();

  const getState = () => state;

  const mutateState = (partial: PartialState<T>) => {
    const nextPartial =
      typeof partial === 'function' ? partial(state) : partial;
    for (const i in nextPartial) {
      state[i] = nextPartial[i]!;
    }
  };

  const setState = (updater: SetStateAction<T>) => {
    const nextValue = typeof updater === 'function' ? updater(state) : updater;
    state = nextValue;
    listeners.forEach((listener) => listener());
  };

  const subscribe = (listener: Listener) => {
    listeners.add(listener);

    return () => {
      listeners.delete(listener);
    };
  };

  const useStore = <Selected>(selector: (state: T) => Selected) => {
    return useSyncExternalStore(
      subscribe,
      () => selector(getState()),
      () => selector(getState()),
    );
  };

  const useStoreWithSelector = <Selected>(
    selector: (state: T) => Selected,
    isEqual?: (a: Selected, b: Selected) => boolean,
  ) => {
    return useSyncExternalStoreWithSelector(
      subscribe,
      () => getState(),
      () => getState(),
      selector,
      isEqual,
    );
  };

  return {
    mutateState,
    getState,
    setState,
    subscribe,
    useStore,
    useStoreWithSelector,
  };
};
