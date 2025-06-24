import { RouterLink } from '@/components/RouterLink'

import styles from './styles.module.scss'

export function Footer() {
  return (
    <footer className={styles.footer}>
      <RouterLink href='/about-pomodoro'>
        Entenda como funciona a técnica pomodoro 🍅
      </RouterLink>
      <p>
        Chronos Pomodoro &copy; {new Date().getFullYear()} - Feito com{' '}
        <span>♥</span> por{' '}
        <a href='https://johnnysilva.dev' rel='noreferrer nofollow'>
          Johnny Silva
        </a>
      </p>
    </footer>
  )
}
