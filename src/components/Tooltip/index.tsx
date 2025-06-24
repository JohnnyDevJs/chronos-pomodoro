import type {
  ComponentPropsWithoutRef,
  ElementType,
  JSX,
  ReactNode,
} from 'react'
import React from 'react'

import { cn } from '@/utils/cn'

import styles from './styles.module.scss'

type TooltipProps<T extends React.ElementType> = {
  as?: keyof JSX.IntrinsicElements
  text: string
  children?: ReactNode
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'children' | 'text' | 'icon'>

export function Tooltip<T extends ElementType = 'div'>(props: TooltipProps<T>) {
  const { as, text, children, className, ...rest } = props

  const Component = as || 'div'

  return (
    <Component className={cn(styles['tooltip-wrapper'], className)} {...rest}>
      {children}
      <div className={styles.tooltip} role='tooltip'>
        {text}
      </div>
    </Component>
  )
}
