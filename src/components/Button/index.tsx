import type { ComponentProps, ReactNode } from 'react'

import { cn } from '@/utils/cn'

import { Tooltip } from '../Tooltip'
import styles from './styles.module.scss'

type Variant = 'green' | 'red'

type ButtonProps = {
  icon: ReactNode
  variant?: Variant
  size?: 'icon'
  tooltip?: string
} & ComponentProps<'button'>

export function Button({
  icon,
  tooltip = '',
  variant = 'green',
  size,
  ...props
}: ButtonProps) {
  const finalVariant: Variant = variant ?? 'green'

  const buttonClassName = cn(
    styles.button,
    styles[finalVariant] ?? '',
    size === 'icon' && styles['size-icon'],
  )

  const buttonElement = (
    <button className={buttonClassName} {...props}>
      {icon}
    </button>
  )

  return tooltip ? (
    <Tooltip text={tooltip} className={styles['tooltip-button']}>
      {buttonElement}
    </Tooltip>
  ) : (
    buttonElement
  )
}
