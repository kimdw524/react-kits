import { Children, Fragment, isValidElement, type ReactNode } from 'react';

interface SeparatorProps {
  children: ReactNode;
  separator: ReactNode;
}

export const Separator = ({ children, separator }: SeparatorProps) => {
  const items: ReactNode[] = [];

  Children.forEach(children, (child) => {
    if (!child) {
      return;
    }

    items.push(child);
  });

  return (
    <>
      {items.map((child, index) => {
        return (
          <Fragment
            key={isValidElement(child) && child.key != null ? child.key : index}
          >
            {index > 0 && separator}
            {child}
          </Fragment>
        );
      })}
    </>
  );
};
