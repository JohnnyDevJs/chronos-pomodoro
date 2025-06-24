import { PlayCircleIcon, StopCircleIcon } from 'lucide-react'
import type React from 'react'
import { useRef } from 'react'

import { showMessage } from '@/adapters/showMessage'
import { Button } from '@/components/Button'
import { Cycles } from '@/components/Cycles'
import { Input } from '@/components/Input'
import { Tips } from '@/components/Tips'
import { TaskActionTypes } from '@/contexts/TaskContext/taskActions'
import { useTaskContext } from '@/contexts/TaskContext/useTaskContext'
import type { TaskModel } from '@/models/TaskModel'
import { getNextCycle } from '@/utils/getNextCycle'
import { getNextCycleType } from '@/utils/getNextCycleType'

export function Form() {
  const { state, dispatch } = useTaskContext()
  const taskNameInput = useRef<HTMLInputElement>(null)
  const lastTaskName = state.tasks[state.tasks.length - 1]?.name || ''

  const nextCycle = getNextCycle(state.currentCycle)
  const nextCycleType = getNextCycleType(nextCycle)

  function handleCreateNewTask(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    showMessage.dismiss()

    if (taskNameInput.current === null) return

    const taskName = taskNameInput.current.value.trim()

    if (!taskName) {
      showMessage.error('Digite o nome da tarefa')
      return
    }

    const newTask: TaskModel = {
      id: Date.now().toString(),
      name: taskName,
      startDate: Date.now(),
      completeDate: null,
      interruptDate: null,
      duration: state.config[nextCycleType],
      type: nextCycleType,
    }

    dispatch({
      type: TaskActionTypes.START_TASK,
      payload: newTask,
    })

    showMessage.success('Tarefa iniciada')
  }

  function handleInterruptCurrentTask() {
    showMessage.dismiss()
    showMessage.error('Tarefa interrompida')
    dispatch({
      type: TaskActionTypes.INTERRUPT_TASK,
    })
  }

  return (
    <form onSubmit={handleCreateNewTask} className='form' action=''>
      <div className='form-row'>
        <Input
          id='task'
          label='Task:'
          type='text'
          placeholder='Digite algo'
          ref={taskNameInput}
          disabled={!!state.activeTask}
          defaultValue={lastTaskName}
        />
      </div>

      <div className='form-row'>
        <Tips />
      </div>

      {state.currentCycle > 0 && (
        <div className='form-row'>
          <Cycles />
        </div>
      )}

      <div className='form-row'>
        {!state.activeTask ? (
          <Button
            key='type_submit'
            type='submit'
            tooltip='Iniciar nova tarefa'
            aria-label='Iniciar nova tarefa'
            icon={<PlayCircleIcon size={32} />}
          />
        ) : (
          <Button
            key='type_button'
            type='button'
            tooltip='Interromper tarefa atual'
            aria-label='Interromper tarefa atual'
            icon={<StopCircleIcon size={32} />}
            variant='red'
            onClick={handleInterruptCurrentTask}
          />
        )}
      </div>
    </form>
  )
}
