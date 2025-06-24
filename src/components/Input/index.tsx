import type { ComponentProps } from 'react'

import styles from './styles.module.scss'

type InputProps = {
  id: string
  label?: string
} & ComponentProps<'input'>

export function Input({ id, label, ...props }: InputProps) {
  return (
    <>
      {label && <label htmlFor={id}>{label}</label>}
      <input className={styles.input} type='text' id={id} {...props} />
    </>
  )
}
