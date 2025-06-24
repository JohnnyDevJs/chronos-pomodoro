import { SaveIcon } from 'lucide-react'
import { type FormEvent, useEffect, useRef } from 'react'

import { showMessage } from '@/adapters/showMessage'
import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import { Heading } from '@/components/Heading'
import { Input } from '@/components/Input'
import { TaskActionTypes } from '@/contexts/TaskContext/taskActions'
import { useTaskContext } from '@/contexts/TaskContext/useTaskContext'
import { MainTemplate } from '@/templates/MainTemplate'

import styles from './styles.module.scss'

export function Settings() {
  const { state, dispatch } = useTaskContext()
  const workTimeInput = useRef<HTMLInputElement>(null)
  const shortBreakTimeInput = useRef<HTMLInputElement>(null)
  const longBreakTimeInput = useRef<HTMLInputElement>(null)

  useEffect(() => {
    document.title = 'Configurações - Chronos Pomodoro'
  }, [])

  function handleSaveSettings(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    showMessage.dismiss()

    const formErrors = []

    const workTime = Number(workTimeInput.current?.value)
    const shortBreakTime = Number(shortBreakTimeInput.current?.value)
    const longBreakTime = Number(longBreakTimeInput.current?.value)

    if (isNaN(workTime) || isNaN(shortBreakTime) || isNaN(longBreakTime)) {
      formErrors.push('Digite apenas números para TODOS os campos')
    }

    if (workTime < 1 || workTime > 99) {
      formErrors.push('Digite valores entre 1 e 99 para foco')
    }

    if (shortBreakTime < 1 || shortBreakTime > 30) {
      formErrors.push('Digite valores entre 1 e 30 para descanso curto')
    }

    if (longBreakTime < 1 || longBreakTime > 60) {
      formErrors.push('Digite valores entre 1 e 60 para descanso longo')
    }

    if (formErrors.length > 0) {
      formErrors.forEach(error => {
        showMessage.error(error)
      })
      return
    }

    dispatch({
      type: TaskActionTypes.CHANGE_SETTINGS,
      payload: {
        workTime,
        shortBreakTime,
        longBreakTime,
      },
    })

    showMessage.success('Configurações salvas')
  }

  return (
    <MainTemplate>
      <Container>
        <Heading>Configurações</Heading>
      </Container>
      <Container>
        <p className={styles['settings-text']}>
          Personalize os períodos de foco, descanso breve e descanso prolongado
          conforme sua preferência.
        </p>
      </Container>

      <Container>
        <form onSubmit={handleSaveSettings} action='' className='form'>
          <div className='form-row'>
            <Input
              id='workTime'
              label='Foco'
              type='number'
              ref={workTimeInput}
              defaultValue={state.config.workTime}
            />
          </div>
          <div className='form-row'>
            <Input
              id='shortBreakTime'
              label='Descanso curto'
              type='number'
              ref={shortBreakTimeInput}
              defaultValue={state.config.shortBreakTime}
            />
          </div>
          <div className='form-row'>
            <Input
              id='longBreakTime'
              label='Descanso longo'
              type='number'
              ref={longBreakTimeInput}
              defaultValue={state.config.longBreakTime}
            />
          </div>

          <div className='form-row'>
            <Button
              tooltip='Salvar Configurações'
              aria-label='Salvar Configurações'
              icon={<SaveIcon />}
              variant='green'
            />
          </div>
        </form>
      </Container>
    </MainTemplate>
  )
}
