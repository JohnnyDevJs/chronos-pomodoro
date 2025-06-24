import {
  HistoryIcon,
  HouseIcon,
  MoonIcon,
  SettingsIcon,
  SunIcon,
} from 'lucide-react'
import { useEffect, useState } from 'react'

import { RouterLink } from '@/components/RouterLink'
import { Tooltip } from '@/components/Tooltip'

import styles from './styles.module.scss'

type AvailableThemes = 'dark' | 'light'

export function Menu() {
  const [theme, setTheme] = useState<AvailableThemes>(() => {
    const storageTheme =
      (localStorage.getItem('theme') as AvailableThemes) || 'dark'
    return storageTheme
  })

  const nextThemeIcon = {
    dark: <SunIcon size={24} />,
    light: <MoonIcon size={24} />,
  }

  function handleThemeChange() {
    setTheme(prevTheme => {
      const nextTheme = prevTheme === 'dark' ? 'light' : 'dark'
      return nextTheme
    })
  }

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  return (
    <nav className={styles.menu}>
      <Tooltip text='Ir para home'>
        <RouterLink
          className={styles['menu-link']}
          href='/'
          aria-label='Ir para home'
        >
          <HouseIcon size={24} />
        </RouterLink>
      </Tooltip>

      <Tooltip text='Ver Histórico'>
        <RouterLink
          className={styles['menu-link']}
          href='/history'
          aria-label='Ver Histórico'
        >
          <HistoryIcon size={24} />
        </RouterLink>
      </Tooltip>

      <Tooltip text='Configurações'>
        <RouterLink
          className={styles['menu-link']}
          href='/settings'
          aria-label='Configurações'
        >
          <SettingsIcon size={24} />
        </RouterLink>
      </Tooltip>

      <Tooltip text='Mudar Tema'>
        <button
          type='button'
          aria-label='Mudar Tema'
          className={styles['menu-link']}
          onClick={handleThemeChange}
        >
          {nextThemeIcon[theme]}
        </button>
      </Tooltip>
    </nav>
  )
}
