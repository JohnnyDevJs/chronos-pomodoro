import { Tooltip } from '@/components/Tooltip'
import { useTaskContext } from '@/contexts/TaskContext/useTaskContext'
import { getNextCycle } from '@/utils/getNextCycle'
import { getNextCycleType } from '@/utils/getNextCycleType'

import styles from './styles.module.scss'

export function Cycles() {
  const { state } = useTaskContext()

  const cycleStep = Array.from({ length: state.currentCycle })

  const cycleDescriptionMap = {
    workTime: 'trabalho',
    shortBreakTime: 'descanso curto',
    longBreakTime: 'descanso longo',
  }

  return (
    <div className={styles.cycles}>
      <div className={styles.cycles}>
        <span>Ciclos:</span>
        <div className={styles['cycle-dots']}>
          {cycleStep.map((_, index) => {
            const nextCycle = getNextCycle(index)
            const nextCycleType = getNextCycleType(nextCycle)
            return (
              <Tooltip
                key={nextCycle}
                as='span'
                text={`Indicador de ciclo de ${cycleDescriptionMap[nextCycleType]}`}
                id={styles[nextCycleType]}
                className={styles['cycle-dot']}
                aria-label={`Indicador de ciclo de ${cycleDescriptionMap[nextCycleType]}`}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}
