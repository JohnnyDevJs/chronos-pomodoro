import { useTaskContext } from '@/contexts/TaskContext/useTaskContext'
import { getNextCycle } from '@/utils/getNextCycle'
import { getNextCycleType } from '@/utils/getNextCycleType'

export function Tips() {
  const { state } = useTaskContext()

  const nextCycle = getNextCycle(state.currentCycle)
  const nextCycleType = getNextCycleType(nextCycle)

  const tipsForWhenActiveTask = {
    workTime: (
      <span>
        Foque por <strong>{state.config.workTime}min</strong>
      </span>
    ),
    shortBreakTime: (
      <span>
        Descanse por <strong>{state.config.shortBreakTime}min</strong>
      </span>
    ),
    longBreakTime: <span>Descanso longo</span>,
  }

  const tipsForNoActiveTask = {
    workTime: (
      <span>
        Próximo descanso é de <strong>{state.config.workTime}min</strong>
      </span>
    ),
    shortBreakTime: (
      <span>
        Próximo descanso é de <strong>{state.config.shortBreakTime}min</strong>
      </span>
    ),
    longBreakTime: <span>Próximo descanso será longo</span>,
  }
  return (
    <>
      {state.activeTask && tipsForWhenActiveTask[state.activeTask.type]}
      {!state.activeTask && tipsForNoActiveTask[nextCycleType]}
    </>
  )
}
