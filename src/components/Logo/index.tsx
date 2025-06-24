import { TimerIcon } from 'lucide-react'

import { RouterLink } from '@/components/RouterLink'

import styles from './styles.module.scss'

export function Logo() {
  return (
    <div className={styles.logo}>
      <RouterLink className={styles['logo-link']} href='/'>
        <TimerIcon size={64} />
        <span>Chronos</span>
      </RouterLink>
    </div>
  )
}
