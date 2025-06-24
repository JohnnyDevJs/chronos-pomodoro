import { ArrowDownUp, TrashIcon } from 'lucide-react'
import { useEffect, useState } from 'react'

import { showMessage } from '@/adapters/showMessage'
import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import { Heading } from '@/components/Heading'
import { TaskActionTypes } from '@/contexts/TaskContext/taskActions'
import { useTaskContext } from '@/contexts/TaskContext/useTaskContext'
import { MainTemplate } from '@/templates/MainTemplate'
import { formatDate } from '@/utils/formatDate'
import { getTaskStatus } from '@/utils/getTaskStatus'
import { sortTasks, type SortTasksOptions } from '@/utils/sortTasks'

import styles from './styles.module.scss'

export function History() {
  const { state, dispatch } = useTaskContext()
  const [confirmClearHistory, setConfirmClearHistory] = useState(false)
  const hasTasks = state.tasks.length > 0

  const [sortTaskOptions, setSortTaskOptions] = useState<SortTasksOptions>(
    () => {
      return {
        tasks: sortTasks({ tasks: state.tasks }),
        field: 'startDate',
        direction: 'desc',
      }
    },
  )

  useEffect(() => {
    setSortTaskOptions(prevState => ({
      ...prevState,
      tasks: sortTasks({
        tasks: state.tasks,
        direction: prevState.direction,
        field: prevState.field,
      }),
    }))
  }, [state.tasks])

  useEffect(() => {
    document.title = 'Histórico - Chronos Pomodoro'
  }, [])

  useEffect(() => {
    if (!confirmClearHistory) return

    setConfirmClearHistory(false)

    dispatch({ type: TaskActionTypes.RESET_STATE })
  }, [confirmClearHistory, dispatch])

  useEffect(() => {
    return () => {
      showMessage.dismiss()
    }
  }, [])

  function handleSortTasks({ field }: Pick<SortTasksOptions, 'field'>) {
    const newDirection = sortTaskOptions.direction === 'desc' ? 'asc' : 'desc'

    setSortTaskOptions({
      tasks: sortTasks({
        direction: newDirection,
        tasks: sortTaskOptions.tasks,
        field,
      }),
      direction: newDirection,
      field,
    })
  }

  function handleResetHistory() {
    showMessage.dismiss()
    showMessage.confirm(
      'Tem certeza de que quer prosseguir com a exclusão?',
      confirmation => {
        setConfirmClearHistory(confirmation)
      },
    )
  }

  return (
    <MainTemplate>
      <Container>
        <Heading>
          <span>Histórico</span>

          {hasTasks && (
            <Button
              size='icon'
              tooltip='Apagar Histórico'
              aria-label='Apagar todo o histórico'
              icon={<TrashIcon />}
              variant='red'
              onClick={handleResetHistory}
            />
          )}
        </Heading>
      </Container>

      <Container>
        {hasTasks ? (
          <div className={styles['responsive-table']}>
            <table>
              <thead>
                <tr>
                  <th
                    onClick={() => handleSortTasks({ field: 'name' })}
                    className={styles['th-sort']}
                  >
                    <span>
                      Tarefa <ArrowDownUp size={16} />
                    </span>
                  </th>
                  <th
                    onClick={() => handleSortTasks({ field: 'duration' })}
                    className={styles['th-sort']}
                  >
                    <span>
                      Duração <ArrowDownUp size={16} />
                    </span>
                  </th>
                  <th
                    onClick={() => handleSortTasks({ field: 'startDate' })}
                    className={styles['th-sort']}
                  >
                    <span>
                      Data <ArrowDownUp size={16} />
                    </span>
                  </th>
                  <th>Status</th>
                  <th>Tipo</th>
                </tr>
              </thead>

              <thead>
                {sortTaskOptions.tasks.map(task => {
                  const taskTypeDictionary = {
                    workTime: 'Foco',
                    shortBreakTime: 'Descanso curto',
                    longBreakTime: 'Descanso longo',
                  }

                  return (
                    <tr key={task.id}>
                      <td>{task.name}</td>
                      <td>{task.duration}min</td>
                      <td>{formatDate(task.startDate)}</td>
                      <td className={styles.status}>
                        <div className={styles['status-indicator-wrapper']}>
                          <span
                            className={styles['status-indicator']}
                            id={
                              styles[getTaskStatus(task, state.activeTask).name]
                            }
                          />
                          {getTaskStatus(task, state.activeTask).label}
                        </div>
                      </td>
                      <td>{taskTypeDictionary[task.type]}</td>
                    </tr>
                  )
                })}
              </thead>
            </table>
          </div>
        ) : (
          <p className={styles['tasks-not-found']}>
            Você ainda não criou nenhuma tarefa.
          </p>
        )}
      </Container>
    </MainTemplate>
  )
}
