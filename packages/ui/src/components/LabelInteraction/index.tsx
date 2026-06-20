'use client';

import {
  Children,
  cloneElement,
  useRef,
  type ReactElement,
  type ReactNode,
  type Ref,
} from 'react';

import { useCombinedRefs } from '@kimdw-rtk/utils';
import clsx from 'clsx';

import { useRipple } from '#hooks';
import { sx } from '#styles';
import type { spacing } from '#tokens';

import * as s from './LabelInteraction.css';

type LabelInteractionChild = ReactElement<{
  children?: ReactNode;
  className?: string;
  ref?: Ref<HTMLElement>;
}>;

interface LabelInteractionProps {
  children: ReactElement<LabelInteractionChild>;
  size?: keyof typeof spacing;
}

export const LabelInteraction = ({
  children,
  size = 'md',
}: LabelInteractionProps) => {
  const child = Children.only(children) as LabelInteractionChild;
  const elementRef = useRef<HTMLElement | null>(null);
  const targetRef = useCombinedRefs(child.props.ref, elementRef);
  const { ripple } = useRipple<HTMLElement>(elementRef);

  return cloneElement(child, {
    ref: targetRef,
    className: clsx(
      child.props.className,
      s.labelInteraction,
      sx({ padding: size }),
    ),
    children: (
      <>
        {child.props.children}
        {ripple}
      </>
    ),
  });
};
LabelInteraction.displayName = 'LabelInteraction';
