import { ReactNode } from 'react';

import * as s from './style.css';

interface CenterProps {
  children: ReactNode;
}

export const Center = ({ children }: CenterProps) => {
  return (
    <section className={s.container}>
      <div className={s.inner}>{children}</div>
    </section>
  );
};
