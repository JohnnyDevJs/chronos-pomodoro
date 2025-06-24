import type { ReactNode } from 'react'

import styles from './styles.module.scss'

type GenericHtmlProps = {
  children: ReactNode
}

export function GenericHtml({ children }: GenericHtmlProps) {
  return <div className={styles['generic-html']}>{children}</div>
}
