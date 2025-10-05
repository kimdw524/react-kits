export const isForwardRefComponent = <P>(
  component: (React.ComponentType<P> | React.ForwardRefExoticComponent<P>) & {
    $$typeof?: symbol;
  },
): component is React.ForwardRefExoticComponent<P> => {
  return component.$$typeof === Symbol.for('react.forward_ref');
};
