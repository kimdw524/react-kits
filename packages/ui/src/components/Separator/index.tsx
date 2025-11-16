import { Fragment, type ReactElement, type ReactNode, Children } from 'react';

interface SeparatorProps {
  children: ReactElement | ReactElement[];
  separator: ReactNode;
}

export const Separator = ({ children, separator }: SeparatorProps) => {
  const items = Children.toArray(children) as ReactElement[];

  return (
    <>
      {items.map((child, index) => (
        <Fragment key={child.key || index}>
          {index > 0 && separator}
          {child}
        </Fragment>
      ))}
    </>
  );
};
