import { ThumbsDownIcon, ThumbsUpIcon } from 'lucide-react'
import type { ToastContentProps } from 'react-toastify'

import { Button } from '@/components/Button'

import styles from './styles.module.scss'

export function Dialog({ closeToast, data }: ToastContentProps<string>) {
  return (
    <>
      <div className={styles.container}>
        <p>{data}</p>

        <div className={styles['buttons-container']}>
          <Button
            size='icon'
            onClick={() => closeToast(true)}
            icon={<ThumbsUpIcon />}
            aria-label='Confirmar ação e fechar'
            variant='green'
          />
          <Button
            size='icon'
            onClick={() => closeToast(false)}
            icon={<ThumbsDownIcon />}
            variant='red'
            aria-label='Cancelar ação e fechar'
          />
        </div>
      </div>
    </>
  )
}
